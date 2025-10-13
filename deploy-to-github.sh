#!/bin/bash
# deploy-to-github.sh
# Script to build, commit, and deploy VitePress site to GitHub Pages

echo "🚀 Starting VitePress deployment to GitHub Pages..."
echo ""

# Step 1: Build locally to check for errors
echo "📦 Building VitePress site locally..."
npm run docs:build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""

# Step 2: Get commit message from user or use default
if [ -z "$1" ]; then
    echo "💬 Enter commit message (or press Enter for default):"
    read commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Update website content"
    fi
else
    commit_message="$1"
fi

echo ""
echo "📝 Commit message: '$commit_message'"

# Step 3: Git operations
echo ""
echo "📤 Adding changes to git..."
git add .

echo "💾 Committing changes..."
git commit -m "$commit_message"

# Check if there were changes to commit
if [ $? -eq 0 ]; then
    echo "✅ Changes committed successfully!"
    
    echo "🌐 Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 SUCCESS! Your changes have been pushed to GitHub."
        echo "🔄 GitHub Actions will now automatically deploy your site."
        echo "⏱️  This usually takes 2-3 minutes."
        echo ""
        echo "🌍 Your site will be available at:"
        echo "   https://hanstydecks.github.io/tinfo_space/"
        echo ""
        echo "📊 Monitor deployment progress at:"
        echo "   https://github.com/HansTydecks/tinfo_space/actions"
    else
        echo "❌ Failed to push to GitHub. Please check your connection."
        exit 1
    fi
else
    echo "ℹ️  No changes to commit. Your site is already up to date!"
fi

echo ""
echo "✨ Deployment script completed!"
