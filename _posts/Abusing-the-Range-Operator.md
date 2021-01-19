---
title: Abusing the Range Operator
date: 2020-01-13T00:00:00.000Z
author:
  name: Daniel Norred
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

The quick TL;DR of the [Range Operator]() fills in the gaps between two integers.  I believe it’s more accurate to say that the range operator is used for data creation/manipulation. 
However, the range operator will typecast anything that possibly could be an int to an int and return the numbers between that range. As anyone who has ever interacted closely with computers knows, deep down, everything is actually an integer. This behavior enables interesting quirks with data types that can be converted directly to and from an int, AKA `[char]` and `[datetime]`

```powershell
1..3
>	1
>	2
>	3
```

For example, say we wanted to get an array of the alphabet.  Due to the magic of Unicode, every character in human existence has been assigned an agreed-upon number.  So if we could somehow convert the first and last character in our alphabet into that number, put a range operator between them, and convert back into the string representation of that number.  We can typecast a string into a `[char]` to perform this conversion transparently  The number and the actual character are treated interchangeably.  

```powershell
[char]65
>	A
[char]"A"
> 	A
[int][char]"A"
>	65
```
Since our range operator implicitly tries to typecast everything that's fed into it into an int, it's doing the programmatic equivalent of `[int][char] "A".` So if we provide two characters into the operator, we'll get an array of numeric values out. 

```powershell
[char]"A"..[char]"Z"
```

Strings are stored in a two-byte per character encoding, and two bytes can only count numbers up to 65535. This means this strategy will NOT work with emoji’s, but that’s a separate blog post.

Okay, that’s neat, but what if I wanted to do some string manipulation. You COULD use the substring method like so. 
```powershell
#Get the first three chars of a string

$string = "String"

$string.substring(0,3)
>	Str
```

This works fine for simple manipulations, but suppose you ever need to select every character of a string that has an even index. Are you going to write out an entire function to calculate that? Of course not. You’re going to typecast the string to an array.  Create a range of integers for every index in the string array,  test each one for being even, and access the char array by only even indexes.
 
```powershell
[char[]]$string[(0..$string.Length | ? {$_ % 2 -eq 0})] -join ''
>	Srn
```

Suppose you needed a to print out the date time string between two days.  If the number of days between two points in time is calculated, and we create a range of those days, they can be iterated upon to quickly build our array.

```powershell
$start = [datetime]"1/17/2020"
$end   = [datetime]"6/30/2021"
$span  = New-TimeSpan -Start $start -End $end

0..$span.Days | %{$start.AddDays($_)}

```
Or conversely, for building an array of years.
```powershell
[datetime[]](2000..2020 | % {"1/1/{0}" -f $_})
```



