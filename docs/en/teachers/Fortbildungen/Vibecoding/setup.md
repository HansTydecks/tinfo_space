# Tutorial – Setting up GitHub & Development Environment

This guide walks through the basic setup step by step:

1. Create GitHub account
2. Activate school license & GitHub Copilot
3. Install development environment (IDE)
4. Connect IDE with GitHub

---

## Disclaimer

As is well known, there are many ways to achieve a goal. The way of vibecoding presented here is just one of many. It naturally has [advantages and disadvantages](bedenken.md) that should be considered. I especially want to present this method because I have personally gained experience with it and can share that.

## 0. Basic concepts (briefly explained)

**GitHub**
An online platform where program code is stored. You can save, share and collaboratively edit projects there. GitHub is now firmly linked to its own AI assistant.

**GitHub Copilot**
An AI assistant that provides a variety of LLMs or AI models. It can be used for free after registering with GitHub and is ultimately "responsible" for writing the desired programs.

**Repository ("Repo")**
A project folder on GitHub. Contains files, code and version states. The files of a repository can be published as a website with just a few clicks.

**IDE (Integrated Development Environment)**
A program for writing code. It bundles editor, error help and tools (here also the AI assistant) in one place.

**Prompt**
Message sent to the LLM to get a response.
---

## 2. Create GitHub account

1. Open website **github.com**.
2. Click on **Sign up**.
3. Create account.

✅ Personal GitHub account exists. You should be able to log in and customize your profile.

---

## 3. Activate school license & GitHub Copilot

Schools receive Copilot for free through Education licenses.

1. Log in to GitHub.
2. Click on your profile picture in the top right
3. **Settings** → **Billing and licensing** → **Education benefits**
4. Confirm school status by uploading a PDF of the school certificate, which can be printed by the secretary's office within minutes.
5. Wait for automated confirmation


✅ By registering with GitHub's Education program, you receive a significantly increased token quota. So you can have much more code written.

---

## 4. Install IDE (recommended: Visual Studio Code)

Why this IDE?

* free
* very widespread
* Copilot works automatically after logging in

### Installation

1. Open website **code.visualstudio.com**.
2. Download version for your operating system.
3. Start installation → accept default options.

✅ Program for writing programs is installed.

---

## 5. Connect VS Code with GitHub

1. Open VS Code.
2. Click on **Accounts** (profile symbol) in the left menu.
3. Select **Sign in with GitHub**.
4. Browser opens → confirm login.
5. Switch back to VS Code.

✅ IDE and GitHub are connected.

---

## 6. Activate GitHub Copilot in the IDE

1. In VS Code, click on **Accounts** (profile symbol) on the left.
2. Log in with GitHub account
4. Confirm login.

You can now test this:

* File → Open folder
* Create new folder. This will now be displayed in the IDE's file explorer on the left
* Open chat window
* Prompt: "Create an HTML file that writes Hello World."
