---
title: "Complex Exercises and Project Work"
description: "Challenging tasks that combine all learned concepts."
---

## Goals
- Apply all learned concepts in more complex programs
- Develop independent problem-solving skills
- Plan and structure programs

## Complex Projects

### Project 1: Interactive Calculator

Write a comprehensive calculator program that:
1. Asks the user for two numbers
2. Asks for the desired operation (+, -, *, /, power)
3. Calculates and displays the result
4. Asks if another calculation should be performed
5. Shows an error message for division by 0

Use:
- User input with `input()`
- Functions for each calculation type
- While-loop for repetition
- Linked conditions for input validation

### Project 2: Pattern Generator

Create a program that offers the user different patterns to choose from:
- "1" for Spiral: Draws a spiral with 50 steps
- "2" for Flower: Draws 8 circles around a center point
- "3" for Star Explosion: Draws 20 lines from center outward
- "4" for Random Art: 15 random shapes in random colors
- "5" for Rainbow Spiral: Spiral with changing colors

Requirements:
- Use a separate function for each pattern
- Use loops and random numbers
- Let the user input parameters (e.g., size, quantity)

### Project 3: Geometry Quiz

Write an interactive quiz program:
1. Generate random geometric problems:
   - Circle circumference given radius
   - Rectangle area given sides
   - Triangle angles (180° - other angles)
2. Ask user for the solution
3. Compare with correct answer
4. Keep statistics (correct/wrong answers)
5. Give evaluation at the end

### Project 4: Turtle Art Gallery

Create a program that draws various artworks:

```python
def fractal_tree(length, angle, depth):
    """Draws a fractal tree"""
    if depth == 0:
        return
    
    t.forward(length)
    t.left(angle)
    fractal_tree(length * 0.7, angle, depth - 1)
    t.right(2 * angle)
    fractal_tree(length * 0.7, angle, depth - 1)
    t.left(angle)
    t.backward(length)

def mandala(size, details):
    """Draws a mandala"""
    for i in range(details):
        t.circle(size)
        t.right(360 / details)
```

## Challenging Individual Tasks

### Task 1: Number Guessing Game
Program a number guessing game:
- Computer chooses random number between 1-100
- User guesses, computer gives hints ("too high", "too low")
- Count number of attempts
- After game: Statistics about previous games

### Task 2: Turtle Graphics Editor
Create a simple graphics editor:
- Menu with different drawing options
- User can choose colors
- Various shapes available
- "Eraser" function (white color)
- Save/load drawings (as coordinate list)

### Task 3: Maze Generator
Generate simple mazes:
- Create a grid of lines
- Randomly remove walls to create paths
- Ensure start and goal are reachable
- Bonus: Solve the maze automatically

### Task 4: Weather Simulation
Simulate weather data:
- Generate random temperatures over 30 days
- Calculate average, maximum, minimum
- Draw a simple diagram of temperatures
- Forecast for next day based on trend

## Project Evaluation Criteria

When evaluating your projects, I look for:

1. **Functionality**: Does the program run without errors?
2. **Code Quality**: Is the code cleanly structured and commented?
3. **Concept Usage**: Are functions, loops, conditions used meaningfully?
4. **Creativity**: Own ideas and extensions
5. **Problem Solving**: How are challenges solved?

## Tips for Large Projects

1. **Plan first**: Think about the flow before you code
2. **Small steps**: Program in small, testable sections
3. **Test frequently**: Run your program regularly
4. **Comment**: Explain difficult parts in the code
5. **Ask for help**: Don't struggle alone too long with problems

## Course Summary

In this Python course you learned:
- **Variables and Data Types**: Store and process data
- **Conditions**: Let programs make decisions
- **Loops**: Make code repeat
- **Functions**: Structure and reuse code
- **Libraries**: Use ready-made functions
- **User Input**: Create interactive programs

With these tools you can already write many interesting programs. This is just the beginning of your programming journey!
