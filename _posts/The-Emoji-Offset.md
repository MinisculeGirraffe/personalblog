---
title: 'The Emoji Offset'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Joe Haddad
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---
I come up with near fever dream stupid idea’s all the time. This is one of my latest. After preparing a powershell training involving caesar ciphers. In my infinite wisdom I thought it’d be neat to convert text into emoji’s and then back again.  Here’s the one liner.

```powershell
([char[]]"Emoji" | % {[char]::ConvertFromUtf32([int]$_ + 0x1f400)}) -join ''
```

To break down what’s going on here.

 ```powershell
 #Turn a string into an array of characters
 [char[]]"Emoji" 
 ```

```powershell
#Convert the character to its numerical value.
#add our magic value 🐀 to offset the character ID into the emoji unicode space.
[int]$_ + 0x1f400
```

```powershell
#powershell characters are fixed two bytes, Emoji’s fall outside the Utf-16 space. Any character with an ID larger than 65,536 needs to be converted to a unicode code point to be displayed
[char]::ConvertFromUtf32([int]$_ + 0x1f400)     
```

```powershell
#Preform the action on every character in the array
[char[]]"Emoji" | % {[char]::ConvertFromUtf32([int]$_ + 0x1f400)  }

> 👅👭👯👪👩
```

To recover our original text, we have to preform the inverse, meaning we have to convert back into utf32 and subtract our original offset from our emoji’s id. This poses an issue as we can’t directly type cast our string into a char array like when they were encoded. An emoji is treated as two characters due to surrogate pairs, which prevents type casting the entire array, as each emoji is a `[char[]]`. See [Wikipedia](https://en.wikipedia.org/wiki/UTF-16#Code_points_from_U+010000_to_U+10FFFF) for more details on surrogate pairs. Not being able to come up with a more elegant solution. I settled with splitting the entire string into the surrogate pairs, looping in steps of 2, re-joining the surrogate pairs back into an emoji, and converting to a code point, then subtracting the offset. 
```powershell
#Turn string into an array of surrogate pairs, containing 2 items for every char
$sparray = "👅👭👯👪👩" -split ''
#Loop in pipeline in steps of 2
$string = 1..$sparray.count | ? {$_ % 2 -eq 0} |
	#Re-join surrogate pairs back into an emoji string.
	% {return $sparray[($_ - 1), $_] -join ''} | 
	#Convert Emoji to Int
	% {return [char]::ConvertToUtf32($_,0)} |
	# Offset back to original text space and convert.
	% {[char]::ConvertFromUtf32($_ - 0x1f400)}
#Join char array back to string
$string -join ''
> Emoji
```

Since we have a reliable way of converting text into emoji’s, why not change base64 to emoji and store files that way.

```powershell
#Convert a file into base64.
[Convert]::ToBase64String([IO.File]::ReadAllBytes('test.txt'))
> VGhpcyBpcyBhIGZpbGUuCg==

([char[]]'VGhpcyBpcyBhIGZpbGUuCg==' | % {[char]::ConvertFromUtf32([int]$_ + 0x1f400)}) -join ''

> 👖👇👨👰👣👹👂👰👣👹👂👨👉👇👚👰👢👇👕👵👃👧🐽🐽
```

The emoji text can then be converted back into regular base64 using the process above, and saved back into a file using the below command.

```powershell
[IO.File]::WriteAllBytes('Test.txt', [Convert]::FromBase64String('VGhpcyBpcyBhIGZpbGUuCg=='))

