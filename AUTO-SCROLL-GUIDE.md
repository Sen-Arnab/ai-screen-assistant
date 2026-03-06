# 📜 Auto-Scroll Capture Guide

## NEW FEATURE: Automatic Scrolling Form Capture! 🎉

No more taking multiple screenshots manually! The assistant can now **automatically scroll through an entire page** and capture all questions at once.

---

## How It Works

### The Magic Shortcut: `Cmd+Shift+S`

1. **Open your form** in a browser (Google Forms, surveys, etc.)
2. **Press `Cmd+Shift+S`** (S for Scroll)
3. **Focus the browser window** (you have 2 seconds)
4. **Sit back and watch** as the system:
   - Automatically scrolls down the page
   - Captures screenshots at each position
   - **Detects when it reaches the end** (smart detection!)
   - Stops automatically when no new content appears
   - Analyzes ALL questions together
   - Generates complete answers

### Timeline
```
Press Cmd+Shift+S
    ↓
2 seconds to focus browser
    ↓
Capture section 1 (top)
    ↓
Scroll down + wait 1.2s
    ↓
Capture section 2
    ↓
Scroll down + wait 1.2s
    ↓
Capture section 3
    ↓
... continues until end detected ...
    ↓
Capture final section
    ↓
Detect: "Same content twice = END"
    ↓
Stop scrolling
    ↓
Analyze all sections (30-90s)
    ↓
Display complete answers!
```

**Total time: Varies by form length**
- Short forms (5-10 questions): ~30-45 seconds
- Medium forms (15-25 questions): ~60-75 seconds  
- Long forms (30+ questions): ~90-120 seconds

---

## Step-by-Step Instructions

### 1. Prepare Your Form
```
✅ Open the form in your browser
✅ Scroll to the TOP of the form
✅ Make sure the form is in focus
✅ Maximize the browser window (optional, but helps)
```

### 2. Start Auto-Scroll Capture
```
Press: Cmd+Shift+S

You'll see notification:
"🔄 Scroll capture starting... Focus your browser window!"
```

### 3. Focus the Browser
```
⏱️ You have 2 seconds!

Click on the browser window to make sure it's active.
The system needs to send scroll commands to the active window.
```

### 4. Wait for Capture
```
The system will:
- Capture current view
- Scroll down (Page Down)
- Wait 1.2 seconds
- Repeat until END is detected

Smart End Detection:
✅ Compares each screenshot
✅ Stops when content repeats twice
✅ No wasted captures
✅ Works with any form length

⚠️ DON'T touch your mouse or keyboard during this time!

Time varies by form:
- Short: ~15-30 seconds
- Medium: ~30-60 seconds
- Long: ~60-120 seconds
```

### 5. Analysis Phase
```
Widget shows:
"📜 Analyzing section 1 of X..."
"📜 Analyzing section 2 of X..."
...
"✅ All sections analyzed!"
"Generating answers for all questions..."

This takes 30-90 seconds depending on:
- Number of sections captured
- Form complexity
- Number of questions
```

### 6. Review Results
```
You'll see a complete analysis:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 COMPLETE FORM ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: [First question from top]
✅ Answer: [Answer]

Q2: [Second question]
✅ Answer: [Answer]

[... ALL questions from ALL sections ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 SUMMARY:
- Total questions answered: 15
- Sections analyzed: 8 (auto-detected)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Comparison: Manual vs Auto-Scroll

### Manual Method (Old Way)
```
1. Screenshot page 1 → Wait → Review
2. Scroll manually
3. Screenshot page 2 → Wait → Review
4. Scroll manually
5. Screenshot page 3 → Wait → Review
6. Manually combine answers

⏱️ Time: 5-10 minutes
🤔 Effort: High
📋 Risk: Might miss questions
```

### Auto-Scroll Method (New Way!)
```
1. Press Cmd+Shift+S
2. Wait 45-75 seconds
3. Get complete answers!

⏱️ Time: 1-2 minutes
😎 Effort: Minimal
✅ Risk: Captures everything
```

---

## When to Use Each Method

### Use `Cmd+Shift+X` (Single Screenshot) When:
- ✅ Form is short (fits on one screen)
- ✅ You only need specific questions
- ✅ Form has complex layout (tables, columns)
- ✅ You want quick analysis of visible area

### Use `Cmd+Shift+S` (Auto-Scroll) When:
- ✅ Form is long (multiple pages)
- ✅ You need ALL questions answered
- ✅ Form has standard vertical layout
- ✅ You want comprehensive analysis

### Use `Cmd+Shift+R` (Region) When:
- ✅ You want specific section only
- ✅ Form has multiple columns
- ✅ You need precise area selection

---

## Tips for Best Results

### ✅ DO:
- **Start at the top** of the form before pressing Cmd+Shift+S
- **Maximize browser** for better capture quality
- **Keep hands off** during the 10-second capture process
- **Wait patiently** during the 30-60 second analysis
- **Review answers** before submitting

### ❌ DON'T:
- Don't move mouse during capture
- Don't switch windows during capture
- Don't press any keys during capture
- Don't start in the middle of a form
- Don't use on forms with horizontal scrolling

---

## Adjusting Scroll Settings

The system now **automatically detects the end** of the page, so you don't need to adjust settings! 

However, if you want to customize:

### Maximum Scrolls (Safety Limit)
Edit `frontend/main.js`:

```javascript
// Find this line in captureScrollingPage function:
const maxScrolls = 20; // Maximum scrolls to prevent infinite loop

// Change to:
const maxScrolls = 10;  // For shorter forms (faster)
const maxScrolls = 30;  // For very long forms
const maxScrolls = 50;  // For extremely long documents
```

### Scroll Speed
```javascript
// Find this line:
await new Promise(resolve => setTimeout(resolve, 1200));

// Change to:
await new Promise(resolve => setTimeout(resolve, 800));  // Faster
await new Promise(resolve => setTimeout(resolve, 1500)); // Slower, more reliable
```

**Note**: The system automatically stops when it detects the end, regardless of maxScrolls!

---

## Troubleshooting

### "Nothing happens when I press Cmd+Shift+S"
```
✓ Check if app is running
✓ Try restarting: ./stop.sh && ./start.sh
✓ Check logs: tail -f backend.log
```

### "Scroll doesn't work"
```
✓ Make sure browser window is focused
✓ Wait the full 2 seconds before capture starts
✓ Try clicking on the browser window
✓ Check if Page Down key works manually
```

### "Missing questions"
```
✓ Increase scrollSteps in main.js
✓ Start from the very top of the form
✓ Use manual screenshots for missed sections
✓ Try Cmd+Shift+X for specific areas
```

### "Analysis takes too long"
```
✓ Normal for long forms (30-60 seconds)
✓ Check internet connection
✓ Reduce scrollSteps for faster capture
✓ Check backend.log for errors
```

### "Duplicate questions"
```
✓ This can happen with overlapping captures
✓ Review and remove duplicates manually
✓ Adjust scroll timing in main.js
```

---

## Platform-Specific Notes

### macOS (Default)
```
✅ Uses AppleScript to send Page Down
✅ Works with all browsers
✅ Most reliable method
```

### Windows
```
✅ Uses PowerShell to send keys
⚠️ May need to run as administrator
⚠️ Some browsers may not respond
```

### Linux
```
✅ Uses xdotool for key simulation
⚠️ Requires xdotool installed: sudo apt install xdotool
⚠️ May need X11 permissions
```

---

## Advanced Usage

### Capture Specific Number of Sections
Edit `main.js` and change:
```javascript
const scrollSteps = 5; // Your desired number
```

### Adjust Scroll Speed
Edit `main.js` and change:
```javascript
await new Promise(resolve => setTimeout(resolve, 1500)); // milliseconds
```

### Change Scroll Amount
Currently uses Page Down. To use different scroll:
- macOS: Change key code (121 = Page Down)
- Windows: Change SendKeys parameter
- Linux: Change xdotool key name

---

## Example Workflow

### Real-World Example: Job Application Form

```
1. Open job application form
2. Scroll to top
3. Press Cmd+Shift+S
4. Click browser window
5. Wait ~10 seconds for capture
6. Wait ~45 seconds for analysis
7. Review all answers:
   - Personal info questions
   - Work experience questions
   - Skills assessment questions
   - Essay questions
   - References questions
8. Copy answers
9. Fill form
10. Submit!

Total time: 2 minutes vs 15 minutes manually!
```

---

## Performance

### Capture Phase
- **Time**: ~10 seconds (5 captures × 2 seconds each)
- **Screenshots**: 5 images
- **Size**: ~5-10 MB total

### Analysis Phase
- **Time**: 30-60 seconds
- **API Calls**: 6 (5 for extraction + 1 for answers)
- **Tokens Used**: ~3000-5000 total
- **Cost**: ~$0.05-0.10 per form (AWS Bedrock pricing)

---

## Keyboard Shortcuts Summary

| Shortcut | Purpose | Best For |
|----------|---------|----------|
| `Cmd+Shift+X` | Single screenshot | Short forms, quick capture |
| `Cmd+Shift+S` | **Auto-scroll** | **Long forms, complete capture** |
| `Cmd+Shift+R` | Region select | Specific sections |
| `Cmd+Shift+A` | Text capture | Copy-paste text |

---

## FAQ

**Q: Can I use this on any website?**
A: Yes! Works on any scrollable page, not just forms.

**Q: How many questions can it handle?**
A: Tested up to 50+ questions. Limited by token count (4000 max).

**Q: What if my form is longer than 5 sections?**
A: Increase `scrollSteps` in main.js or use multiple captures.

**Q: Can I pause during capture?**
A: No, but you can cancel by switching windows.

**Q: Does it work with horizontal forms?**
A: No, only vertical scrolling is supported.

**Q: Can I customize scroll behavior?**
A: Yes, edit `captureScrollingPage()` in main.js.

---

## What's Next?

Future enhancements planned:
- [ ] Visual progress indicator
- [ ] Adjustable scroll speed in UI
- [ ] Smart scroll detection (stop at end)
- [ ] Horizontal scrolling support
- [ ] Resume from interruption
- [ ] Export to JSON/CSV

---

## Feedback

This is a new feature! If you encounter issues or have suggestions:
1. Check TROUBLESHOOTING.md
2. Review logs: backend.log
3. Try manual capture as fallback
4. Report issues with details

---

**Enjoy automatic form filling! 🚀**

Press `Cmd+Shift+S` and let the magic happen!
