# 📋 Google Form Auto-Fill Guide

## How to Use the Form Filling Feature

Your assistant can now automatically detect and suggest answers for Google Forms, surveys, and questionnaires!

### Quick Start

1. **Open the form** you want to fill out
2. **Take a screenshot** using `Cmd+Shift+X` (or `Ctrl+Shift+X` on Windows/Linux)
3. **Wait for auto-detection** - the assistant will automatically:
   - Detect if it's a form
   - Extract all visible questions
   - Suggest well-formatted answers

### For Multi-Page Forms

If your form has multiple pages or sections:

1. **Take a screenshot of the first page** (`Cmd+Shift+X`)
2. **Review the suggested answers**
3. **Scroll to the next section** of the form
4. **Take another screenshot** of the next page
5. **Repeat** for all pages

The assistant will analyze each screenshot independently and provide answers for all visible questions.

### Manual Form Analysis

If auto-detection is disabled or you want more control:

1. Take a screenshot (`Cmd+Shift+X`)
2. Click the **"📋 Fill Form"** quick action button
3. Or type a custom question like:
   - "Extract all questions and suggest answers"
   - "Help me fill out this form"
   - "What are the questions in this form?"

### Tips for Best Results

✅ **DO:**
- Capture the entire form section clearly
- Make sure text is readable in the screenshot
- Include all question options (for multiple choice)
- Take separate screenshots for each page/section
- Review suggested answers before submitting

❌ **DON'T:**
- Take blurry or low-resolution screenshots
- Cut off questions or answer options
- Expect the AI to fill forms automatically (it only suggests answers)
- Submit without reviewing - always check the suggestions!

### Settings

You can control form detection in Settings:

- **Auto-Detect Forms**: Toggle automatic form detection on/off
- **Max Tokens**: Increase for longer forms (default: 2000)
- **Temperature**: Lower for more consistent answers (0.3-0.5 recommended)

### Example Output Format

When a form is detected, you'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM QUESTIONS & SUGGESTED ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: What is your name?
Type: Text
✅ Suggested Answer: John Smith

Q2: What is your favorite color?
Type: Multiple Choice
Options: Red, Blue, Green, Yellow
✅ Suggested Answer: Blue

Q3: Tell us about yourself
Type: Long Text
✅ Suggested Answer: I am a software developer with 5 years of experience...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 NOTES:
- Total questions found: 3
- Form appears to be: single page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Keyboard Shortcuts

- `Cmd+Shift+X` - Take full screenshot
- `Cmd+Shift+R` - Take region screenshot (select area)
- `Cmd+Shift+A` - Capture selected text
- `Cmd+K` - Focus question input
- `Cmd+C` - Copy result to clipboard

### Privacy & Security

⚠️ **Important Notes:**
- Screenshots are sent to AWS Bedrock (Claude) for analysis
- No data is stored permanently
- Review all suggested answers before submitting
- Don't screenshot sensitive personal information
- The AI provides suggestions only - you're responsible for final answers

### Troubleshooting

**Form not detected?**
- Make sure "Auto-Detect Forms" is enabled in Settings
- Try clicking the "📋 Fill Form" button manually
- Check that the screenshot is clear and readable

**Answers seem generic?**
- Increase the Temperature setting (0.7-0.9)
- Provide more context in a custom question
- Review and personalize the suggested answers

**Missing questions?**
- The form might be multi-page - scroll and take more screenshots
- Zoom out to capture more questions in one screenshot
- Use region capture (`Cmd+Shift+R`) for specific sections

### Support

For issues or feature requests, check the main README.md or open an issue on GitHub.

---

**Happy form filling! 🎉**
