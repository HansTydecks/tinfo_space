---
title: "Data Types and Simple Conditionals"
description: "Understanding different data types and programming simple decisions with if statements."
---

## Goals
- Distinguish and apply different data types
- Formulate simple conditions with if-else
- Use comparison operators correctly

## Data Types of Variables

In the last block, you learned how to work with variables, meaning you can now *initialize* variables, *assign values* to them, and *calculate* with them. According to the container model, variables seem to always hold numbers. In reality, variables we define can hold values of very different types, meaning values other than just numbers.

| Data Type Name | What Python Expects | Example in Python |
|----------------|---------------------|-------------------|
| Integer `(int)` | whole number | `x = 3`, `number = -5` |
| Float `(float)` | decimal number | `height = 163.5`, `speed = 4.52` |
| String `(str)` | text | `name = "Thomas"`, `msg = "Hello World"` |
| Boolean `(bool)` | truth value (true/false) | `win = True`, `lost = False` |

The good news: Python often handles management automatically. If we want to calculate with integers and decimal numbers at the same time, that's no problem at all.

```python
import turtle
t = turtle.Turtle()

i = 10 # [!code focus]
f = 3.6 # [!code focus]
t.write(i - f) # [!code focus]
```

However, if you try to simply calculate with a string of letters, it won't work.

```python
import turtle
t = turtle.Turtle()

text = "Hello"
t.write(10 + text)
```

:::detail Explanation
This results in an error because Python doesn't know how to add a number and text together.
:::

## Simple Conditionals

### Simple Conditions

You already know conditions from Karol. Sometimes you had to check with `IsWall` whether Karol was standing in front of a wall and decide based on this condition whether she should take a step forward. Conditions are therefore crucial for the flow of your program and become particularly interesting when we can design them ourselves with variables.

```python
import turtle
t = turtle.Turtle()

x = 6
if x < 5:
    t.write("x is less than 5!")
else:
    t.write("x is greater than or equal to 5!")
```

:::detail Explanation
Tobi first checks if the condition `x < 5` is True. It's not, so he doesn't execute the instruction `t.write("x is less than 5!")`. Since there's an `else`, he executes the alternative.
:::

Note the **often forgotten colon after the condition**.

#### Possible Comparison Operators
| Operator | Name | Example Condition | Value for `x` that gives `True` | Value for `x` that gives `False` |
|:-------:|------|-------------------|--------------------------------|---------------------------------|
| `==` | Equality | `x == 5` | `5` | `3` |
| `!=` | Inequality | `x != 5` | `3` | `5` |
| `<` | Less than | `x < 5` | `4` | `5` |
| `<=` | Less than or equal | `x <= 5` | `5` | `6` |
| `>` | Greater than | `x > 5` | `6` | `5` |
| `>=` | Greater than or equal | `x >= 5` | `5` | `4` |

:::danger Warning
One of the most common programming mistakes is confusing `=` and `==`. We know `=` as the assignment operator from variables. With `x == 5` we **check** whether this condition is true.
:::

## Tasks

### Task 1: Age Groups
Write a program that stores a person's age in a variable and outputs an appropriate message based on age:
- Under 12: "You are a child"
- 12-17: "You are a teenager"
- 18 and over: "You are an adult"

### Task 2: Grade Output
Create a program that converts a point score (0-15) into a grade:
- 15-13 points: "Excellent"
- 12-10 points: "Good"
- 9-7 points: "Satisfactory"
- 6-4 points: "Sufficient"
- Under 4 points: "Insufficient"

### Task 3: Temperature Check
Write a program that evaluates a temperature:
- Under 0°C: "It's freezing"
- 0-10°C: "It's cold"
- 11-25°C: "Pleasant temperature"
- Over 25°C: "It's warm"

## Preparation for Block 3
Prepare for linked conditions by thinking about how you could check multiple conditions simultaneously.
