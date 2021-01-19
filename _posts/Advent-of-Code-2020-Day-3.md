---
title: 'Advent of Code 2020: Day 3'
excerpt: 'Day 3 was my absolute favorite challenge that I’ve done so far, specifically because it’s a very visual solution.'
date: 20210112T141701-0600
author:
  name: Daniel Norred
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---
[Challenge][1] | [Puzzle Input][2] | [Github][3]

### Part 1
Day 3 was my absolute favorite challenge that I’ve done so far, specifically because it’s a very visual solution. 

You’ve got a puzzle input of the following, that repeats infinitely to the right. “.” is an open space and “#” is a tree.
```powershell
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
```
You are moving down this slope to the right 3 and down 1 every step, and need to 
1, Mark your path “.”with a “O”
2, Mark when you land on a tree(“#”) with an “X”

```powershell
..##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#.
..#.##.......#.X#.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#
.#........#.#........X.#........#
#.##...#...#.##...#...#.X#...#...
#...##....##...##....##...#X....#
.#..#...#.#.#..#...#.#.#..#...X.#  --->
```
To solve this problem programmatically though, we need to figure out a way to simulate “infinite” space, since our program can’t feasibly repeat forever. 

There’s no fundamental difference between repeating forever, and just looping around to the start of the line when the X value exceeds the limit of the existing text
```powershell
Adding 3 spaces to X (Infinite Space)
           ____   
          |    |
          ↑    ↓
..##......O|..#X......

Adding 3 Spaces to X (Looping back to start)
..#X.........##.........##......O
   ↑                            ↓
   |                            |
   ------------------------------
```

If we expand this infinite space by looping concept to our previous run example it would look like the following. 
```powershell
.#....#..##.#..####....#.......
...O..#..#....#....###......#.#
#..#..O..#..............##.#.#.
#.#...#..O.#...#......##..#..#.
...#..#.##..X..#........###.#.#
...#.#.........O#.........##...
...#.#....#.#....#O.#......#...
..##.#.....#.......#.X##..#..##
..#.......#.......#....#X......
....##........##.##...#.###O##.
#.......#.......##..#......#..O
..X#.............##.#......#...
...#.X###....#.....#...##......
........O....##.#......#.......
..#...#....X......#....#.......
```

Now that we have a concept of how to go about tackling this problem, how do we turn this into code?

First we need to create two arrays One array containing each line, and another containing each character in the line. This type of data parsing problem is perfectly suited for a multidimensional array.    Creating this array can be done with a single line, utilizing the default behavior of `Get-Content`, parsing each new-line of a file into a new item in an array. `Foreach-Object` is leveraged to convert  by type casting the entire string into an array of characters. 

```powershell
$text = Get-Content .\puzzleInput.txt | % { ,[char[]]$_ }
```

 The [Comma Operator][4] is required to create a new array with each loop, instead of the default behavior of  just appending  the data into the same array.
```powershell
@(@(a,b,c),@(a,b,c),@(a,b,c)) VS @(a,b,c,a,b,c,a,b,c)
```

We’ve got two dimensions of data, and we can directly reference any single character anywhere in our puzzle input by doing a double bracket index. Think of accessing the X,Y coordinates of the puzzle input.
```powershell
# $text[Y][X] AKA $text[row][column]
$text[0] -join "" #Don't forget to convert back to a string!
=>	.#....#..##.#..####....#.......
$text[0][5]
=>	.
```

Now that we can directly access any position in the puzzle input, we need to iterate through the entire puzzle input, by the supplied slope, updating our position as we loop through the text.
```powershell
for ($($i = 1; $j = 3); $i -lt $text.Count; $($i += 1; $j += 3)) {
    if ($j -gt ($text[$i].length - 1 ) ) {
        $offset = 3
        if ($j -= $text[$i].length + $offset -lt 0) { $offset = 0 }
        $j -= $text[$i].length + $offset
    }
    switch ($text[$i][$j]) {
        { $_ -eq '.' } { $text[$i][$j] = 'O'; break }
        { $_ -eq "#" } { $text[$i][$j] = 'X' ; break }
    }
}
```

Let’s break down what that loop is actually doing, because there’s a lot going on there. 
 I chose to use a for loop in this context, since we’re directly interacting with an array by index, and moving through a multidimensional array. 
 There’s two dimensions to our data, we actually need to increment two values in our for loop.  To define more than one variable in the for loop definition, the [Subexpression Operator][5] is abused to let us assign or interact with any number of variables. Anything inside the `$()` gets ran, and the return value treated as a single item. The loop will start off at `$text[1][3]` and every loop increment the row by 1, and the column by 3
```powershell
  
for (
	$($i = 1; $j = 3); #<Init>;
	$i -lt $text.Count;#<Condition>;
	$($i += 1; $j += 3)#<Repeat>;
) 
```

The first conditional in the loop tries to calculate the distance to modify the X value(`$j`) to simulate the infinite loop. Remember, this conditional is executed first after ever loop. So the \<Repeat\> would have already been applied. `$j` can be out of bounds of the row, which will cause an error.  

```powershell
$text[$i] -join ""
>	#....#..##.#..####....#.......
$text[$i].length
>	31
$j = 30 #Remember Arrays start at 0
$text[$i][$j]
>	.

	0                             30
>	#....#..##.#..####....#......[.]
$j = 31
$text[$i][$j] #Remember Arrays start at 0
>	$null

	0                            30   31
>	#....#..##.#..####....#.......  [$null]

```
We need to change `$j` if it’s either too high or too low so it’s always within the length of our row ,`$text[$i]`.   The array’s *technically* can be negative indexed in this context. Since a negative indexes array, starts at -1, and the end of the array.    

```powershell
$text[$i][-1]
	-31                           -1
>	 #....#..##.#..####....#......[.]

```
Dealing with the offset in this context is more headache than I thought it was  worth.  The code below does 3 tasks.
1. Verify that `$j` is not greater than it’s maximum value
2. Verify that `$j` will not become negative if we subtract the length of the row + our magic offset
3. Loop `$j` back to the start or the row using our magic `$offset` to keep the position equivalent.
```
   #1 if ($j -gt ($text[$i].length - 1 ) ) {
        $offset = 3
       #2 if ($j -= $text[$i].length + $offset -lt 0) { $offset = 0 }
      #3  $j -= $text[$i].length + $offset
    }
```

Now that `$j` will always be within index, we can use the [Switch Statement ][6] to check every character on our path along the puzzle input and update it with the proper marker.
```powershell
    switch ($text[$i][$j]) {
        { $_ -eq '.' } { $text[$i][$j] = 'O'; break }
        { $_ -eq "#" } { $text[$i][$j] = 'X' ; break }
    }
```
This will repeat  for every line in our puzzle input, updating the multidimensional array with the proper characters.  To solve the challenge,  we need to know how many tree’s we’ve encountered. AKA count how many times “X” occurred. Keep in mind, we’re dealing with structured data here, so there’s lots of ways we can calculate this. 

How I calculated the solution:
We’re dealing with an array of arrays here, so we can’t just directly filter the data we want.  
We need to first join the characters in each row into a string, eliminating one dimension of data, creating an array of strings.
```powershell
$text | % {$_ -join ""}
```
Another join is required to eliminate the other dimension fo the data. To preform another join on the same line we must encapsulate the data.  This creates a single string. I chose to join each line by [new line characters][7] just to preserve formatting. There is no programatic difference if the string looks pretty or not.
```powershell
($text | % {$_ -join ""}) -join "`n"
```

Now that we’ve got a single string, we need to convert it into an array of characters that we can filter off. This can be done by typecasting with square brackets. Again, this is being done on the same line so encapsulation must be preformed.
```powershell
[char[]](($text | %{$_ -join ""}) -join "`n") 
```

Now that each character in our modified puzzle input is an item in a flat array, we can pipe into Where-Object to check every item to see if it meets our condition (equal to X).  Another pipe to measure will return the count, and our puzzle answer.
```powershell
[char[]](($text | %{$_ -join ""}) -join "`n") | ? {$_ -eq "X"} | measure
```


[1]:	https://adventofcode.com/2020/day/3
[2]:	https://raw.githubusercontent.com/MinisculeGirraffe/AdventOfCode2020/main/Day%203/puzzleInput.txt
[3]:	https://github.com/MinisculeGirraffe/AdventOfCode2020/tree/main/Day%203
[4]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_operators?view=powershell-7.1&viewFallbackFrom=powershell-6#comma-operator-
[5]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_operators?view=powershell-7.1#subexpression-operator--
[6]:	https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_switch?view=powershell-7.1
[7]:	https://en.wikipedia.org/wiki/Newline