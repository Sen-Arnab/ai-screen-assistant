const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, shell, desktopCapturer } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let mainWindow;
let config;

const configPath = path.join(__dirname, '..', 'config.json');

function loadConfig() {
  try {
    const data = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(data);
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

function saveConfig(newConfig) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    config = newConfig;
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 60,
    height: 60,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    x: 20, // Position from left edge
    y: 100, // Position from top
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, 'floating', 1);
  
  // Enable dragging the window by the emoji
  mainWindow.setMovable(true);
}

app.whenReady().then(() => {
  loadConfig();
  createWindow();

  // Global shortcut to capture selected text (Cmd+Shift+A)
  globalShortcut.register('CommandOrControl+Shift+A', () => {
    const selectedText = clipboard.readText();
    if (selectedText && selectedText.trim()) {
      mainWindow.webContents.send('text-captured', selectedText);
      console.log(`Captured ${selectedText.length} characters`);
    } else {
      console.log('No text in clipboard');
    }
  });

  // Global shortcut to capture screenshot (Cmd+Shift+X)
  globalShortcut.register('CommandOrControl+Shift+X', () => {
    captureScreenshot();
  });

  // Global shortcut to capture scrolling page (Cmd+Shift+S)
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    captureScrollingPage();
  });

  // Global shortcut to capture region (Cmd+Shift+R)
  globalShortcut.register('CommandOrControl+Shift+R', () => {
    captureRegion();
  });

  // Toggle widget visibility (Cmd+Shift+W)
  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Handle AI query
ipcMain.handle('analyze-text', async (event, text, question, settings = {}) => {
  try {
    const response = await fetch('http://127.0.0.1:7227/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text, 
        question,
        temperature: settings.temperature || 0.7,
        max_tokens: settings.maxTokens || 300
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    return `Error: ${error.message}. Make sure Python backend is running (python backend/server.py)`;
  }
});

// Handle image analysis
ipcMain.handle('analyze-image', async (event, imageBase64, question, settings = {}) => {
  try {
    const response = await fetch('http://127.0.0.1:7227/analyze-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: imageBase64,
        question,
        temperature: settings.temperature || 0.7,
        max_tokens: settings.maxTokens || 500
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    return `Error: ${error.message}. Make sure Python backend is running`;
  }
});

// Config management
ipcMain.handle('load-config', () => {
  return loadConfig();
});

ipcMain.handle('save-config', (event, newConfig) => {
  return saveConfig(newConfig);
});

ipcMain.on('open-config-file', () => {
  shell.openPath(configPath);
});

// Handle position updates
ipcMain.on('update-position', (event, x, y) => {
  mainWindow.setPosition(x, y);
});

// Handle window resize
ipcMain.on('expand-window', () => {
  mainWindow.setSize(420, 600);
  mainWindow.setResizable(false);
});

ipcMain.on('collapse-window', () => {
  mainWindow.setSize(60, 60);
});

// Execute terminal command
ipcMain.handle('execute-command', async (event, command) => {
  return new Promise((resolve, reject) => {
    // Open a new terminal and execute the command
    let terminalCommand;
    
    if (process.platform === 'darwin') {
      // macOS - use Terminal.app
      terminalCommand = `osascript -e 'tell application "Terminal" to do script "${command.replace(/"/g, '\\"')}"'`;
    } else if (process.platform === 'win32') {
      // Windows
      terminalCommand = `start cmd /k "${command}"`;
    } else {
      // Linux
      terminalCommand = `x-terminal-emulator -e "${command}"`;
    }
    
    exec(terminalCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
      } else {
        resolve('Command executed in new terminal');
      }
    });
  });
});

// Capture screenshot
async function captureScreenshot() {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1920, height: 1080 }
    });
    
    if (sources.length > 0) {
      const screenshot = sources[0].thumbnail.toPNG();
      const base64Image = screenshot.toString('base64');
      mainWindow.webContents.send('screenshot-captured', base64Image);
      console.log('Screenshot captured');
    }
  } catch (error) {
    console.error('Screenshot error:', error);
  }
}

// Capture region (opens selection window)
async function captureRegion() {
  try {
    // Create a transparent overlay window for region selection
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;
    
    const selectionWindow = new BrowserWindow({
      width,
      height,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
    
    selectionWindow.setFullScreen(true);
    
    // Load region selector HTML
    selectionWindow.loadFile(path.join(__dirname, 'region-selector.html'));
    
    // Handle region selection
    ipcMain.once('region-selected', async (event, bounds) => {
      selectionWindow.close();
      
      if (bounds) {
        const sources = await desktopCapturer.getSources({
          types: ['screen'],
          thumbnailSize: { width: 1920, height: 1080 }
        });
        
        if (sources.length > 0) {
          const screenshot = sources[0].thumbnail;
          const { createCanvas, loadImage } = require('canvas');
          
          // Crop the image
          const canvas = createCanvas(bounds.width, bounds.height);
          const ctx = canvas.getContext('2d');
          const img = await loadImage(screenshot.toPNG());
          
          ctx.drawImage(img, bounds.x, bounds.y, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
          
          const croppedImage = canvas.toBuffer('image/png').toString('base64');
          mainWindow.webContents.send('screenshot-captured', croppedImage);
          console.log('Region captured');
        }
      }
    });
  } catch (error) {
    console.error('Region capture error:', error);
  }
}


// Capture scrolling page (auto-scroll and capture multiple screenshots)
async function captureScrollingPage() {
  try {
    console.log('Starting scrolling page capture...');
    
    // Notify main window
    mainWindow.webContents.send('start-scroll-capture');
    
    // Give user time to focus the browser window
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const screenshots = [];
    const maxScrolls = 20; // Maximum scrolls to prevent infinite loop
    let previousHash = null;
    let sameContentCount = 0;
    
    for (let i = 0; i < maxScrolls; i++) {
      console.log(`Capturing section ${i + 1}...`);
      
      // Capture current view
      const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: { width: 1920, height: 1080 }
      });
      
      if (sources.length > 0) {
        const screenshot = sources[0].thumbnail.toPNG();
        const base64Image = screenshot.toString('base64');
        
        // Create a simple hash to detect if we're at the same position
        const crypto = require('crypto');
        const currentHash = crypto.createHash('md5').update(base64Image).digest('hex');
        
        // Check if content is the same as previous (reached end)
        if (previousHash === currentHash) {
          sameContentCount++;
          console.log(`Same content detected (${sameContentCount}/2)`);
          
          // If we see the same content twice, we've reached the end
          if (sameContentCount >= 2) {
            console.log('Reached end of page - stopping capture');
            break;
          }
        } else {
          sameContentCount = 0;
          screenshots.push(base64Image);
          console.log(`Captured screenshot ${screenshots.length}`);
        }
        
        previousHash = currentHash;
      }
      
      // Scroll down (simulate Page Down key)
      const { execSync } = require('child_process');
      try {
        if (process.platform === 'darwin') {
          // macOS - use AppleScript to send Page Down
          execSync(`osascript -e 'tell application "System Events" to key code 121'`);
        } else if (process.platform === 'win32') {
          // Windows - use PowerShell
          execSync('powershell -command "$wshell = New-Object -ComObject wscript.shell; $wshell.SendKeys(\'{PGDN}\')"');
        } else {
          // Linux - use xdotool
          execSync('xdotool key Page_Down');
        }
      } catch (scrollError) {
        console.error('Scroll error:', scrollError);
      }
      
      // Wait for scroll animation
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Send all screenshots to renderer for combined analysis
    mainWindow.webContents.send('scrolling-screenshots-captured', screenshots);
    console.log(`Scrolling capture complete: ${screenshots.length} screenshots captured`);
    
  } catch (error) {
    console.error('Scrolling capture error:', error);
  }
}
