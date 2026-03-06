#!/bin/bash

# Install Screen Assistant as a startup application

echo "🚀 Installing Screen Assistant as startup application..."

# Get the absolute path to the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create LaunchAgents directory if it doesn't exist
mkdir -p ~/Library/LaunchAgents

# Create the plist file
PLIST_FILE=~/Library/LaunchAgents/com.screenassistant.app.plist

cat > "$PLIST_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.screenassistant.app</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>${PROJECT_DIR}/start.sh</string>
    </array>
    
    <key>RunAtLoad</key>
    <true/>
    
    <key>KeepAlive</key>
    <false/>
    
    <key>StandardOutPath</key>
    <string>${PROJECT_DIR}/startup.log</string>
    
    <key>StandardErrorPath</key>
    <string>${PROJECT_DIR}/startup-error.log</string>
    
    <key>WorkingDirectory</key>
    <string>${PROJECT_DIR}</string>
</dict>
</plist>
EOF

echo "✅ Created launch agent: $PLIST_FILE"

# Load the launch agent
launchctl unload "$PLIST_FILE" 2>/dev/null
launchctl load "$PLIST_FILE"

echo "✅ Launch agent loaded"
echo ""
echo "Screen Assistant will now start automatically when you log in!"
echo ""
echo "To manage:"
echo "  - Disable: ./uninstall-startup.sh"
echo "  - Check logs: tail -f startup.log"
echo "  - Check errors: tail -f startup-error.log"
echo ""
echo "To start it now without rebooting, run: ./start.sh"
