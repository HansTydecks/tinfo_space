---
title: "For-Loops and Counting Loops"
description: "Programming loops with fixed number of repetitions and drawing more complex patterns."
---

## Goals
- Understand and apply for-loops
- Use counting variables meaningfully
- Program more complex geometric patterns

## For-Loops

You surely remember how you sent the robot Karol through the small worlds. Often Karol had to execute certain instructions several times in a row. Instead of typing each instruction individually, we used **loops**. You surely remember the following example:

```
repeat 5 times 
Step
TurnRight
endrepeat
```

Loops exist not only with Karol, but also with Tobi the turtle. Here they look somewhat different but serve the same purpose. If you want to repeat instructions a fixed number of times (Karol: `repeat 5 times`), you use the `for i in range(start, end):` command in Python.

```python
import turtle
t = turtle.Turtle()

for i in range(1, 10):
    t.write(i)
    t.forward(10)
t.forward(10)
```

Here `i` is a variable that can be used just like the variables from Block 1. Important: it's always increased by 1 at the end of the loop. It's often called a counting variable.

:::details Important Note
The counting variable `i` equals the first number in `range(start, end)` at the beginning of the loop. However, `i` never becomes `end`, because the loop's termination condition is reached *as soon as `i` reaches `end`*. In our example, `i` counts up to 9, then is increased by 1 and thus breaks the loop.
:::

### Different range() Variants

```python
# Only one number: from 0 to n-1
for i in range(5):      # 0, 1, 2, 3, 4
    t.write(i)

# Two numbers: from start to end-1  
for i in range(2, 8):   # 2, 3, 4, 5, 6, 7
    t.write(i)

# Three numbers: from start to end-1 in steps
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    t.write(i)
```

## Geometric Patterns with For-Loops

### Simple Shapes
```python
import turtle
t = turtle.Turtle()

# Equilateral triangle
for i in range(3):
    t.forward(100)
    t.left(120)

# Square  
for i in range(4):
    t.forward(80)
    t.left(90)
```

### More Complex Patterns
```python
import turtle
t = turtle.Turtle()

# Spiral
for i in range(50):
    t.forward(i * 2)
    t.left(90)

# Concentric circles
for i in range(1, 6):
    t.circle(i * 20)
    t.penup()
    t.right(90)
    t.forward(20)
    t.left(90)
    t.pendown()
```

## Tasks

### Task 1: Zebra Stripes
Draw 5 short, parallel lines next to each other that look like zebra stripes using a loop.
:::details Tip
Use t.forward() and t.penup() / t.pendown() so Tobi can jump without drawing.
:::

### Task 2: Staircase Steps
Draw a staircase with 6 steps, each step e.g. 10 steps high and 10 steps wide.

### Task 3: Star
Write a loop that draws a 5-pointed star. A star is created when you do the following 5 times: go forward, then turn 144 degrees to the right.

### Task 4: Flower Pattern
Draw 8 circles around a center point so they look like a flower.
:::details Tip
After each circle: `t.left(45)` for even distribution.
:::

### Task 5: Rainbow Rectangles
Draw 7 rectangles in different colors next to each other. Each rectangle should have a different color.

```python
colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
```

## Preparation for Block 5
Think about which parts of your code you use more often and how you could pack them into reusable building blocks.
