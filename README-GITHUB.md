# 🤖 AI Screen Assistant

An intelligent, always-on-screen AI assistant powered by AWS Bedrock (Claude 3.5 Sonnet) that helps with text analysis, code review, form filling, and more.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey)

## ✨ Features

### 🎯 Core Features
- **Always-on-top floating widget** - Quick access from anywhere
- **Global keyboard shortcuts** - Capture text and screenshots instantly
- **AI-powered analysis** - Powered by Claude 3.5 Sonnet
- **Draggable interface** - Position anywhere on screen
- **Conversation history** - Track all your interactions

### 👨‍💻 Developer Tools
- **🔍 Code Review** - Security, performance, best practices analysis
- **🧪 Test Generation** - Comprehensive unit tests with edge cases
- **⚡ Code Optimization** - Performance and readability improvements
- **🐛 Error Debugging** - Root cause analysis and solutions
- **📝 Commit Messages** - Generate conventional commit messages
- **📖 Documentation** - Auto-generate JSDoc/docstrings
- **🔒 Security Scan** - Find vulnerabilities and get fixes

### ✍️ Text Tools
- **💼 Professional Rewrite** - Transform casual to formal business tone
- **✂️ Make Concise** - Shorten and clarify text
- **😊 Make Friendly** - Add warmth and personality
- **✨ Improve Writing** - Fix grammar and enhance readability
- **🌐 Translate** - Multi-language support
- **📝 Summarize** - Quick summaries

### 📋 Form Automation
- **Auto-detect Google Forms** - Automatically recognize forms
- **📜 Auto-scroll capture** - Capture entire multi-page forms
- **Smart question extraction** - Extract all questions with types
- **Intelligent answers** - Generate contextual, natural responses

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+ and npm
- **Python** 3.8+
- **AWS Account** with Bedrock access
- **macOS, Linux, or Windows**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-screen-assistant.git
   cd ai-screen-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AWS credentials**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your AWS credentials
   ```

4. **Start the application**
   ```bash
   ./start.sh
   ```

### AWS Setup

1. **Enable Bedrock access** in your AWS account
2. **Request access** to Claude 3.5 Sonnet model
3. **Create IAM user** with Bedrock permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "bedrock:InvokeModel",
           "bedrock:InvokeModelWithResponseStream"
         ],
         "Resource": "*"
       }
     ]
   }
   ```
4. **Add credentials** to `backend/.env`:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+A` | Capture selected text |
| `Cmd+Shift+X` | Capture screenshot |
| `Cmd+Shift+S` | Auto-scroll capture (entire page) |
| `Cmd+Shift+R` | Capture screen region |
| `Cmd+Shift+W` | Toggle widget visibility |
| `Cmd+K` | Focus input field |
| `Cmd+Enter` | Submit question |
| `Cmd+1-5` | Quick action buttons |
| `Cmd+C` | Copy result |
| `Escape` | Close widget |

## 📖 Usage Examples

### Code Review
```javascript
// 1. Copy your code
function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.query(query);
}

// 2. Press Cmd+Shift+A
// 3. Click "🔍 Review Code"
// 4. Get instant security and performance feedback!
```

### Professional Email
```
// 1. Copy your draft
"hey can u send me that report when u get a chance?"

// 2. Press Cmd+Shift+A
// 3. Click "💼 Rewrite Professionally"
// 4. Get polished version!
```

### Form Filling
```
// 1. Open a long Google Form
// 2. Press Cmd+Shift+S
// 3. Wait for auto-scroll capture
// 4. Get all questions answered!
```

## 🛠️ Configuration

### Custom Actions

Edit `config.json` to add your own actions:

```json
{
  "assistant": {
    "actions": [
      {
        "id": "custom-action",
        "name": "Your Action",
        "prompt": "Your custom prompt here...",
        "icon": "🎯",
        "type": "analyze"
      }
    ]
  }
}
```

### Settings

- **Temperature**: 0.3-0.9 (creativity level)
- **Max Tokens**: 300-4000 (response length)
- **Auto-expand**: Auto-open widget on capture
- **Auto-detect forms**: Enable form detection
- **Opacity**: Widget transparency (0.5-1.0)

## 📁 Project Structure

```
ai-screen-assistant/
├── frontend/              # Electron app
│   ├── main.js           # Main process
│   ├── renderer.js       # UI logic
│   ├── preload.js        # IPC bridge
│   ├── index.html        # Widget UI
│   └── styles.css        # Styling
├── backend/              # Python Flask API
│   ├── server.py         # Bedrock integration
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment template
├── config.json           # User configuration
├── start.sh              # Startup script
├── stop.sh               # Stop script
└── docs/                 # Documentation
```

## 🎯 Use Cases

### For Developers
- Code review before commits
- Generate unit tests
- Debug errors quickly
- Optimize performance
- Security audits
- Documentation generation

### For Writers
- Professional email writing
- Content summarization
- Grammar improvements
- Tone adjustments
- Translation

### For Students
- Form filling assistance
- Text summarization
- Concept explanation
- Research help

### For Professionals
- Business communication
- Report writing
- Data analysis
- Quick research

## 🔧 Development

### Run in Development Mode

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python server.py

# Terminal 2 - Frontend
npm start
```

### Build for Production

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

## 📊 Performance

- **Response time**: 2-5 seconds (typical)
- **Token usage**: 300-2000 per request
- **Cost**: ~$0.001-0.01 per request
- **Memory**: ~100-200 MB
- **CPU**: Minimal (< 5%)

## 🔒 Security & Privacy

- ✅ **Local processing** - Widget runs locally
- ✅ **Secure API** - AWS Bedrock encryption
- ✅ **No data storage** - No permanent logs
- ✅ **User control** - You control what's sent
- ⚠️ **Review outputs** - Always verify AI responses
- ⚠️ **Sensitive data** - Don't send confidential info

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AWS Bedrock** - AI infrastructure
- **Anthropic Claude** - Language model
- **Electron** - Desktop framework
- **Flask** - Backend framework

## 📞 Support

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-screen-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-screen-assistant/discussions)

## 🗺️ Roadmap

- [ ] Plugin system
- [ ] IDE integrations (VS Code, JetBrains)
- [ ] Cloud sync
- [ ] Team collaboration
- [ ] Mobile app
- [ ] Voice input
- [ ] Custom AI models
- [ ] Batch processing

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Made with ❤️ by developers, for developers**

[⬆ Back to top](#-ai-screen-assistant)
