# Getting to Know VS Code

Central areas of the interface

1. Far left sidebar (Activity Bar)

**Explorer** (file symbol): Files and folders of the project. The file explorer here works exactly like your operating system's file explorer. Create and rename files and folders, or move and delete them.

**Search** (magnifying glass): Git & version control

**Extensions**: Install extensions (for advanced users)

2. File Explorer (also on the left)

- Shows all project files.
- Right-click → new file / new folder (in most cases Copilot takes care of this)
- This is where the project structure is created.

3. Editor (center)

- Main workspace
- This is where code is written
- Multiple files can be open as tabs

4. AI Chat Window (right)

- Communication with Copilot / LLM
- Ask questions, have code explained, analyze errors

Important options in chat (below):
- Select model (the selection is large and invites experimentation. My recommendation: the ClaudeAI models)
- Switch response mode


5. Terminal (below)

- Direct commands to the computer
- Will be used for Git later

6. Menu bar at the top
- File: Open projects/folders

# The Vibecoding Workflow

Here's a suggestion for how to approach programming with AI.

## Formulate an idea

Is the worksheet a bit dry? Does the task lack some momentum? Would more gamification really catch the class? These are exactly the points where you could start with an interactive simulation. Now two cases can occur:
1. You *already have a concrete idea* for a finished "product", including functions and interface.
2. You have the feeling that a certain problem *could* be solved with the help of a computer simulation.

With a *concrete idea* you can get started directly in the next step.
If you want to plan further, it can be helpful to talk to colleagues or students.

**My tip**: talk to an AI of your choice. Ideas often bubble up in dialogue. The AI also occasionally brings aspects into the conversation that you hadn't considered before. For this, it's best to use the IDE's AI window in planning mode. This can be activated below the text input field (Agent/Ask/**Plan**). If you switch the agent mode to "Agent" at the end of planning, the plan is directly implemented.

## Write a long prompt

The (first) prompt is the key to a satisfactory result. There are some tricks to keep in mind:

- **Microphone on**: the AI doesn't care if you formulate colloquially. On the contrary. The more context the better, so just talk away.
- Technical terms are not a must. Whether you remember the term drop-down menu or pop-up window when describing is not necessarily important, as long as you describe in enough detail.
- Describe the functions your program should have (positive prompt).
- Describe the functions your program should **not** have (negative prompt).
- Technical details: should the program work as a website later? Do you want a window on the screen? Should a single .exe file be the result?
- Explain placeholders if you want to add something yourself.
- Describe the interface (colors, shapes, UI).
- Lots of details lead to good results.

Prompting is quickly learned. If you know what you want to achieve with your prompt, there are no secrets in prompting. If you still want to improve, you should read up on [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering).

## Debug and improve the program
You probably know the following process from creating your worksheets. Open your program and ask yourself the following questions:

Does the program/website start?
Are there error messages?
Is the layout correct?
Do the buttons work as expected?
Do I understand what's happening and what I should do? Are there missing hints for learners?
Is the program logic correct?
...

Errors, problems and inaccuracies are given back to the LLM in the dialogue. Explain your expectations in detail. Depending on the program, you need more or fewer iterations to get the program running.

Important: you can also give the LLM access to the terminal. The LLM will automatically ask you for this. The problems are usually trivial and the LLM solves the problems independently, but you should still make sure that no [serious errors](https://www.golem.de/news/programmieren-mit-gemini-googles-ki-loescht-daten-und-entschuldigt-sich-dafuer-2507-198501.html) occur.

## Upload project to GitHub

Git is a tool to version your code, keep track of changes, and if necessary retrieve an older, working version. The three most important commands that you must execute in sequence in the **terminal** are the following:
```
git add .
git commit -m "First working version"
git push
```
Meaning:
- add → mark changes
- commit → save version
- push → upload online to GitHub
