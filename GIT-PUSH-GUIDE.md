# 🚀 Git Push Guide

## Complete Guide to Push Your Code to GitHub

---

## 📋 Prerequisites

1. **GitHub Account** - Create one at https://github.com
2. **Git Installed** - Check with `git --version`
3. **SSH Key** (recommended) or HTTPS credentials

---

## 🔑 Step 1: Setup SSH Key (Recommended)

### Generate SSH Key
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Enter a passphrase (optional but recommended)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub | pbcopy
# Or manually: cat ~/.ssh/id_ed25519.pub
```

### Add SSH Key to GitHub
1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your public key
4. Click "Add SSH key"

### Test Connection
```bash
ssh -T git@github.com
# Should see: "Hi username! You've successfully authenticated..."
```

---

## 📦 Step 2: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to https://github.com/new
2. Repository name: `ai-screen-assistant` (or your choice)
3. Description: "AI-powered screen assistant with code review, form filling, and text tools"
4. Choose Public or Private
5. **Don't** initialize with README (we have one)
6. Click "Create repository"

### Option B: Via GitHub CLI
```bash
# Install GitHub CLI first: brew install gh
gh auth login
gh repo create ai-screen-assistant --public --source=. --remote=origin
```

---

## 🎯 Step 3: Prepare Your Code

### Check Git Status
```bash
# See what files will be committed
git status
```

### Review .gitignore
Make sure these are ignored:
```
node_modules/
backend/venv/
backend/.env
*.log
.DS_Store
```

### Stage All Files
```bash
# Add all files
git add .

# Or add specific files
git add frontend/ backend/ config.json package.json README.md

# Check what's staged
git status
```

---

## 💾 Step 4: Create Initial Commit

### Commit with Descriptive Message
```bash
git commit -m "feat: initial commit - AI Screen Assistant

Features:
- AI-powered text analysis and rewriting
- Developer tools (code review, test generation, debugging)
- Form filling automation with auto-scroll
- Screenshot capture and analysis
- Professional text rewriting
- Security scanning
- Documentation generation
- Customizable quick actions

Tech Stack:
- Frontend: Electron, JavaScript
- Backend: Python Flask, AWS Bedrock (Claude 3.5 Sonnet)
- Port: 7227 (auto-managed)

Includes comprehensive documentation and setup scripts."
```

---

## 🌐 Step 5: Connect to GitHub

### Add Remote Repository

**Using SSH (Recommended):**
```bash
git remote add origin git@github.com:YOUR_USERNAME/ai-screen-assistant.git
```

**Using HTTPS:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-screen-assistant.git
```

### Verify Remote
```bash
git remote -v
# Should show:
# origin  git@github.com:YOUR_USERNAME/ai-screen-assistant.git (fetch)
# origin  git@github.com:YOUR_USERNAME/ai-screen-assistant.git (push)
```

---

## 🚀 Step 6: Push to GitHub

### Set Default Branch Name
```bash
# Rename master to main (modern convention)
git branch -M main
```

### Push Code
```bash
# Push to GitHub
git push -u origin main

# The -u flag sets upstream tracking
# Future pushes can just use: git push
```

### Verify on GitHub
1. Go to https://github.com/YOUR_USERNAME/ai-screen-assistant
2. You should see all your files!

---

## 📝 Step 7: Update Repository Settings

### Add Topics
1. Go to your repository on GitHub
2. Click "⚙️ Settings"
3. Add topics: `ai`, `electron`, `aws-bedrock`, `claude`, `developer-tools`, `code-review`, `automation`

### Add Description
"AI-powered screen assistant with code review, form filling, and text tools. Built with Electron and AWS Bedrock (Claude 3.5 Sonnet)."

### Enable Features
- ✅ Issues
- ✅ Discussions
- ✅ Wiki (optional)
- ✅ Projects (optional)

---

## 🔄 Step 8: Future Updates

### Make Changes
```bash
# Edit files
# ...

# Check what changed
git status
git diff

# Stage changes
git add .

# Commit with message
git commit -m "feat: add new feature"

# Push to GitHub
git push
```

### Commit Message Format
```bash
# Feature
git commit -m "feat: add voice input support"

# Bug fix
git commit -m "fix: resolve scrolling issue in widget"

# Documentation
git commit -m "docs: update installation guide"

# Refactor
git commit -m "refactor: improve code organization"

# Performance
git commit -m "perf: optimize image processing"

# Style
git commit -m "style: format code with prettier"
```

---

## 🌿 Step 9: Branching Strategy

### Create Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes
# ...

# Commit changes
git add .
git commit -m "feat: implement new feature"

# Push branch
git push -u origin feature/new-feature

# Create Pull Request on GitHub
```

### Merge to Main
```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge feature branch
git merge feature/new-feature

# Push to GitHub
git push origin main

# Delete feature branch (optional)
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

---

## 📊 Step 10: Add Badges to README

Add these to your README.md:

```markdown
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey)
![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/ai-screen-assistant)
![Issues](https://img.shields.io/github/issues/YOUR_USERNAME/ai-screen-assistant)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
```

---

## 🎯 Quick Reference

### Common Commands
```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push

# Pull latest
git pull

# View history
git log --oneline

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name

# View remotes
git remote -v

# View branches
git branch -a
```

---

## 🐛 Troubleshooting

### "Permission denied (publickey)"
```bash
# Check SSH key
ssh -T git@github.com

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Or use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/ai-screen-assistant.git
```

### "Repository not found"
```bash
# Check remote URL
git remote -v

# Update remote URL
git remote set-url origin git@github.com:YOUR_USERNAME/ai-screen-assistant.git
```

### "Failed to push"
```bash
# Pull first
git pull origin main --rebase

# Then push
git push origin main
```

### "Large files"
```bash
# Check file sizes
du -sh * | sort -h

# Remove large files from git
git rm --cached large-file.zip
echo "large-file.zip" >> .gitignore
git commit -m "chore: remove large file"
```

---

## 📚 Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **Conventional Commits**: https://www.conventionalcommits.org

---

## ✅ Checklist

Before pushing:
- [ ] Remove sensitive data (API keys, passwords)
- [ ] Update .gitignore
- [ ] Test the application
- [ ] Update documentation
- [ ] Write clear commit message
- [ ] Check file sizes
- [ ] Review changes with `git diff`

After pushing:
- [ ] Verify files on GitHub
- [ ] Add repository description
- [ ] Add topics/tags
- [ ] Enable Issues and Discussions
- [ ] Add README badges
- [ ] Share with community!

---

## 🎉 You're Done!

Your code is now on GitHub! 🚀

**Next steps:**
1. Share your repository
2. Add a star ⭐
3. Invite collaborators
4. Create issues for future features
5. Accept contributions

**Repository URL:**
```
https://github.com/YOUR_USERNAME/ai-screen-assistant
```

---

**Happy coding! 💻✨**
