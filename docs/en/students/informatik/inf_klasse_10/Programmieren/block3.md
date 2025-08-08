---
title: "Linked Conditionals and while-Loops"
description: "Complex conditions with logical operators and first loops with while."
---

## Goals
- Link conditions with logical operators
- Understand and apply while-loops
- Program more complex decision structures

## Linked Conditions

In some places, you get a heat day off under two conditions. The temperature must be over 30 degrees Celsius in the shade and it must be before 10:00 AM. You could also say: if `temp >= 30` and `shade == True` and `time < 10` must all be True.

Such links of conditions are connected to our language as clearly recognizable in the example above. If condition 1 is True AND condition 2 is True, then do something. Another way to link conditions is with logical OR.

| Operator | Name | Example Condition | Value for `x` that gives `True` | Value for `x` that gives `False` |
|:-------:|------|-------------------|--------------------------------|---------------------------------|
| `and` | Logical AND | `x > 0 and x < 10` | `5` | `0` |
| `or` | Logical OR | `x < 0 or x > 10` | `11` | `5` |
| `not` | Logical NOT | `not (x == 5)` | `3` | `5` |

```python
import turtle
t = turtle.Turtle()

height = 160
age = 12

if height > 150 and age > 8:
    t.write("You may ride")
else:
    t.write("You may NOT ride")
```

:::info Task
Change the program so that the person may ride.
```python
import turtle
t = turtle.Turtle()

height = 
age = 
if height > 150 and age > 8:
    t.write("You may ride")
else:
    t.write("You may NOT ride")
```
:::

## While-Loops

We also know the while-loop from Karol.

```
repeat while IsWall
  TurnLeft
endrepeat
```

Here Karol repeats the TurnLeft until the condition is no longer met, meaning she's no longer in front of a wall.

Try to understand the Python program well before looking at the explanation:

```python
import turtle
t = turtle.Turtle()

distance = 0
win = False
while win == False:
    t.left(12)
    t.forward(10)
    distance = distance + 10
    if distance > 100:
        win = True
```

:::detail Explanation
Tobi is supposed to compete in a small race. He needs to cover distance and win. As long as he hasn't won, he must keep running (`win == False`). Now he runs 10 steps and it's checked whether he has already taken more than 100 steps. If so, he has won `win = True` and the condition `win == False` is no longer met.
:::

:::danger Warning
Unlike many programming languages, the content of the loop in Python is indented by one tab. Never forget the colon at the end of the loop.
:::

## Tasks

### Task 1: Entry Control
Write a program for a disco. A person can only enter if they:
- Are at least 18 years old AND have a ticket
- OR if they have VIP status (regardless of age)

### Task 2: Countdown
Create a countdown from 10 to 0 with a while-loop. Tobi should write each number individually.

### Task 3: Dice Game
Simulate rolling dice until a 6 comes up. Count how many times you rolled.
:::details Tip
Use `import random` and `random.randint(1,6)` for the dice.
:::

## Preparation for Block 4
Think about when you would use a while-loop and when you would better use a loop with a fixed number of repetitions.
