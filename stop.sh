#!/bin/bash

# Stop Screen Assistant

echo "🛑 Stopping Screen Assistant..."

# Define the port
PORT=7227

# Kill any process using the port
PORT_PID=$(lsof -ti:$PORT 2>/dev/null)
if [ ! -z "$PORT_PID" ]; then
    echo "🔍 Killing process on port $PORT (PID: $PORT_PID)..."
    kill -9 $PORT_PID 2>/dev/null
fi

# Kill Python backend
pkill -f "python.*server.py"

# Kill Electron app
pkill -f "Electron.*screen-assistant"

echo "✅ Screen Assistant stopped"
