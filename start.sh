#!/bin/bash

# Screen Assistant Startup Script

echo "🚀 Starting Screen Assistant..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Define the port
PORT=7227

# Check if port is in use and kill the process
echo "🔍 Checking if port $PORT is available..."
PORT_PID=$(lsof -ti:$PORT)
if [ ! -z "$PORT_PID" ]; then
    echo "⚠️  Port $PORT is in use by process $PORT_PID. Killing it..."
    kill -9 $PORT_PID 2>/dev/null
    sleep 1
    echo "✅ Port $PORT is now free"
else
    echo "✅ Port $PORT is available"
fi

# Check if backend virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "📦 Setting up Python virtual environment..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
else
    # Always ensure dependencies are up to date
    echo "📦 Checking Python dependencies..."
    cd backend
    source venv/bin/activate
    pip install -r requirements.txt -q
    cd ..
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found. AWS credentials may not be configured."
fi

# Start Python backend in background
echo "🐍 Starting Python backend on port $PORT..."
cd backend
source venv/bin/activate
python server.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 3

# Check if backend is running
if curl -s http://127.0.0.1:$PORT/health > /dev/null 2>&1; then
    echo "✅ Backend is running (PID: $BACKEND_PID, Port: $PORT)"
else
    echo "❌ Backend failed to start. Check backend.log for errors."
    exit 1
fi

# Start Electron app
echo "🖥️  Starting Electron app..."
npm start

# Cleanup: Kill backend when Electron exits
echo "🛑 Shutting down backend..."
kill $BACKEND_PID 2>/dev/null
echo "✅ Screen Assistant stopped"
