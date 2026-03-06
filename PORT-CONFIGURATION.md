# 🔌 Port Configuration

## Port Change: 5000 → 7227

The Screen Assistant backend now uses **port 7227** instead of port 5000/5001 to avoid common port conflicts.

---

## Why Port 7227?

### Common Port Conflicts
- **Port 5000**: macOS AirPlay Receiver
- **Port 5001**: Various development servers
- **Port 8000**: Python SimpleHTTPServer, Django
- **Port 3000**: React, Node.js dev servers

### Port 7227 Benefits
- ✅ Rarely used by other applications
- ✅ No conflicts with system services
- ✅ Easy to remember (7-2-2-7)
- ✅ Works on all platforms

---

## Automatic Port Management

The start script now **automatically handles port conflicts**:

### What It Does
```bash
1. Checks if port 7227 is in use
2. If occupied, kills the process
3. Frees the port
4. Starts the backend
5. Verifies it's running
```

### Start Script Logic
```bash
# Check if port is in use
PORT_PID=$(lsof -ti:7227)

# Kill the process if found
if [ ! -z "$PORT_PID" ]; then
    kill -9 $PORT_PID
fi

# Start backend on port 7227
python server.py
```

---

## Files Updated

### 1. backend/server.py
```python
if __name__ == '__main__':
    port = 7227  # Using less common port
    app.run(host='127.0.0.1', port=port, debug=True)
```

### 2. frontend/main.js
```javascript
// All API calls now use port 7227
fetch('http://127.0.0.1:7227/analyze', ...)
fetch('http://127.0.0.1:7227/analyze-image', ...)
```

### 3. start.sh
```bash
PORT=7227

# Check and free port if needed
PORT_PID=$(lsof -ti:$PORT)
if [ ! -z "$PORT_PID" ]; then
    kill -9 $PORT_PID
fi

# Verify backend is running
curl -s http://127.0.0.1:$PORT/health
```

### 4. stop.sh
```bash
PORT=7227

# Kill process on port
PORT_PID=$(lsof -ti:$PORT)
if [ ! -z "$PORT_PID" ]; then
    kill -9 $PORT_PID
fi
```

---

## Usage

### Starting the App
```bash
./start.sh
```

**Output:**
```
🚀 Starting Screen Assistant...
🔍 Checking if port 7227 is available...
✅ Port 7227 is available
📦 Checking Python dependencies...
🐍 Starting Python backend on port 7227...
⏳ Waiting for backend to start...
✅ Backend is running (PID: 12345, Port: 7227)
🖥️  Starting Electron app...
```

### Stopping the App
```bash
./stop.sh
```

**Output:**
```
🛑 Stopping Screen Assistant...
🔍 Killing process on port 7227 (PID: 12345)...
✅ Screen Assistant stopped
```

---

## Troubleshooting

### Port Still in Use
If you see "Port 7227 is in use" error:

```bash
# Manually check what's using the port
lsof -i :7227

# Kill the process
kill -9 <PID>

# Or use the stop script
./stop.sh

# Then start again
./start.sh
```

### Backend Not Starting
```bash
# Check the logs
cat backend.log

# Look for port errors
grep -i "port\|address" backend.log

# Try manual start
cd backend
source venv/bin/activate
python server.py
```

### Connection Refused
```bash
# Verify backend is running
curl http://127.0.0.1:7227/health

# Should return: {"status":"ok"}

# If not, check backend.log
tail -20 backend.log
```

---

## Changing the Port

If you need to use a different port:

### 1. Update backend/server.py
```python
if __name__ == '__main__':
    port = YOUR_PORT  # Change this
    app.run(host='127.0.0.1', port=port, debug=True)
```

### 2. Update frontend/main.js
```javascript
// Change all occurrences of 7227 to YOUR_PORT
fetch('http://127.0.0.1:YOUR_PORT/analyze', ...)
fetch('http://127.0.0.1:YOUR_PORT/analyze-image', ...)
```

### 3. Update start.sh
```bash
PORT=YOUR_PORT  # Change this line
```

### 4. Update stop.sh
```bash
PORT=YOUR_PORT  # Change this line
```

---

## Port Verification

### Check if Port is Free
```bash
# macOS/Linux
lsof -i :7227

# If nothing is returned, port is free
```

### Test Backend Connection
```bash
# Start the backend
./start.sh

# In another terminal, test the connection
curl http://127.0.0.1:7227/health

# Should return: {"status":"ok"}
```

### Monitor Port Usage
```bash
# Watch the port in real-time
watch -n 1 'lsof -i :7227'

# Or check periodically
while true; do
  lsof -i :7227
  sleep 5
done
```

---

## Firewall Configuration

### macOS
Port 7227 should work without firewall changes for localhost connections.

If you need to allow external connections:
```bash
# System Preferences → Security & Privacy → Firewall
# Add Python to allowed apps
```

### Linux
```bash
# Allow port 7227 (if needed)
sudo ufw allow 7227

# Check status
sudo ufw status
```

### Windows
```bash
# Allow port in Windows Firewall
# Control Panel → Windows Defender Firewall → Advanced Settings
# Inbound Rules → New Rule → Port → 7227
```

---

## Network Configuration

### Localhost Only (Default)
```python
app.run(host='127.0.0.1', port=7227)
```
- ✅ Secure (only accessible from your machine)
- ✅ No firewall issues
- ✅ Recommended for personal use

### All Interfaces (Not Recommended)
```python
app.run(host='0.0.0.0', port=7227)
```
- ⚠️ Accessible from network
- ⚠️ Security risk
- ⚠️ Only use in trusted networks

---

## Environment Variables

You can also configure the port via environment variable:

### backend/server.py
```python
import os

if __name__ == '__main__':
    port = int(os.getenv('BACKEND_PORT', 7227))
    app.run(host='127.0.0.1', port=port, debug=True)
```

### Usage
```bash
# Set custom port
export BACKEND_PORT=8888
./start.sh

# Or inline
BACKEND_PORT=8888 ./start.sh
```

---

## Summary

### What Changed
- ✅ Port: 5000/5001 → **7227**
- ✅ Auto port cleanup in start.sh
- ✅ Port verification in stop.sh
- ✅ Better error messages

### Benefits
- ✅ No more port conflicts
- ✅ Automatic port management
- ✅ Works out of the box
- ✅ Clear error messages

### Files Modified
- ✅ backend/server.py
- ✅ frontend/main.js
- ✅ start.sh
- ✅ stop.sh

---

## Quick Reference

```bash
# Start (auto-handles port conflicts)
./start.sh

# Stop (frees port 7227)
./stop.sh

# Check if port is free
lsof -i :7227

# Test backend
curl http://127.0.0.1:7227/health

# View logs
tail -f backend.log
```

---

**Port 7227 is now configured and ready to use! 🎉**

No more port conflicts - just run `./start.sh` and it works!
