# ✍️ Text Rewriting Features

## New Professional Writing Tools

Your Screen Assistant now has powerful text rewriting capabilities! Transform any text into professional, polished content with one click.

---

## Quick Actions for Text

When you capture text (`Cmd+Shift+A`), you'll see these new options:

### 💼 Rewrite Professionally
**Perfect for:**
- Business emails
- Formal reports
- Professional documents
- Client communications
- Job applications

**What it does:**
- Transforms casual language → formal business tone
- Improves clarity and structure
- Uses professional vocabulary
- Fixes grammar and punctuation
- Makes text suitable for business contexts

**Example:**
```
Before:
"hey can u send me that report when u get a chance? thx"

After:
"Good morning,

Could you please send me the report at your earliest convenience? 
Thank you for your assistance.

Best regards"
```

---

### ✂️ Make Concise
**Perfect for:**
- Long emails
- Verbose messages
- Wordy documents
- Executive summaries
- Quick updates

**What it does:**
- Removes unnecessary words
- Eliminates redundancies
- Keeps only essential information
- Makes text brief and impactful
- Preserves core message

**Example:**
```
Before:
"I wanted to reach out to you to let you know that I think we should 
probably consider the possibility of maybe scheduling a meeting at some 
point in the near future to discuss the various issues that have come up."

After:
"Let's schedule a meeting soon to discuss the recent issues."
```

---

### 😊 Make Friendly
**Perfect for:**
- Customer support
- Team communications
- Welcome messages
- Thank you notes
- Casual business emails

**What it does:**
- Adds warmth and personality
- Makes tone conversational
- Maintains professionalism
- Creates approachable feel
- Perfect for customer-facing content

**Example:**
```
Before:
"Your request has been received. Processing will occur within 24 hours."

After:
"Thanks for reaching out! We've got your request and we'll have 
everything sorted out for you within 24 hours. Feel free to reach 
out if you need anything else! 😊"
```

---

### ✨ Improve Writing
**Perfect for:**
- General text improvement
- Grammar fixes
- Better flow
- Enhanced readability

**What it does:**
- Fixes grammar and spelling
- Improves sentence structure
- Enhances readability
- Maintains original tone

---

## How to Use

### Step 1: Capture Text
```bash
1. Select any text on your screen
2. Copy it (Cmd+C)
3. Press Cmd+Shift+A
```

### Step 2: Choose Action
```bash
Click one of the quick action buttons:
- 💼 Rewrite Professionally
- ✂️ Make Concise
- 😊 Make Friendly
- ✨ Improve Writing
```

### Step 3: Get Result
```bash
Wait 2-5 seconds for AI processing
Review the rewritten text
Copy to clipboard (Cmd+C)
Use in your document!
```

---

## Use Cases

### 1. Email Writing
**Scenario:** You wrote a quick, casual email but need to send it to a client.

```bash
1. Write your draft casually
2. Select and copy the text
3. Press Cmd+Shift+A
4. Click "💼 Rewrite Professionally"
5. Get polished, professional version
6. Copy and send!
```

### 2. Shortening Long Messages
**Scenario:** Your message is too long and rambling.

```bash
1. Copy your long text
2. Press Cmd+Shift+A
3. Click "✂️ Make Concise"
4. Get brief, clear version
5. Use the concise version
```

### 3. Customer Support
**Scenario:** Need to respond warmly to a customer.

```bash
1. Write your response
2. Copy the text
3. Press Cmd+Shift+A
4. Click "😊 Make Friendly"
5. Get warm, approachable version
6. Send to customer
```

---

## Comparison Table

| Feature | Professional | Concise | Friendly | Improve |
|---------|-------------|---------|----------|---------|
| **Tone** | Formal | Direct | Warm | Neutral |
| **Length** | Similar | Shorter | Similar | Similar |
| **Use Case** | Business | Brevity | Customer | General |
| **Formality** | High | Medium | Low-Medium | Varies |
| **Best For** | Emails | Summaries | Support | Editing |

---

## Tips for Best Results

### ✅ DO:
- Capture complete sentences or paragraphs
- Use for drafts that need polishing
- Review the output before using
- Combine with other actions (e.g., make professional, then concise)
- Use appropriate action for your context

### ❌ DON'T:
- Expect perfect results every time (AI is a tool, not magic)
- Use without reviewing the output
- Capture incomplete thoughts
- Rely solely on AI for critical communications
- Forget to add personal touches

---

## Advanced Usage

### Combining Actions

You can use multiple actions in sequence:

**Example 1: Professional + Concise**
```bash
1. Capture text
2. Click "💼 Rewrite Professionally"
3. Copy the result
4. Press Cmd+Shift+A again
5. Click "✂️ Make Concise"
6. Get professional AND brief version!
```

**Example 2: Improve + Friendly**
```bash
1. Capture rough draft
2. Click "✨ Improve Writing"
3. Copy the improved version
4. Press Cmd+Shift+A again
5. Click "😊 Make Friendly"
6. Get polished AND warm version!
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Capture text | `Cmd+Shift+A` |
| Focus input | `Cmd+K` |
| Submit | `Cmd+Enter` |
| Copy result | `Cmd+C` |
| Quick action 1 | `Cmd+1` |
| Quick action 2 | `Cmd+2` |
| Quick action 3 | `Cmd+3` |
| Quick action 4 | `Cmd+4` |

---

## Examples by Context

### Business Email
```
Original:
"hey just wanted to check in about the project. how's it going? 
let me know if u need anything"

💼 Professional:
"Dear [Name],

I hope this message finds you well. I wanted to follow up regarding 
the project status. Please let me know if you require any assistance 
or resources to move forward.

Best regards,
[Your Name]"
```

### Meeting Request
```
Original:
"we should probably meet sometime to talk about this stuff"

💼 Professional:
"I would like to schedule a meeting to discuss this matter in detail. 
Please let me know your availability for the coming week."

✂️ Concise:
"Let's schedule a meeting to discuss this. When are you available?"
```

### Customer Response
```
Original:
"your order will be processed and shipped out"

😊 Friendly:
"Great news! We're processing your order right now and it'll be on 
its way to you soon. Thanks so much for your order! 🎉"
```

### Report Summary
```
Original:
"so basically what happened was we had some issues with the system 
and it took a while to fix but we got it working eventually and 
everything is fine now"

💼 Professional:
"We encountered system issues that required immediate attention. 
Our team successfully resolved the problems, and all systems are 
now operating normally."

✂️ Concise:
"System issues were identified and resolved. All systems operational."
```

---

## Settings

### Adjust Output Style

You can customize the prompts in `config.json`:

```json
{
  "id": "professional",
  "name": "Rewrite Professionally",
  "prompt": "Your custom prompt here...",
  "icon": "💼",
  "type": "analyze"
}
```

### Temperature Setting

For more creative rewrites:
- Settings → Temperature → 0.8-0.9

For more consistent rewrites:
- Settings → Temperature → 0.5-0.7

---

## Troubleshooting

### "Output is too similar to input"
**Solution:**
- Increase temperature in settings
- Try a different action
- Provide more context in custom question

### "Output is too different"
**Solution:**
- Decrease temperature
- Use "Improve Writing" instead
- Review and edit manually

### "Takes too long"
**Solution:**
- Check internet connection
- Verify backend is running
- Try shorter text

---

## Privacy Note

⚠️ **Important:**
- Text is sent to AWS Bedrock (Claude) for processing
- No permanent storage
- Review output before using
- Don't send sensitive/confidential information

---

## Summary

✅ **4 new text rewriting actions**
✅ **Professional, Concise, Friendly, Improve**
✅ **One-click transformation**
✅ **Perfect for business communication**
✅ **Saves time and improves quality**

---

**Start using it now!**

1. Copy any text
2. Press `Cmd+Shift+A`
3. Click `💼 Rewrite Professionally`
4. Get polished results!

🎉 **Transform your writing in seconds!**
