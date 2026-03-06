# 🚀 Quick Reference - Form Filling Feature

## One-Line Summary
**Take a screenshot of any form, get instant AI-suggested answers in a well-formatted layout.**

---

## 3-Step Usage

### Quick Capture (Single Page)
1. **Screenshot** → Press `Cmd+Shift+X`
2. **Wait** → Auto-detection (2-3 sec)
3. **Copy** → Use suggested answers

### Auto-Scroll (Multi-Page) ⭐ NEW!
1. **Auto-Scroll** → Press `Cmd+Shift+S`
2. **Wait** → Captures 5 sections (~45-60 sec)
3. **Copy** → Get ALL answers at once!

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+X` | Capture full screenshot |
| `Cmd+Shift+S` | **Auto-scroll capture (NEW!)** |
| `Cmd+Shift+R` | Capture region |
| `Cmd+Shift+A` | Capture text |
| `Cmd+Shift+W` | Toggle widget |
| `Cmd+K` | Focus input |
| `Cmd+C` | Copy result |
| `Escape` | Close widget |

---

## Quick Actions (Text Mode)

After capturing text with `Cmd+Shift+A`:

| Button | Purpose |
|--------|---------|
| 📝 Summarize | Summarize in 2-3 sentences |
| 💡 Explain | Explain in simple terms |
| 🌐 Translate | Translate to Spanish |
| ✨ Improve | Fix grammar and enhance |
| **💼 Professional** | **Rewrite in formal business tone** |
| **✂️ Concise** | **Make brief and direct** |
| **😊 Friendly** | **Add warmth and personality** |
| 💻 Code | Explain code |
| ⚡ Terminal | Extract terminal command |
| ❓ Custom | Ask anything |

| Button | Purpose |
|--------|---------|
| 👁️ Describe Image | Describe what's in the screenshot |
| 📝 Extract Text | Pull out all visible text |
| ❓ Answer Questions | Answer any questions in image |
| **📋 Fill Form** | **Extract & answer form questions** |
| 🖥️ Explain UI | Explain user interface |
| 💬 Custom Question | Ask anything |

---

## Settings to Adjust

| Setting | Recommended | Purpose |
|---------|-------------|---------|
| Auto-Detect Forms | ✅ ON | Automatic form detection |
| Max Tokens | 2000 | Longer, detailed answers |
| Temperature | 0.7 | Balance creativity/consistency |
| Opacity | 0.95 | Widget transparency |

---

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM QUESTIONS & SUGGESTED ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: Question text here
Type: Multiple Choice
Options: A, B, C, D
✅ Suggested Answer: B

Q2: Another question
Type: Text
✅ Suggested Answer: Detailed response...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 NOTES:
- Total questions: 2
- Form type: single page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Supported Form Types

✅ Google Forms
✅ Microsoft Forms  
✅ Typeform
✅ SurveyMonkey
✅ Custom web forms
✅ PDF forms (clear screenshots)

---

## Tips for Best Results

✅ **DO:**
- Capture clear, readable screenshots
- Include all question options
- Take separate shots for each page
- Review before submitting

❌ **DON'T:**
- Use blurry screenshots
- Cut off questions
- Submit without reviewing
- Screenshot sensitive data

---

## Multi-Page Forms

1. Screenshot page 1 → Get answers
2. Scroll to page 2 → Screenshot again
3. Repeat for all pages
4. Combine answers

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Form not detected | Enable in Settings or click "📋 Fill Form" |
| Answers too short | Increase Max Tokens to 2000+ |
| Generic answers | Increase Temperature to 0.8-0.9 |
| Backend error | Run `./stop.sh && ./start.sh` |

---

## File Locations

- **Config**: `config.json`
- **Backend**: `backend/server.py`
- **Frontend**: `frontend/renderer.js`
- **Logs**: `backend.log`, `startup.log`

---

## Commands

```bash
# Start
./start.sh

# Stop
./stop.sh

# Auto-start on login
./install-startup.sh

# Disable auto-start
./uninstall-startup.sh
```

---

## Documentation

- 📖 **Full Guide**: `FORM-FILLING-GUIDE.md`
- 📊 **Examples**: `FORM-EXAMPLE.md`
- 🧪 **Testing**: `TEST-FORM.md`
- 📝 **Changelog**: `CHANGELOG-FORM-FEATURE.md`
- 📘 **Main README**: `README.md`

---

## Quick Test

1. Open https://forms.google.com
2. Find any public form
3. Press `Cmd+Shift+X`
4. Watch the magic! ✨

---

## Support

- Check logs: `tail -f backend.log`
- Restart app: `./stop.sh && ./start.sh`
- Review docs: See files above

---

**That's it! You're ready to auto-fill forms like a pro! 🎉**
