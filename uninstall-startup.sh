#!/bin/bash

# Uninstall Screen Assistant from startup

echo "🛑 Removing Screen Assistant from startup..."

PLIST_FILE=~/Library/LaunchAgents/com.screenassistant.app.plist

if [ -f "$PLIST_FILE" ]; then
    # Unload the launch agent
    launchctl unload "$PLIST_FILE" 2>/dev/null
    
    # Remove the plist file
    rm "$PLIST_FILE"
    
    echo "✅ Screen Assistant removed from startup"
    echo ""
    echo "You can still run it manually with: ./start.sh"
else
    echo "⚠️  Launch agent not found. Screen Assistant is not installed as startup app."
fi
