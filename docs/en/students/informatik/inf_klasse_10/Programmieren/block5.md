---
title: "Libraries and Functions"
description: "Using external libraries, writing your own functions, and structuring programs."
---

## Goals
- Import and use external libraries
- Define and use your own functions
- Understand parameters and return values
- Structure programs cleanly

## External Libraries

Python becomes even more powerful through libraries. A library is a collection of functions that other programmers have written.

### The random Library

```python
import turtle
import random  # [!code focus]

t = turtle.Turtle()

# Generate random numbers
random_number = random.randint(1, 6)  # [!code focus]
t.write(f"Dice: {random_number}")

t.penup()
t.goto(0, -50)
t.pendown()

# Random color
colors = ["red", "blue", "green", "yellow", "purple"]
random_color = random.choice(colors)  # [!code focus]
t.color(random_color)
t.circle(30)
```

### The math Library

```python
import turtle
import math  # [!code focus]

t = turtle.Turtle()

# Use mathematical functions
radius = 50
circumference = 2 * math.pi * radius  # [!code focus]
area = math.pi * radius * radius  # [!code focus]

t.write(f"Circle: Circumference = {circumference:.1f}")
t.penup()
t.goto(0, -30)
t.pendown()
t.write(f"Area = {area:.1f}")
```

:::details Useful Functions
**random Library:**
- `random.randint(a, b)`: Random integer between a and b
- `random.choice(list)`: Random element from a list
- `random.random()`: Random decimal between 0 and 1

**math Library:**  
- `math.pi`: The number Pi (3.14159...)
- `math.sqrt(x)`: Square root of x
- `math.pow(x, y)`: x to the power of y
:::

## Defining Functions

You already know many functions: `t.forward()`, `t.left()`, `int()`, etc. Functions give you the ability to reuse program code in different places with little effort.

### Simple Functions without Parameters

```python
import turtle
t = turtle.Turtle()

def draw_triangle():  # [!code focus]
    for i in range(3):   # [!code focus]
        t.forward(50)    # [!code focus]
        t.left(120)      # [!code focus]

# Call function
draw_triangle()
t.forward(100)
draw_triangle()
```

:::details Explanation
With `def` we define a new function called `draw_triangle`. The code in the function is only executed when we call it with `draw_triangle()`.
:::

### Functions with Parameters

```python
import turtle
t = turtle.Turtle()

def draw_square(size):  # [!code focus]
    for i in range(4):          # [!code focus]
        t.forward(size)      # [!code focus]
        t.left(90)              # [!code focus]

# Draw different squares
draw_square(30)
t.penup()
t.forward(100)
t.pendown()
draw_square(50)
```

### Functions with Return Values

```python
import turtle
t = turtle.Turtle()

def square_perimeter(side_length):  # [!code focus]
    perimeter = side_length * 4      # [!code focus]
    return perimeter                  # [!code focus]

# Use function
side = 25
perimeter = square_perimeter(side)
t.write(f"Perimeter: {perimeter}")
```

## Tasks

### Task 1: Star Function
Write a function `draw_star(size)` that draws a 5-pointed star.

### Task 2: Random Artwork
Create a program that draws random artwork:
- Draw 10 circles with random sizes (between 10 and 50)
- Each circle should have a random color
- The position of each circle should be random
- Use a function `random_circle()`

### Task 3: Polygon Generator
Create a function `draw_polygon(sides, size)` that draws any regular polygon.

### Task 4: Geometry Calculator
Write functions for geometric calculations:
- `circle_area(radius)`: Calculates the area of a circle
- `rectangle_perimeter(width, height)`: Calculates the perimeter of a rectangle

## Preparation for Block 6
Think about more complex programs that combine all previous concepts.
