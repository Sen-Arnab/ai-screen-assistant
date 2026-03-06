#!/bin/bash

# Git Push Helper Script
# This script helps you push your code to GitHub

echo "🚀 Git Push Helper"
echo "=================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
    echo ""
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "🌐 Setting up GitHub remote..."
    echo ""
    echo "Please enter your GitHub username:"
    read github_username
    echo ""
    echo "Please enter your repository name (default: ai-screen-assistant):"
    read repo_name
    repo_name=${repo_name:-ai-screen-assistant}
    echo ""
    echo "Choose connection method:"
    echo "1) SSH (recommended)"
    echo "2) HTTPS"
    read -p "Enter choice (1 or 2): " connection_choice
    
    if [ "$connection_choice" = "1" ]; then
        git remote add origin "git@github.com:${github_username}/${repo_name}.git"
        echo "✅ Remote added (SSH)"
    else
        git remote add origin "https://github.com/${github_username}/${repo_name}.git"
        echo "✅ Remote added (HTTPS)"
    fi
    echo ""
fi

# Show current status
echo "📊 Current Status:"
git status --short
echo ""

# Ask to continue
read -p "Do you want to add all files? (y/n): " add_files
if [ "$add_files" = "y" ]; then
    echo "📦 Adding files..."
    git add .
    echo "✅ Files added"
    echo ""
fi

# Show what will be committed
echo "📝 Files to be committed:"
git status --short
echo ""

# Ask for commit message
echo "💬 Enter commit message (or press Enter for default):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="feat: initial commit - AI Screen Assistant

Features:
- AI-powered text analysis and rewriting
- Developer tools (code review, test generation, debugging)
- Form filling automation with auto-scroll
- Screenshot capture and analysis
- Professional text rewriting
- Security scanning
- Documentation generation

Tech Stack:
- Frontend: Electron, JavaScript
- Backend: Python Flask, AWS Bedrock (Claude 3.5 Sonnet)
- Port: 7227 (auto-managed)"
fi

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "$commit_message"
echo "✅ Changes committed"
echo ""

# Push
echo "🚀 Pushing to GitHub..."
read -p "Ready to push? (y/n): " ready_to_push

if [ "$ready_to_push" = "y" ]; then
    git push -u origin main
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your code is now on GitHub!"
    echo ""
    echo "📍 Repository URL:"
    git remote get-url origin | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git$//'
    echo ""
else
    echo "⏸️  Push cancelled. You can push later with: git push -u origin main"
fi

echo ""
echo "✨ Done!"
