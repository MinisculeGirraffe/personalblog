---
title: REST, The Web and, PowerShell
excerpt: ' This isn’t a tutorial on everything you need to know about using REST with PowerShell, but more of a practical guide for getting started. If you don’t know anything about REST, interacting with RESTful services through PowerShell can be a daunting task. '
date: 20210115T153551-0600
author:
  name: Daniel Norred
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

### What is REST?
 This isn’t a tutorial on everything you need to know about using REST with PowerShell, but more of a practical guide for getting started.

If you don’t know anything about REST, interacting with RESTful services through PowerShell can be a daunting task. 

To start working with REST, we need background on what it is in the first place. 
REST is a standardized way of transmitting data through the internet to be parsed and interpreted by a computer.  It utilizes HTTP to transmit the data and JSON to format data to be parsed later. 

### What do I use REST for?
Anything that requires you to interact with a web service or dynamically look up information over the internet.

Not everything on the web is RESTful, but everything RESTful is on the web. Consequently, PowerShell has two primary entry points into interacting with web/restful resources
- [`Invoke-RestMethod`][1]
- [`Invoke-WebRequest`][2]

If the names were any giveaway, `Invoke-RestMethod` is explicitly tailored for interacting with RESTful services, while `Invoke-WebRequest` is for interacting with general web requests.  If you’ve never interacted with REST or web development before, the next logical question is, what’s the difference? 

Let’s explore this interactively using a few RESTful services. For getting our favorite Kanye West quotes, [api.kanye.rest](). And for bringing our favorite cat facts [catfact.ninja](). 

When running an  `Invoke-RestMethod` to api.kanye.rest, We receive an object, with one property “quote” with the value of our generated quote. 
```powershell
Invoke-RestMethod api.kanye.rest
<#
>	quote
	-----
	Just stop lying about shit. Just stop lying.
#>
```

If we use the range operator to run that 5 times through `Foreach-Object`, we get 5 quotes back, formatted as expected in our terminal
```powershell
1..5 | ForEach-Object {Invoke-RestMethod api.kanye.rest }
<#
>	quote
	-----
	I am the head of Adidas. I will bring Adidas and Puma back together and bring …
	You can't look at a glass half full or empty if it's overflowing.
	Just stop lying about shit. Just stop lying.
	I feel calm but energized
	We all self-conscious. I'm just the first to admit it.
#>

```

I’m not even going to try and format the output of `Invoke-Webrequest` because it’s a detailed report of an HTTP request containing the raw JSON that was sent over, our HTTP headers, status code. Things we don’t care about if we’re trying to get our sweet Kanye quotes. Run the code below to see what I’m talking about.
```powershell
Invoke-WebRequest api.kanye.rest
```

Invoke-RestMethod has parsed the returned JSON back into a PowerShell object and abstracted away from the HTTP request information from us, leaving us with a simple command to getting data from a web resource. 

Invoke-RestMethod has additional functionalities like automatically formatting our [query string ]() when using GET requests with parameters. Let's say we were trying to write a function that would get cat facts for us, but we wanted to add a parameter on the function to let us control how many were returned without having to use a `For-EachObject` look like our Kanye API. From the API doc on [catfact.ninja](), there are two endpoints for getting our facts out.
- /fact
	- returns a single fact
- /facts
	- returns multiple facts
		-params: 
		- limit: Number of facts to be returned 
		- maxLength: maximum number of characters of a fact.

We can declare limit and maxLength in a [hashtable][7] and then pass it into Invoke-WebRequest to be encoded for the proper REST method we’re using. 
```powershell
$params = @{
    limit = 1
    maxLength = 1000
}
Invoke-RestMethod -Uri "catfact.ninja/facts" `
    -Body $params
<#
>	current_page   : 1
	data           : {@{fact=A cat’s brain is biologically more similar to a human brain than it is to a dog’s. Both humans and cats have identical regions in their brains that are responsible 
                 for emotions.; length=177}}...
#>
```

To break down all the abstractions that have taken place, I’ve written out the same code but using `Invoke-WebRequest`. 
```powershell
$url = "https://catfact.ninja/facts"
$params = @{
    limit = 1
    maxLength = 1000
}
#Transform our object into an array of strings formatted as key=value
$stringParams = $params.GetEnumerator() | ForEach-Object {'{0}={1}' -f $_.name,$_.value}
#Join our keys with "&" into a single string and escape them to be put in a URL
$encodedParams = [uri]::EscapeDataString(($stringParams -join '&'))
#Join our encoded query string with our resource URL
$encodedURL = "{0}?{1}" -f $url,$encodedParams
#submit our web request
$results = Invoke-WebRequest  -Uri $encodedURL
#Convert our results from a string to an object
$results = $results.Content | ConvertFrom-Json
```

Regardless of how we got to our data being returned, whether with high-level abstractions using `Invoke-RestMethod` or lower-level `Invoke-WebRequest,` We need to display our cat facts in an easy-to-read format.
```powershell
<#
>	current_page   : 1
	data           : {@{fact=A cat’s brain is biologically more similar to a human brain than it is to a dog’s. Both humans and cats have identical regions in their brains that are responsible 
                 for emotions.; length=177}}...
#>
```

```json
{
    "current_page": 1,
    "data": [
        {
            "fact": "Mohammed loved cats and reportedly his favorite cat, Muezza, was a tabby. Legend says that tabby cats have an “M” for Mohammed on top of their heads because Mohammad would often rest his hand on the cat’s head.",
            "length": 210
        }
    ],
```
When working with REST, the most valuable skill you can have is understanding how the format PowerShell prefers data in differs from the way data is structured. To display data in the terminal, PowerShell prefers arrays of objects. This is exposed when working with REST as JSON is **not** structured that way.   Tools like Postman can be fantastic for visualizing the data structure of JSON and troubleshooting why your request is failing.  As you can see above, the data property is an array of objects. 

If we wrap our code in a function, we can return the “fact” properties under the “data” array, along with adding for easy intractability with function parameters.

```powershell
function Get-CatFact {
    param (
        #Type validation & default values.
        #API limits you to 1000 facts per request
        [ValidateRange(0, 1000)]
        [int]$count = 1,
        [int]$maxFactLength = 1000
    )
    $params = @{
        limit = $count
        maxLength = $maxFactLength
    }
    $data = Invoke-RestMethod -Uri "https://catfact.ninja/facts" -Body $params

    return $data.data | Select-Object fact
    
}
#Get a single fact
Get-CatFact
<#
>	fact
	----
	While many parts of Europe and North America consider the black cat a sign of bad luck, in Britain and Australia, black cats are considered lucky.
#>
#Get 3 short facts
Get-CatFact -count 3 -maxFactLength 100
<#
>	fact
	----
	Heat occurs several times a year and can last anywhere from 3 to 15 days.
	In 1987 cats overtook dogs as the number one pet in America.
	Every year, nearly four million cats are eaten in Asia.
#>
```

#### Essential Tools for Working with RESTful Services
- [ Postman][8]
	- API designer/test/editor
- [Telerik Fiddler][9]
	- Network monitor and HTTPS Decryption
	- Fantastic for reverse engineering. 
- [Mitmproxy][10]
	- Open-source version of Fiddler

#### Good Practice API’s
- [Kanye Rest][11](Oh my god why would someone even pay for this, Free)
- [Cat Facts][12] (Free)
- [Open Weather Map][13] (Free)
- [Twilio][14] (Paid)
- [OpenCageData][15] (Free)
- [Open Movie Database][16] (Free)

[1]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.1
[2]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.1
[7]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-7.1
[8]:	https://www.postman.com/
[9]:	https://www.telerik.com/fiddler
[10]:	https://mitmproxy.org/
[11]:	https://kanye.rest/
[12]:	catfact.ninja
[13]:	https://openweathermap.org/api
[14]:	https://www.twilio.com/
[15]:	https://opencagedata.com/api
[16]:	http://www.omdbapi.com/#usage