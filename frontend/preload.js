const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  analyzeText: (text, question, settings) => ipcRenderer.invoke('analyze-text', text, question, settings),
  analyzeImage: (imageBase64, question, settings) => ipcRenderer.invoke('analyze-image', imageBase64, question, settings),
  onTextCaptured: (callback) => ipcRenderer.on('text-captured', (event, text) => callback(text)),
  onScreenshotCaptured: (callback) => ipcRenderer.on('screenshot-captured', (event, imageBase64) => callback(imageBase64)),
  onStartScrollCapture: (callback) => ipcRenderer.on('start-scroll-capture', () => callback()),
  onScrollingScreenshotsCaptured: (callback) => ipcRenderer.on('scrolling-screenshots-captured', (event, screenshots) => callback(screenshots)),
  updatePosition: (x, y) => ipcRenderer.send('update-position', x, y),
  expandWindow: () => ipcRenderer.send('expand-window'),
  collapseWindow: () => ipcRenderer.send('collapse-window'),
  loadConfig: () => ipcRenderer.invoke('load-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  openConfigFile: () => ipcRenderer.send('open-config-file'),
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command)
});
