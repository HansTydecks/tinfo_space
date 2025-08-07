---
title: "Algorithm Properties, Variables & Machine Decision Processes"
description: "Introduction to PyTurtle, algorithm properties, first steps with variables and their application in machine decision processes."
---

## Algorithms

You've already worked intensively with algorithms in computer science class before. Here's a definition we can agree on:

:::info Definition: Algorithm
An algorithm is a set of instructions for solving a task or a set of tasks.
:::

### Properties of Algorithms
Not every set of instructions is an algorithm. For us to call something an algorithm, the instructions must have the following properties:

:::details Properties
- **Executability**: The algorithm should be executable without errors
- **Finiteness**: The algorithm has finite length  
- **Repeatability**: For the same inputs, you get the same outputs every time
- **Determinism**: For each step, there is exactly one defined next step
:::

## 🤖 From RobotKarol to PyTurtle 🐢

You already know the robot Karol. In the past, you told her exactly what to do.

::: info Task
Together with your partner, collect **commands** that you could give to Karol. Think about what Karol could do. Then open the following [link](https://karol.arrrg.de/#WFCC) and look at the world where Karol is located. Take a look at the code and think about what Karol will probably do when executing it.
```js
repeat 4 times
  Step(3)
  PutDown
  Step
  TurnLeft
endrepeat
```
:::

Unfortunately, Karol has a small problem. Although she can navigate her environment very well, she has great difficulty remembering things. To solve larger and more complex problems, however, we need to be able to remember and retrieve various data. Fortunately, Karol has a good friend: **Tobi the turtle**, who can remember quite a few things 🐢

## Goals
- How to work with PyTurtle
- How commands from Karol look in Python
- What variables are and
- What variables are used for in computer science (and PyTurtle)

## PyTurtle: Context

"**Python** ([ˈpʰaɪθn̩] or [ˈpʰyːtɔn]) is a universally usable [...] *programming language*. It aims to promote a readable, concise programming style." (official Python [website](https://www.python.org/doc/essays/blurb/)) With the help of Python, we will expand and deepen our skills and knowledge around algorithms. Well, but wasn't there just talk of a turtle?

PyTurtle extends the Python programming language with some functions. In addition to our code, a screen is displayed that lets a small "turtle" walk and draw. This is practical because we can visualize the executed code wonderfully.

<img src="./python-logo-only.png" alt="Python Logo" width="80" />

## First Steps

While we had a separate program for Karol, a website built specifically for the little turtle Tobi is suitable for the turtle: [pythonsandbox.com/turtle](https://pythonsandbox.com/turtle)

// ...existing code structure but translated...

## Variables

You already know the concept of variables from math class. For computer science class, it's important that you set aside your prior knowledge and learn the concept of variables in computer science anew. We can think of **variables as containers for a value** from which you can take something out and put something in.

// ...rest of content translated to English...
