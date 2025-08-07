---
title: "Python Turtle - Cheat Sheet & Wiki"
description: "Quick overview of all important commands, rules and functions from the course"
---

# 🐢 Python Turtle - Cheat Sheet & Wiki

A quick overview of all important commands and rules from the Python course.

## 📚 Algorithm Fundamentals

:::info Definition: Algorithm
An algorithm is a set of instructions for solving a task or a set of tasks.
:::

### Properties of Algorithms
- **Executability**: The algorithm should be executable without errors
- **Finiteness**: The algorithm has finite length
- **Repeatability**: Same inputs produce same outputs
- **Determinism**: For each step there is exactly one defined next step

## 🚀 Basics - Always First!

```python
import turtle
t = turtle.Turtle()
t.speed(5)  # 1:slowest, 3:slow, 5:normal, 10:fast, 0:fastest
```

## 🎨 Turtle Commands

| Command | What Happens | Example |
|---------|--------------|---------|
| `t.forward(number)` | Tobi goes forward | `t.forward(100)` |
| `t.backward(number)` | Tobi goes backward | `t.backward(50)` |
| `t.right(degrees)` | Tobi turns right | `t.right(90)` |
| `t.left(degrees)` | Tobi turns left | `t.left(45)` |
| `t.circle(radius)` | Tobi draws a circle | `t.circle(30)` |
| `t.goto(x, y)` | Tobi jumps to position | `t.goto(100, 50)` |
| `t.penup()` | Lift pen (don't draw) | `t.penup()` |
| `t.pendown()` | Lower pen (draw) | `t.pendown()` |
| `t.color("color")` | Change color | `t.color("red")` |
| `t.write("text")` | Write text | `t.write("Hello!")` |
| `t.heading()` | Get current direction (0-360°) | `if t.heading() == 90:` |

## 📊 Variables & Container Model

Variables are **containers for values** from which you can take something out and put something in.

| Rule | Explanation | Example |
|------|-------------|---------|
| **Create** | `name = value` | `age = 15` |
| **Overwrite** | New value with `=` | `age = 16` |
| **Calculate** | Variable = old Variable + number | `age = age + 1` |
| **Names** | Lowercase, self-explanatory, no spaces | `shoe_size = 42` |

### Data Types

| Type | What it is | Example | Convert |
|------|------------|---------|---------|
| **Integer** | Whole number | `x = 5` | `int("5")` |
| **Float** | Decimal number | `y = 3.14` | `float("3.14")` |
| **String** | Text | `name = "Max"` | `str(5)` |
| **Boolean** | True/False | `win = True` | - |

### Casting (Conversion)
```python
# String to number
age = int(input("Age: "))        # to Integer
height = float(input("Height: "))    # to Float

# Number to string
message = "I am " + str(25) + " years old"
```

## 🔢 Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `10 / 3` | `3.333...` |
| `//` | Integer Division | `10 // 3` | `3` |
| `%` | Remainder (Modulo) | `10 % 3` | `1` |
| `**` | Power | `2 ** 3` | `8` |

## ✅ Conditions & Branching

### Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | equals | `if x == 5:` |
| `!=` | not equal | `if x != 5:` |
| `<` | less than | `if x < 5:` |
| `<=` | less than or equal | `if x <= 5:` |
| `>` | greater than | `if x > 5:` |
| `>=` | greater than or equal | `if x >= 5:` |

### Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `and` | AND (both must be true) | `if x > 0 and x < 10:` |
| `or` | OR (one must be true) | `if x < 0 or x > 10:` |
| `not` | NOT (reverses) | `if not (x == 5):` |

### If-Structures

```python
# Simple condition
if condition:
    # Executed when true
    t.write("True!")
else:
    # Executed when false
    t.write("False!")

# Multiple conditions
if x < 0:
    t.write("Negative")
elif x == 0:
    t.write("Zero")
else:
    t.write("Positive")
```

## 🔄 Loops

### For-Loop (specific number)

```python
for i in range(5):          # 0, 1, 2, 3, 4
    t.forward(10)

for i in range(2, 8):       # 2, 3, 4, 5, 6, 7
    t.write(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (step size 2)
    t.circle(i)
```

:::details Range Variants
- `range(5)`: 0 to 4
- `range(2, 8)`: 2 to 7
- `range(0, 10, 2)`: 0, 2, 4, 6, 8 (steps of 2)
:::

### While-Loop (as long as condition is true)

```python
x = 0
while x < 5:
    t.forward(x)
    x = x + 1
```

:::warning Important
- Always colon after condition/loop: `:`
- Content must be indented (Tab key)
- With while-loops: Change variable, otherwise infinite loop!
:::

## 💬 User Input

| Command | What Happens | Example |
|---------|--------------|---------|
| `input("text")` | User enters text | `name = input("Your name: ")` |
| `int(input())` | Convert input to number | `age = int(input("Age: "))` |
| `float(input())` | Convert input to decimal | `height = float(input("Height: "))` |

:::danger Important Note
`input()` **always** returns a string! For calculations you must cast:
```python
# Wrong:
age = input("Age: ")  # String!

# Right:
age = int(input("Age: "))  # Integer!
```
:::

## ⚙️ Functions

### Simple Function

```python
def my_function():
    t.forward(50)
    t.left(90)

# Call:
my_function()
```

### Function with Parameters

```python
def square(size):
    for i in range(4):
        t.forward(size)
        t.left(90)

# Call:
square(50)
```

### Function with Multiple Parameters

```python
def rectangle(width, height):
    for i in range(2):
        t.forward(width)
        t.left(90)
        t.forward(height)
        t.left(90)

# Call:
rectangle(80, 40)
```

### Function with Return Value

```python
def add(a, b):
    result = a + b
    return result

# Use:
sum = add(5, 3)
t.write(sum)
```

## 📚 Important Libraries

### Random (Random Numbers)

```python
import random

# Random integer between 1 and 6
dice = random.randint(1, 6)

# Random element from list
colors = ["red", "blue", "green"]
color = random.choice(colors)

# Random decimal between 0 and 1
random_num = random.random()
```

### Math (Mathematics)

```python
import math

# Use Pi
circumference = 2 * math.pi * radius

# Square root
root = math.sqrt(25)  # = 5.0

# Power
power = math.pow(2, 3)  # = 8.0
```

## ⚠️ Common Errors

| Error | Correct | Wrong |
|-------|---------|--------|
| **Forgot colon** | `if x == 5:` | `if x == 5` |
| **Forgot indentation** | `    t.forward(10)` | `t.forward(10)` |
| **= instead of ==** | `if x == 5:` | `if x = 5:` |
| **String + Number** | `"Age: " + str(15)` | `"Age: " + 15` |
| **Capitalization** | `True` | `true` |
| **Variable before assignment** | `x = 5` then `print(x)` | `print(x)` then `x = 5` |

## 🎯 Useful Tricks

### String Formatting

```python
name = "Max"
age = 15
t.write(f"Hello {name}, you are {age} years old!")
```

### Lists

```python
numbers = [1, 2, 3, 4, 5]
colors = ["red", "blue", "green"]

# First element: list[0]
first_number = numbers[0]  # = 1

# Go through list:
for color in colors:
    t.color(color)
    t.circle(20)
```

### Multiple Turtle Objects

```python
import turtle

tobi = turtle.Turtle()
lisa = turtle.Turtle()

tobi.color("red")
lisa.color("blue")

tobi.forward(100)
lisa.backward(100)
```

## 🔧 Debugging Tips

1. **Print-Debugging**: Use `print()` to check variable values
```python
x = 10
print(f"x has the value: {x}")
```

2. **Step by step**: Test small parts individually

3. **Use comments**: Explain difficult parts
```python
# Here the square is drawn
for i in range(4):
    t.forward(50)
    t.left(90)
```

4. **Common problems**:
   - Forgotten colons
   - Wrong indentation
   - `=` instead of `==`
   - Infinite loops with while

## 🎨 Geometric Pattern Examples

### Spiral
```python
for i in range(50):
    t.forward(i * 2)
    t.left(90)
```

### Star (5-pointed)
```python
for i in range(5):
    t.forward(100)
    t.right(144)
```

### Concentric Circles
```python
for i in range(1, 6):
    t.circle(i * 20)
    t.penup()
    t.right(90)
    t.forward(20)
    t.left(90)
    t.pendown()
```

## 📋 Project Planning Tips

1. **Plan first**: Think about the flow before you code
2. **Small steps**: Program in small, testable sections
3. **Test frequently**: Run your program regularly
4. **Comment**: Explain difficult parts in the code
5. **Ask for help**: Don't struggle alone too long with problems

## 📝 Quick Template

```python
import turtle
import random
import math

t = turtle.Turtle()
t.speed(5)

# Your code here

# Keep window open (at the end):
turtle.done()
```

## 🏆 Evaluation Criteria

For projects, the following is evaluated:
- **Functionality**: Does the program run without errors?
- **Code Quality**: Clean structure and comments?
- **Concept Usage**: Meaningful use of functions, loops, etc.?
- **Creativity**: Own ideas and extensions
- **Problem Solving**: How are challenges solved?
