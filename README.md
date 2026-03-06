# Screen Assistant

Always-on-screen AI widget for analyzing selected text and screen content.

## Features

- 🎯 Always-on-top floating widget
- ⌨️ Global keyboard shortcuts
- 📋 Capture selected text from any app
- 👨‍💻 **Developer tools** - Code review, test generation, debugging, security scan
- ✍️ **Text rewriting tools** - Professional, Concise, Friendly rewrites
- 📸 Capture and analyze screenshots
- 📜 **Auto-scroll capture** - Automatically scrolls and captures entire pages
- 📝 **Auto-detect and fill Google Forms** - Automatically extracts questions and suggests answers
- 🤖 AI-powered analysis and summaries
- ⚡ Execute saved commands
- 🎨 Draggable, customizable interface
- 💾 Conversation history tracking

## Quick Start

Run the startup script:
```bash
./start.sh
```

This will:
- Setup Python virtual environment (first time only)
- Install dependencies (first time only)
- Start Python backend
- Launch the Electron app

To stop everything:
```bash
./stop.sh
```

## Auto-Start on Login

To have Screen Assistant start automatically when you log in:

```bash
./install-startup.sh
```

To disable auto-start:

```bash
./uninstall-startup.sh
```

## Keyboard Shortcuts

**Global:**
- `Cmd+Shift+A` - Capture selected text (copy text first, then press)
- `Cmd+Shift+X` - Capture full screenshot
- `Cmd+Shift+S` - **Auto-scroll capture** (captures entire scrolling page)
- `Cmd+Shift+R` - Capture screen region (select area)
- `Cmd+Shift+W` - Toggle widget visibility
- `Cmd/Ctrl + Drag` - Move the emoji widget

**Within Widget:**
- `Escape` - Close widget or modal
- `Cmd+K` - Focus question input
- `Cmd+Enter` - Submit question
- `Cmd+1-5` - Trigger quick action buttons 1-5
- `Cmd+C` - Copy result to clipboard (when result is shown)

## Usage

### Basic Text Analysis
1. Select text anywhere on your screen
2. Copy it (Cmd+C)
3. Press `Cmd+Shift+A` to capture
4. Type your question in the widget
5. Click "Ask" or press Enter

### Text Rewriting ✍️ NEW!
1. Select and copy any text (`Cmd+C`)
2. Press `Cmd+Shift+A` to capture
3. Choose a rewriting style:
   - **💼 Rewrite Professionally** - Transform to formal business tone
   - **✂️ Make Concise** - Shorten and clarify
   - **😊 Make Friendly** - Add warmth and personality
   - **✨ Improve Writing** - Fix grammar and enhance readability
4. Get polished results in seconds!

**See [TEXT-REWRITING-GUIDE.md](TEXT-REWRITING-GUIDE.md) for examples and tips!**

### Developer Tools 👨‍💻 NEW!
1. Copy any code (`Cmd+C`)
2. Press `Cmd+Shift+A` to capture
3. Choose a developer action:
   - **🔍 Review Code** - Security, performance, best practices
   - **🧪 Generate Tests** - Comprehensive unit tests
   - **⚡ Optimize Code** - Performance improvements
   - **🐛 Debug Error** - Analyze and fix errors
   - **📝 Commit Message** - Generate conventional commits
   - **📖 Generate Docs** - Create documentation
   - **🔒 Security Scan** - Find vulnerabilities
4. Get instant developer assistance!

**See [DEVELOPER-FEATURES.md](DEVELOPER-FEATURES.md) for detailed examples!**

### Google Form Auto-Fill 📋
1. Open any Google Form, survey, or questionnaire
2. **Option A - Single Screenshot**: Press `Cmd+Shift+X` to capture visible area
3. **Option B - Auto-Scroll** ⭐: Press `Cmd+Shift+S` to automatically:
   - Scroll through the **entire page** until the end
   - Capture screenshots automatically (stops when end is detected)
   - Analyze ALL questions at once
   - Provide complete answers for the entire form
4. The assistant will **automatically detect** the form and:
   - Extract all visible questions
   - Suggest well-formatted answers
   - Identify question types (multiple choice, text, etc.)
5. Review and use the suggested answers

**See [FORM-FILLING-GUIDE.md](FORM-FILLING-GUIDE.md) for detailed instructions and tips!**

## AI Integration

Uses AWS Bedrock with Claude 3.5 Sonnet via Python Flask backend.

- Backend: `backend/server.py` (runs on port 7227)
- Model: `anthropic.claude-3-5-sonnet-20241022-v2:0`
- Change model in `backend/server.py` by updating `MODEL_ID`
- Port 7227 is automatically managed (no conflicts!)

## Project Structure

```
screen-assistant/
├── frontend/          # Electron app
│   ├── main.js       # Main process
│   ├── preload.js    # Bridge script
│   ├── renderer.js   # UI logic
│   ├── index.html    # Widget interface
│   └── styles.css    # Styling
├── backend/          # Python Flask API
│   ├── server.py     # Bedrock integration
│   ├── requirements.txt
│   └── .env          # AWS credentials
├── start.sh          # Startup script
├── stop.sh           # Stop script
└── package.json
```

## Customization

- **Position**: Drag the widget anywhere on screen
- **Styling**: Edit `frontend/styles.css` for appearance
- **Shortcuts**: Modify shortcuts in `frontend/main.js`

---

## 📚 Documentation

For detailed information about the form filling feature and other capabilities:

- **[📖 Documentation Index](DOCUMENTATION-INDEX.md)** - Complete guide to all documentation
- **[🚀 Quick Reference](QUICK-REFERENCE.md)** - Fast start guide with shortcuts
- **[📋 Form Filling Guide](FORM-FILLING-GUIDE.md)** - Complete form filling instructions
- **[🔧 Troubleshooting](TROUBLESHOOTING.md)** - Solutions to common problems
- **[🧪 Testing Guide](TEST-FORM.md)** - How to test the feature

**New to the form filling feature? Start with [QUICK-REFERENCE.md](QUICK-REFERENCE.md)!**
