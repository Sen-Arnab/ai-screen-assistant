# 🔧 Troubleshooting Guide - Form Filling Feature

## Common Issues & Solutions

---

## 1. Form Not Detected

### Symptoms
- Screenshot taken but no "Form detected!" message
- Widget doesn't auto-expand
- No form analysis appears

### Solutions

#### A. Check Auto-Detect Setting
```bash
1. Open widget
2. Click ⚙️ Settings
3. Verify "Auto-detect forms" is checked ☑️
4. If not, enable it and click "Save Settings"
```

#### B. Use Manual Trigger
```bash
1. Take screenshot (Cmd+Shift+X)
2. Click "📋 Fill Form" button manually
3. Wait for analysis
```

#### C. Improve Screenshot Quality
```bash
✅ DO:
- Capture the entire form section
- Ensure text is readable
- Use good lighting/contrast
- Include all question options

❌ DON'T:
- Take blurry screenshots
- Cut off questions
- Use very small text
- Capture partial questions
```

#### D. Check Backend
```bash
# Verify backend is running
curl http://127.0.0.1:5000/health

# Should return: {"status":"ok"}

# If not, restart
./stop.sh && ./start.sh
```

---

## 2. Backend Not Starting

### Symptoms
- "Backend failed to start" error
- Connection refused errors
- Widget shows "Backend not running"

### Solutions

#### A. Check Python Installation
```bash
# Verify Python 3 is installed
python3 --version

# Should show Python 3.8 or higher
```

#### B. Check Dependencies
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### C. Check AWS Credentials
```bash
# Verify .env file exists
ls -la backend/.env

# Should contain:
# AWS_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
```

#### D. Check Port Availability
```bash
# Check if port 5000 is in use
lsof -i :5000

# If occupied, kill the process
kill -9 <PID>

# Then restart
./start.sh
```

#### E. Check Logs
```bash
# View backend logs
tail -f backend.log

# Look for error messages
grep -i error backend.log
```

---

## 3. Generic or Poor Quality Answers

### Symptoms
- Answers are too short
- Answers are generic (e.g., "John Doe")
- Answers don't match question context

### Solutions

#### A. Increase Max Tokens
```bash
1. Open Settings
2. Change "Max Tokens" from 2000 to 3000-4000
3. Save Settings
4. Try again
```

#### B. Adjust Temperature
```bash
1. Open Settings
2. Increase "Temperature" to 0.8-0.9
3. Save Settings
4. Try again

Note: Higher = more creative, Lower = more consistent
```

#### C. Provide Better Context
```bash
Instead of clicking "Fill Form", use custom question:

"This is a job application form for a software engineer position. 
Please provide professional, detailed answers that highlight 
technical skills and experience."
```

#### D. Take Better Screenshots
```bash
✅ Include:
- Full question text
- All answer options
- Any context or instructions
- Question numbers

❌ Avoid:
- Partial questions
- Cut-off options
- Blurry text
```

---

## 4. Widget Not Appearing

### Symptoms
- Emoji button not visible
- Widget doesn't open
- Screen appears empty

### Solutions

#### A. Check if Hidden
```bash
# Press toggle shortcut
Cmd+Shift+W

# Should show/hide widget
```

#### B. Check Window Position
```bash
# Widget might be off-screen
# Restart app to reset position
./stop.sh && ./start.sh
```

#### C. Check Electron Process
```bash
# Check if Electron is running
ps aux | grep electron

# If not, start app
npm start
```

---

## 5. Slow Performance

### Symptoms
- Analysis takes > 15 seconds
- Widget is laggy
- Backend is slow

### Solutions

#### A. Reduce Max Tokens
```bash
1. Open Settings
2. Reduce "Max Tokens" to 1000-1500
3. Save Settings
```

#### B. Check Internet Connection
```bash
# Test connection to AWS
ping bedrock-runtime.us-east-1.amazonaws.com

# Should show response times
```

#### C. Check System Resources
```bash
# Check CPU usage
top -o cpu

# Check memory
top -o mem

# Close unnecessary apps
```

#### D. Restart Backend
```bash
./stop.sh
sleep 2
./start.sh
```

---

## 6. Keyboard Shortcuts Not Working

### Symptoms
- Cmd+Shift+X doesn't capture
- Shortcuts do nothing
- No response to key presses

### Solutions

#### A. Check Accessibility Permissions
```bash
macOS:
1. System Preferences → Security & Privacy
2. Privacy → Accessibility
3. Ensure Electron is allowed
4. Restart app
```

#### B. Check for Conflicts
```bash
# Other apps might use same shortcuts
# Try alternative shortcuts:
Cmd+Shift+R  (region capture)
Cmd+Shift+A  (text capture)
```

#### C. Restart App
```bash
./stop.sh && ./start.sh
```

---

## 7. Copy to Clipboard Not Working

### Symptoms
- Cmd+C doesn't copy result
- Copy button doesn't work
- Clipboard is empty

### Solutions

#### A. Use Copy Button
```bash
1. Wait for result to appear
2. Click "📋 Copy" button below result
3. Check for "✅ Copied!" notification
```

#### B. Manual Copy
```bash
1. Click and drag to select text in result box
2. Press Cmd+C
3. Paste elsewhere
```

#### C. Check Permissions
```bash
macOS:
System Preferences → Security & Privacy → Privacy
→ Automation → Allow clipboard access
```

---

## 8. Multi-Page Forms

### Symptoms
- Only first page questions detected
- Missing questions from other pages
- Incomplete analysis

### Solutions

#### A. Screenshot Each Page
```bash
1. Screenshot page 1 → Get answers
2. Click "Next" in form
3. Screenshot page 2 → Get answers
4. Repeat for all pages
5. Combine answers manually
```

#### B. Use Region Capture
```bash
# For long forms, capture sections
1. Press Cmd+Shift+R
2. Select specific section
3. Analyze
4. Repeat for next section
```

---

## 9. AWS/Bedrock Errors

### Symptoms
- "AWS error" messages
- "Access denied" errors
- "Model not found" errors

### Solutions

#### A. Check Credentials
```bash
# Verify .env file
cat backend/.env

# Should contain valid AWS credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

#### B. Check IAM Permissions
```bash
Required permissions:
- bedrock:InvokeModel
- bedrock:InvokeModelWithResponseStream

Check in AWS Console:
IAM → Users → Your User → Permissions
```

#### C. Check Region
```bash
# Verify region in .env
AWS_REGION=us-east-1

# Model must be available in this region
```

#### D. Check Model ID
```bash
# In backend/server.py, verify:
MODEL_ID = "us.anthropic.claude-3-5-sonnet-20241022-v2:0"

# Must match available model in your region
```

---

## 10. Installation Issues

### Symptoms
- Dependencies won't install
- npm/pip errors
- Missing packages

### Solutions

#### A. Clean Install
```bash
# Remove old installations
rm -rf node_modules
rm -rf backend/venv

# Reinstall
npm install
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

#### B. Update Package Managers
```bash
# Update npm
npm install -g npm@latest

# Update pip
pip install --upgrade pip
```

#### C. Check Node/Python Versions
```bash
# Check versions
node --version   # Should be 14+
python3 --version # Should be 3.8+

# Update if needed
```

---

## Diagnostic Commands

### Check Everything
```bash
# 1. Check if backend is running
curl http://127.0.0.1:5000/health

# 2. Check processes
ps aux | grep -E "electron|python|server.py"

# 3. Check logs
tail -20 backend.log
tail -20 startup.log

# 4. Check config
cat config.json | grep -A 5 settings

# 5. Check ports
lsof -i :5000
```

### Full Restart
```bash
# Complete restart sequence
./stop.sh
sleep 2
killall -9 electron python 2>/dev/null
sleep 1
./start.sh
```

### Reset to Defaults
```bash
# Backup current config
cp config.json config.json.backup

# Reset settings in config.json
# Change maxTokens to 2000
# Change temperature to 0.7
# Enable autoDetectForms

# Restart
./stop.sh && ./start.sh
```

---

## Log Analysis

### Backend Log
```bash
# View recent errors
grep -i error backend.log | tail -10

# View recent requests
grep -i "analyze" backend.log | tail -10

# Watch live
tail -f backend.log
```

### Startup Log
```bash
# Check startup issues
cat startup.log

# Look for specific errors
grep -i "failed\|error" startup.log
```

---

## Getting Help

### Before Asking for Help

1. **Check logs**:
   ```bash
   cat backend.log
   cat startup.log
   ```

2. **Try restart**:
   ```bash
   ./stop.sh && ./start.sh
   ```

3. **Check documentation**:
   - README.md
   - FORM-FILLING-GUIDE.md
   - This file

4. **Gather information**:
   - Error messages
   - Log contents
   - Steps to reproduce
   - System info (OS, versions)

### Include in Bug Reports

```
System: macOS/Linux/Windows
Node version: [run: node --version]
Python version: [run: python3 --version]
Error message: [exact error text]
Logs: [relevant log excerpts]
Steps to reproduce: [what you did]
Expected: [what should happen]
Actual: [what actually happened]
```

---

## Quick Fixes Checklist

```
□ Restart app (./stop.sh && ./start.sh)
□ Check backend health (curl http://127.0.0.1:5000/health)
□ Verify AWS credentials (cat backend/.env)
□ Check logs (tail backend.log)
□ Enable auto-detect (Settings → Auto-detect forms)
□ Increase max tokens (Settings → Max Tokens → 2000+)
□ Take clear screenshot (readable text, full questions)
□ Check internet connection
□ Verify port 5000 is free (lsof -i :5000)
□ Update dependencies (pip install -r requirements.txt)
```

---

## Still Having Issues?

1. **Check all documentation files**:
   - README.md
   - FORM-FILLING-GUIDE.md
   - QUICK-REFERENCE.md
   - IMPLEMENTATION-SUMMARY.md

2. **Review logs carefully**:
   ```bash
   tail -50 backend.log
   tail -50 startup.log
   ```

3. **Try clean reinstall**:
   ```bash
   rm -rf node_modules backend/venv
   ./start.sh
   ```

4. **Check GitHub issues** (if applicable)

5. **Contact support** with:
   - System information
   - Error logs
   - Steps to reproduce

---

**Most issues can be resolved with a simple restart! 🔄**

```bash
./stop.sh && ./start.sh
```
