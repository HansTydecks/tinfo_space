@echo off
REM deploy-to-github.bat
REM Windows batch script to build, commit, and deploy VitePress site to GitHub Pages

echo 🚀 Starting VitePress deployment to GitHub Pages...
echo.

REM Step 1: Build locally to check for errors
echo 📦 Building VitePress site locally...
call npm run docs:build

if errorlevel 1 (
    echo ❌ Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

REM Step 2: Get commit message from user or use default
set "commit_message="
if "%~1"=="" (
    set /p commit_message="💬 Enter commit message (or press Enter for default): "
    if "!commit_message!"=="" set commit_message=Update website content
) else (
    set commit_message=%~1
)

echo.
echo 📝 Commit message: '%commit_message%'

REM Step 3: Git operations
echo.
echo 📤 Adding changes to git...
git add .

echo 💾 Committing changes...
git commit -m "%commit_message%"

if errorlevel 1 (
    echo ℹ️  No changes to commit. Your site is already up to date!
    goto :end
)

echo ✅ Changes committed successfully!

echo 🌐 Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo ❌ Failed to push to GitHub. Please check your connection.
    pause
    exit /b 1
)

echo.
echo 🎉 SUCCESS! Your changes have been pushed to GitHub.
echo 🔄 GitHub Actions will now automatically deploy your site.
echo ⏱️  This usually takes 2-3 minutes.
echo.
echo 🌍 Your site will be available at:
echo    https://hanstydecks.github.io/tinfo_space/
echo.
echo 📊 Monitor deployment progress at:
echo    https://github.com/HansTydecks/tinfo_space/actions

:end
echo.
echo ✨ Deployment script completed!
pause
