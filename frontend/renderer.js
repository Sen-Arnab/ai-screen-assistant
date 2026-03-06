let capturedText = '';
let capturedImage = '';
let config = null;
let editingCategoryIndex = -1;
let editingCommandIndex = -1;
let isEditMode = false;
let conversationHistory = [];

const emojiButton = document.getElementById('emoji-button');
const widget = document.getElementById('widget');
const mainView = document.getElementById('main-view');
const settingsView = document.getElementById('settings-view');
const commandsView = document.getElementById('commands-view');
const historyView = document.getElementById('history-view');
const categoryModal = document.getElementById('category-modal');
const commandModal = document.getElementById('command-modal');

// Click to expand
emojiButton.addEventListener('click', (e) => {
  // Don't expand if it's draggable
  if (!emojiButton.classList.contains('draggable')) {
    expandWidget();
  }
});

// Hold Cmd/Ctrl to drag
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && !widget.classList.contains('hidden')) {
    return; // Don't enable drag when widget is open
  }
  if (e.metaKey || e.ctrlKey) {
    emojiButton.classList.add('draggable');
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Meta' || e.key === 'Control') {
    emojiButton.classList.remove('draggable');
  }
});

// Also remove draggable on blur (when window loses focus)
window.addEventListener('blur', () => {
  emojiButton.classList.remove('draggable');
});

function expandWidget() {
  emojiButton.classList.add('hidden');
  widget.classList.remove('hidden');
  window.electronAPI.expandWindow();
  if (capturedText) {
    showNotification(`${capturedText.length} characters ready`);
  }
}

// Load config on startup
window.electronAPI.loadConfig().then(loadedConfig => {
  config = loadedConfig;
  if (config) {
    applyConfig();
    renderQuickActions();
    renderSavedCommands();
    applyOpacity(config.assistant.settings.opacity || 0.95);
  }
});

function applyConfig() {
  const emoji = config.assistant.emoji || '🤖';
  emojiButton.textContent = emoji;
  document.querySelector('.title').textContent = `${emoji} ${config.assistant.name}`;
}

function renderQuickActions() {
  const container = document.getElementById('quick-actions');
  container.innerHTML = '';
  
  // Show different actions based on what's captured
  let actions = config.assistant.actions;
  
  if (capturedImage) {
    // Screenshot-specific actions
    actions = [
      {
        id: "describe-screenshot",
        name: "Describe Image",
        prompt: "Describe what you see in this image in detail",
        icon: "👁️",
        type: "analyze"
      },
      {
        id: "extract-text",
        name: "Extract Text",
        prompt: "Extract and list all text visible in this image",
        icon: "📝",
        type: "analyze"
      },
      {
        id: "answer-questions",
        name: "Answer Questions",
        prompt: "If there are any questions visible in this image, provide the answers to them",
        icon: "❓",
        type: "analyze"
      },
      {
        id: "google-form",
        name: "Fill Form",
        prompt: `Analyze this form/questionnaire and extract ALL questions with suggested answers.

Format your response as:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: [Question text]
Type: [Multiple Choice/Text/Checkbox/Dropdown/Rating/etc.]
${''/* Include options if multiple choice */}
✅ Answer: [Detailed, natural-sounding answer]

Q2: [Next question]
Type: [Type]
✅ Answer: [Answer]

[Continue for ALL visible questions...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 NOTES:
- Total questions found: [number]
- Form appears to be: [single page/multi-page]
- Special instructions: [any notes]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provide thoughtful, specific answers that sound human and natural.`,
        icon: "📋",
        type: "analyze"
      },
      {
        id: "explain-ui",
        name: "Explain UI",
        prompt: "Explain what this user interface does and how to use it",
        icon: "🖥️",
        type: "analyze"
      },
      {
        id: "custom-screenshot",
        name: "Custom Question",
        prompt: "",
        icon: "💬",
        type: "analyze"
      }
    ];
  }
  
  actions.forEach(action => {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.innerHTML = `${action.icon} ${action.name}`;
    btn.onclick = () => handleQuickAction(action);
    container.appendChild(btn);
  });
}

function renderSavedCommands() {
  const container = document.getElementById('saved-commands-list');
  container.innerHTML = '';
  
  if (!config.assistant.savedCommands || config.assistant.savedCommands.length === 0) {
    container.innerHTML = '<p style="color: rgba(255,255,255,0.6); font-size: 12px;">No saved commands. Click "Edit Mode" then "Add Category" to get started.</p>';
    return;
  }
  
  config.assistant.savedCommands.forEach((category, catIndex) => {
    // Create category section
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'command-category';
    
    // Category header
    const header = document.createElement('div');
    header.className = 'category-header';
    
    if (isEditMode) {
      header.innerHTML = `
        <span class="category-name">${category.category}</span>
        <div class="category-actions">
          <button class="category-action-btn" onclick="event.stopPropagation(); addCommandToCategory(${catIndex})">+ Add</button>
          <button class="category-action-btn" onclick="event.stopPropagation(); deleteCategory(${catIndex})">Delete</button>
          <span class="category-toggle">▶</span>
        </div>
      `;
    } else {
      header.innerHTML = `
        <span class="category-name">${category.category}</span>
        <span class="category-toggle">▶</span>
      `;
    }
    
    // Category content - start collapsed
    const content = document.createElement('div');
    content.className = 'category-content collapsed';
    
    category.commands.forEach((cmd, cmdIndex) => {
      const btn = document.createElement('div');
      btn.className = 'command-btn';
      
      if (isEditMode) {
        btn.innerHTML = `
          <div class="command-icon">${cmd.icon}</div>
          <div class="command-info">
            <div class="command-name">${cmd.name}</div>
            <div class="command-text">${cmd.command}</div>
          </div>
          <div class="command-action-btns">
            <button class="cmd-action-btn" onclick="event.stopPropagation(); editCommand(${catIndex}, ${cmdIndex})">Edit</button>
            <button class="cmd-action-btn delete" onclick="event.stopPropagation(); deleteCommand(${catIndex}, ${cmdIndex})">×</button>
          </div>
        `;
      } else {
        btn.innerHTML = `
          <div class="command-icon">${cmd.icon}</div>
          <div class="command-info">
            <div class="command-name">${cmd.name}</div>
            <div class="command-text">${cmd.command}</div>
          </div>
        `;
        btn.style.cursor = 'pointer';
        btn.onclick = () => executeSavedCommand(cmd);
      }
      
      content.appendChild(btn);
    });
    
    // Toggle collapse/expand - entire header is clickable
    header.onclick = (e) => {
      // Don't toggle if clicking on action buttons in edit mode
      if (e.target.classList.contains('category-action-btn')) {
        return;
      }
      content.classList.toggle('collapsed');
      const toggle = header.querySelector('.category-toggle');
      toggle.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
    };
    
    categoryDiv.appendChild(header);
    categoryDiv.appendChild(content);
    container.appendChild(categoryDiv);
  });
}

async function executeSavedCommand(cmd) {
  const confirmed = confirm(`Execute this command in a new terminal?\n\n${cmd.command}`);
  
  if (confirmed) {
    try {
      const result = await window.electronAPI.executeCommand(cmd.command);
      showNotification(`✅ ${result}`);
    } catch (error) {
      showNotification(`❌ Error: ${error}`);
    }
  }
}

async function handleQuickAction(action) {
  if (!capturedText.trim() && !capturedImage) {
    showNotification('No content captured. Press Cmd+Shift+A (text) or Cmd+Shift+X (screenshot)');
    return;
  }
  
  const resultDiv = document.getElementById('result');
  
  if (action.id === 'custom' || action.id === 'custom-screenshot') {
    document.getElementById('question').focus();
    return;
  }
  
  if (action.type === 'command') {
    // Handle command execution (only for text)
    if (!capturedText.trim()) {
      showNotification('Command extraction requires text, not screenshot');
      return;
    }
    
    resultDiv.textContent = 'Extracting command...';
    resultDiv.classList.add('visible');
    
    try {
      const response = await window.electronAPI.analyzeText(
        capturedText, 
        'Extract only the command that should be run in terminal. Return ONLY the command, nothing else. If there are multiple commands, return them separated by && or ;',
        config.assistant.settings
      );
      
      const command = response.trim();
      
      // Show confirmation
      const confirmed = confirm(`Execute this command in a new terminal?\n\n${command}`);
      
      if (confirmed) {
        resultDiv.textContent = 'Opening terminal...';
        const result = await window.electronAPI.executeCommand(command);
        resultDiv.textContent = `✅ ${result}`;
      } else {
        resultDiv.textContent = 'Command execution cancelled';
      }
    } catch (error) {
      resultDiv.textContent = 'Error: ' + error.message;
    }
    return;
  }
  
  // Regular analyze action
  resultDiv.textContent = 'Analyzing...';
  resultDiv.classList.add('visible');
  
  try {
    let response;
    if (capturedImage) {
      response = await window.electronAPI.analyzeImage(
        capturedImage,
        action.prompt,
        config.assistant.settings
      );
    } else {
      response = await window.electronAPI.analyzeText(
        capturedText, 
        action.prompt,
        config.assistant.settings
      );
    }
    resultDiv.textContent = response;
  } catch (error) {
    resultDiv.textContent = 'Error: ' + error.message;
  }
}

// Toggle between emoji and widget
emojiButton.addEventListener('click', () => {
  emojiButton.classList.add('hidden');
  widget.classList.remove('hidden');
  window.electronAPI.expandWindow();
  if (capturedText) {
    showNotification(`${capturedText.length} characters ready`);
  }
});

// Close widget back to emoji
document.getElementById('close').addEventListener('click', () => {
  widget.classList.add('hidden');
  emojiButton.classList.remove('hidden');
  window.electronAPI.collapseWindow();
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('visible');
  resultDiv.textContent = ''; // Clear result content
  document.getElementById('question').value = '';
  mainView.classList.remove('hidden');
  settingsView.classList.add('hidden');
  commandsView.classList.add('hidden');
  historyView.classList.add('hidden');
});

// Commands button
document.getElementById('commands-btn').addEventListener('click', () => {
  mainView.classList.add('hidden');
  settingsView.classList.add('hidden');
  commandsView.classList.remove('hidden');
  isEditMode = false;
  updateEditModeUI();
});

// Toggle edit mode
document.getElementById('toggle-edit-mode').addEventListener('click', () => {
  isEditMode = !isEditMode;
  updateEditModeUI();
  renderSavedCommands();
});

function updateEditModeUI() {
  const toggleBtn = document.getElementById('toggle-edit-mode');
  const addCategoryBtn = document.getElementById('add-category-btn');
  
  if (isEditMode) {
    toggleBtn.textContent = '✅ Done Editing';
    toggleBtn.classList.remove('secondary-btn');
    toggleBtn.classList.add('primary-btn');
    addCategoryBtn.style.display = 'block';
  } else {
    toggleBtn.textContent = '✏️ Edit Mode';
    toggleBtn.classList.remove('primary-btn');
    toggleBtn.classList.add('secondary-btn');
    addCategoryBtn.style.display = 'none';
  }
}

// Back from commands
document.getElementById('back-from-commands').addEventListener('click', () => {
  commandsView.classList.add('hidden');
  mainView.classList.remove('hidden');
});

// Settings button
document.getElementById('settings-btn').addEventListener('click', () => {
  mainView.classList.add('hidden');
  commandsView.classList.add('hidden');
  settingsView.classList.remove('hidden');
  loadSettingsForm();
});

// Back from settings
document.getElementById('back-from-settings').addEventListener('click', () => {
  settingsView.classList.add('hidden');
  mainView.classList.remove('hidden');
});

function loadSettingsForm() {
  document.getElementById('assistant-name').value = config.assistant.name;
  document.getElementById('assistant-emoji').value = config.assistant.emoji;
  document.getElementById('temperature').value = config.assistant.settings.temperature;
  document.getElementById('max-tokens').value = config.assistant.settings.maxTokens;
  document.getElementById('auto-expand').checked = config.assistant.settings.autoExpand;
  document.getElementById('auto-detect-forms').checked = config.assistant.settings.autoDetectForms !== false;
  document.getElementById('default-language').value = config.assistant.settings.defaultLanguage || 'auto';
  
  const opacity = config.assistant.settings.opacity || 0.95;
  document.getElementById('opacity').value = opacity;
  document.getElementById('opacity-value').textContent = opacity;
  
  // Update opacity display on slider change
  document.getElementById('opacity').addEventListener('input', (e) => {
    document.getElementById('opacity-value').textContent = e.target.value;
    applyOpacity(parseFloat(e.target.value));
  });
}

// Save settings
document.getElementById('save-settings').addEventListener('click', async () => {
  config.assistant.name = document.getElementById('assistant-name').value;
  config.assistant.emoji = document.getElementById('assistant-emoji').value;
  config.assistant.settings.temperature = parseFloat(document.getElementById('temperature').value);
  config.assistant.settings.maxTokens = parseInt(document.getElementById('max-tokens').value);
  config.assistant.settings.autoExpand = document.getElementById('auto-expand').checked;
  config.assistant.settings.autoDetectForms = document.getElementById('auto-detect-forms').checked;
  config.assistant.settings.opacity = parseFloat(document.getElementById('opacity').value);
  config.assistant.settings.defaultLanguage = document.getElementById('default-language').value;
  
  const saved = await window.electronAPI.saveConfig(config);
  if (saved) {
    applyConfig();
    applyOpacity(config.assistant.settings.opacity);
    mainView.classList.remove('hidden');
    settingsView.classList.add('hidden');
    showNotification('Settings saved!');
  } else {
    showNotification('Error saving settings');
  }
});

// Edit actions button
document.getElementById('edit-actions').addEventListener('click', () => {
  window.electronAPI.openConfigFile();
});

// Listen for captured text
window.electronAPI.onTextCaptured((text) => {
  capturedText = text;
  capturedImage = ''; // Clear image when text is captured
  
  console.log('Text captured:', text.substring(0, 50) + '...');
  
  // Re-render quick actions to show text-specific options
  renderQuickActions();
  
  if (config?.assistant.settings.autoExpand) {
    expandWidget();
  } else {
    // Show visual feedback on emoji
    emojiButton.style.transform = 'scale(1.3)';
    setTimeout(() => {
      emojiButton.style.transform = 'scale(1)';
    }, 300);
  }
  
  showNotification(`✅ Captured ${text.length} characters`);
});

// Listen for captured screenshot
window.electronAPI.onScreenshotCaptured((imageBase64) => {
  capturedImage = imageBase64;
  capturedText = ''; // Clear text when image is captured
  
  console.log('Screenshot captured');
  
  // Check if it's a Google Form and auto-suggest
  detectAndSuggestGoogleForm(imageBase64);
  
  // Re-render quick actions to show screenshot-specific options
  renderQuickActions();
  
  if (config?.assistant.settings.autoExpand) {
    expandWidget();
  } else {
    emojiButton.style.transform = 'scale(1.3)';
    setTimeout(() => {
      emojiButton.style.transform = 'scale(1)';
    }, 300);
  }
  
  showNotification(`📸 Screenshot captured!`);
});

// Listen for scroll capture start
window.electronAPI.onStartScrollCapture(() => {
  showNotification('🔄 Auto-scrolling started! Focus your browser window now!');
  expandWidget();
  
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = '🔄 Auto-scrolling through the page...\n\n📸 Capturing screenshots until end is reached\n⏱️ This may take 30-90 seconds\n\n💡 Don\'t touch your mouse or keyboard!';
  resultDiv.classList.add('visible', 'analyzing-form');
});

// Listen for multiple scrolling screenshots
window.electronAPI.onScrollingScreenshotsCaptured(async (screenshots) => {
  console.log(`Received ${screenshots.length} screenshots from scrolling capture`);
  
  expandWidget();
  
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `📜 Analyzing ${screenshots.length} sections of the page...\n\nThis may take 30-60 seconds...`;
  resultDiv.classList.add('visible', 'analyzing-form');
  
  try {
    // Analyze each screenshot and combine results
    const allQuestions = [];
    
    for (let i = 0; i < screenshots.length; i++) {
      resultDiv.textContent = `📜 Analyzing section ${i + 1} of ${screenshots.length}...\n\nPlease wait...`;
      
      const sectionPrompt = `Extract ALL questions from this section of a form. 
      
Format each question as:
Q: [question text]
Type: [question type]
Options: [if applicable]

Only extract questions, don't provide answers yet. Be thorough.`;
      
      const questions = await window.electronAPI.analyzeImage(
        screenshots[i],
        sectionPrompt,
        { temperature: 0.3, maxTokens: 1000 }
      );
      
      allQuestions.push(`\n━━━ SECTION ${i + 1} ━━━\n${questions}`);
    }
    
    // Now generate answers for all questions
    resultDiv.textContent = `✅ All sections analyzed!\n\nGenerating answers for all questions...`;
    
    const combinedQuestions = allQuestions.join('\n\n');
    
    const answerPrompt = `Here are all the questions from a multi-page form:

${combinedQuestions}

Please provide well-thought-out answers for EVERY question. Format as:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 COMPLETE FORM ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: [question]
Type: [type]
✅ Answer: [detailed answer]

Q2: [question]
Type: [type]
✅ Answer: [detailed answer]

[Continue for ALL questions...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 SUMMARY:
- Total questions answered: [number]
- Sections analyzed: ${screenshots.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    const finalAnswers = await window.electronAPI.analyzeImage(
      screenshots[0], // Use first screenshot as context
      answerPrompt,
      { ...config.assistant.settings, maxTokens: 4000 }
    );
    
    resultDiv.classList.remove('analyzing-form');
    resultDiv.classList.add('form-detected');
    resultDiv.textContent = finalAnswers;
    
    saveToHistory(`Auto-Scroll Form (${screenshots.length} sections)`, finalAnswers, 'image');
    showNotification(`✅ Complete! Analyzed ${screenshots.length} sections.`);
    
  } catch (error) {
    resultDiv.classList.remove('analyzing-form');
    resultDiv.textContent = `Error analyzing scrolling capture: ${error.message}`;
    console.error('Scrolling analysis error:', error);
  }
});

// Handle custom ask button
document.getElementById('ask').addEventListener('click', async () => {
  const question = document.getElementById('question').value;
  const resultDiv = document.getElementById('result');
  
  if (!question.trim()) {
    showNotification('Please enter a question');
    return;
  }

  resultDiv.textContent = 'Analyzing...';
  resultDiv.classList.add('visible');

  try {
    let response;
    let type = 'general';
    
    // Add language instruction if not auto
    const lang = config.assistant.settings.defaultLanguage || 'auto';
    const langInstruction = lang !== 'auto' ? `\n\nPlease respond in ${getLanguageName(lang)}.` : '';
    
    if (capturedImage) {
      type = 'image';
      response = await window.electronAPI.analyzeImage(
        capturedImage,
        question + langInstruction,
        config.assistant.settings
      );
    } else if (capturedText.trim()) {
      type = 'text';
      response = await window.electronAPI.analyzeText(
        capturedText, 
        question + langInstruction,
        config.assistant.settings
      );
    } else {
      response = await window.electronAPI.analyzeText(
        question + langInstruction,
        'Answer this question concisely',
        config.assistant.settings
      );
    }
    
    resultDiv.textContent = response;
    saveToHistory(question, response, type);
  } catch (error) {
    resultDiv.textContent = 'Error: ' + error.message;
  }
});

function getLanguageName(code) {
  const languages = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
    'zh': 'Chinese', 'ja': 'Japanese', 'ko': 'Korean', 'pt': 'Portuguese',
    'ru': 'Russian', 'ar': 'Arabic', 'hi': 'Hindi'
  };
  return languages[code] || 'English';
}

// Enter key to ask
document.getElementById('question').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('ask').click();
  }
});

function showNotification(message) {
  // Create a toast notification instead of using result box
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Fade in
  setTimeout(() => toast.classList.add('visible'), 10);
  
  // Fade out and remove
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Category management
document.getElementById('add-category-btn').addEventListener('click', () => {
  editingCategoryIndex = -1;
  document.getElementById('category-modal-title').textContent = 'Add Category';
  document.getElementById('category-name-input').value = '';
  categoryModal.classList.remove('hidden');
});

document.getElementById('save-category-btn').addEventListener('click', async () => {
  const name = document.getElementById('category-name-input').value.trim();
  
  if (!name) {
    showNotification('Please enter a category name');
    return;
  }
  
  if (editingCategoryIndex === -1) {
    // Add new category
    config.assistant.savedCommands.push({
      category: name,
      commands: []
    });
  } else {
    // Edit existing
    config.assistant.savedCommands[editingCategoryIndex].category = name;
  }
  
  await window.electronAPI.saveConfig(config);
  renderSavedCommands();
  categoryModal.classList.add('hidden');
  showNotification('Category saved!');
});

document.getElementById('cancel-category-btn').addEventListener('click', () => {
  categoryModal.classList.add('hidden');
});

function deleteCategory(index) {
  if (confirm(`Delete category "${config.assistant.savedCommands[index].category}" and all its commands?`)) {
    config.assistant.savedCommands.splice(index, 1);
    window.electronAPI.saveConfig(config);
    renderSavedCommands();
    showNotification('Category deleted');
  }
}

// Command management
function addCommandToCategory(catIndex) {
  editingCategoryIndex = catIndex;
  editingCommandIndex = -1;
  document.getElementById('command-modal-title').textContent = 'Add Command';
  document.getElementById('command-name-input').value = '';
  document.getElementById('command-text-input').value = '';
  document.getElementById('command-icon-input').value = '⚡';
  commandModal.classList.remove('hidden');
}

function editCommand(catIndex, cmdIndex) {
  editingCategoryIndex = catIndex;
  editingCommandIndex = cmdIndex;
  const cmd = config.assistant.savedCommands[catIndex].commands[cmdIndex];
  
  document.getElementById('command-modal-title').textContent = 'Edit Command';
  document.getElementById('command-name-input').value = cmd.name;
  document.getElementById('command-text-input').value = cmd.command;
  document.getElementById('command-icon-input').value = cmd.icon;
  commandModal.classList.remove('hidden');
}

function deleteCommand(catIndex, cmdIndex) {
  const cmd = config.assistant.savedCommands[catIndex].commands[cmdIndex];
  if (confirm(`Delete command "${cmd.name}"?`)) {
    config.assistant.savedCommands[catIndex].commands.splice(cmdIndex, 1);
    window.electronAPI.saveConfig(config);
    renderSavedCommands();
    showNotification('Command deleted');
  }
}

document.getElementById('save-command-btn').addEventListener('click', async () => {
  const name = document.getElementById('command-name-input').value.trim();
  const command = document.getElementById('command-text-input').value.trim();
  const icon = document.getElementById('command-icon-input').value.trim() || '⚡';
  
  if (!name || !command) {
    showNotification('Please fill in all fields');
    return;
  }
  
  const cmdObj = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name,
    command: command,
    icon: icon
  };
  
  if (editingCommandIndex === -1) {
    // Add new command
    config.assistant.savedCommands[editingCategoryIndex].commands.push(cmdObj);
  } else {
    // Edit existing
    config.assistant.savedCommands[editingCategoryIndex].commands[editingCommandIndex] = cmdObj;
  }
  
  await window.electronAPI.saveConfig(config);
  renderSavedCommands();
  commandModal.classList.add('hidden');
  showNotification('Command saved!');
});

document.getElementById('cancel-command-btn').addEventListener('click', () => {
  commandModal.classList.add('hidden');
});

// Make functions global for onclick handlers
window.addCommandToCategory = addCommandToCategory;
window.editCommand = editCommand;
window.deleteCommand = deleteCommand;
window.deleteCategory = deleteCategory;


// Apply opacity to widget
function applyOpacity(opacity) {
  const widget = document.getElementById('widget');
  widget.style.opacity = opacity;
}

// Copy result to clipboard
document.getElementById('copy-result').addEventListener('click', () => {
  const resultText = document.getElementById('result').textContent;
  navigator.clipboard.writeText(resultText).then(() => {
    showNotification('✅ Copied to clipboard!');
  }).catch(err => {
    showNotification('❌ Failed to copy');
  });
});

// Show copy button when result is visible
const resultDiv = document.getElementById('result');
const resultActions = document.getElementById('result-actions');
const observer = new MutationObserver(() => {
  if (resultDiv.classList.contains('visible') && resultDiv.textContent.trim()) {
    resultActions.classList.remove('hidden');
  } else {
    resultActions.classList.add('hidden');
  }
});
observer.observe(resultDiv, { attributes: true, attributeFilter: ['class'] });

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Escape to close widget
  if (e.key === 'Escape') {
    if (!categoryModal.classList.contains('hidden')) {
      categoryModal.classList.add('hidden');
    } else if (!commandModal.classList.contains('hidden')) {
      commandModal.classList.add('hidden');
    } else if (!widget.classList.contains('hidden')) {
      document.getElementById('close').click();
    }
  }
  
  // Ctrl/Cmd + K to focus question input
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (!widget.classList.contains('hidden')) {
      document.getElementById('question').focus();
    }
  }
  
  // Ctrl/Cmd + Enter to submit question
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (!widget.classList.contains('hidden') && document.activeElement.id === 'question') {
      document.getElementById('ask').click();
    }
  }
  
  // Ctrl/Cmd + 1-5 for quick actions
  if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
    e.preventDefault();
    const actionButtons = document.querySelectorAll('.action-btn');
    const index = parseInt(e.key) - 1;
    if (actionButtons[index]) {
      actionButtons[index].click();
    }
  }
  
  // Ctrl/Cmd + C to copy result
  if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !resultActions.classList.contains('hidden')) {
    if (document.activeElement.id !== 'question') {
      e.preventDefault();
      document.getElementById('copy-result').click();
    }
  }
});


// History management
function saveToHistory(question, answer, type) {
  const historyItem = {
    timestamp: new Date().toISOString(),
    question,
    answer,
    type // 'text', 'image', or 'general'
  };
  
  conversationHistory.unshift(historyItem);
  
  // Keep only last 50 items
  if (conversationHistory.length > 50) {
    conversationHistory = conversationHistory.slice(0, 50);
  }
  
  // Save to localStorage
  localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
}

function loadHistory() {
  const saved = localStorage.getItem('conversationHistory');
  if (saved) {
    conversationHistory = JSON.parse(saved);
  }
}

function renderHistory() {
  const container = document.getElementById('history-list');
  container.innerHTML = '';
  
  if (conversationHistory.length === 0) {
    container.innerHTML = '<p style="color: rgba(255,255,255,0.6); font-size: 12px;">No conversation history yet.</p>';
    return;
  }
  
  conversationHistory.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    
    const date = new Date(item.timestamp);
    const timeStr = date.toLocaleString();
    
    const typeEmoji = item.type === 'image' ? '📸' : item.type === 'text' ? '📝' : '💬';
    
    div.innerHTML = `
      <div class="history-timestamp">
        <span class="history-type">${typeEmoji} ${item.type}</span>
        ${timeStr}
      </div>
      <div class="history-question">Q: ${item.question}</div>
      <div class="history-answer">A: ${item.answer}</div>
    `;
    
    div.onclick = () => {
      // Copy answer to clipboard
      navigator.clipboard.writeText(item.answer);
      showNotification('✅ Answer copied to clipboard!');
    };
    
    container.appendChild(div);
  });
}

// History button
document.getElementById('history-btn').addEventListener('click', () => {
  mainView.classList.add('hidden');
  settingsView.classList.add('hidden');
  commandsView.classList.add('hidden');
  historyView.classList.remove('hidden');
  renderHistory();
});

// Back from history
document.getElementById('back-from-history').addEventListener('click', () => {
  historyView.classList.add('hidden');
  mainView.classList.remove('hidden');
});

// Clear history
document.getElementById('clear-history').addEventListener('click', () => {
  if (confirm('Clear all conversation history?')) {
    conversationHistory = [];
    localStorage.removeItem('conversationHistory');
    renderHistory();
    showNotification('History cleared');
  }
});

// Load history on startup
loadHistory();


// Detect Google Form and auto-suggest answers
async function detectAndSuggestGoogleForm(imageBase64) {
  // Check if auto-detect is enabled
  if (config?.assistant.settings.autoDetectForms === false) {
    return;
  }
  
  try {
    // Quick check if it looks like a form
    const detectionPrompt = "Is this a Google Form, survey, quiz, questionnaire, or any type of form with questions? Look for form fields, radio buttons, checkboxes, text inputs, or question prompts. Answer only 'yes' or 'no'.";
    
    const isForm = await window.electronAPI.analyzeImage(
      imageBase64,
      detectionPrompt,
      { temperature: 0.3, maxTokens: 10 }
    );
    
    if (isForm.toLowerCase().includes('yes')) {
      // It's a form! Auto-expand and suggest answers
      expandWidget();
      
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = '🎯 Form detected! Analyzing questions...\n\n💡 Tip: If this is a multi-page form, scroll through all pages and take screenshots of each section.';
      resultDiv.classList.add('visible', 'analyzing-form');
      
      // Get all questions and suggest answers with better formatting
      const formPrompt = `This is a form or questionnaire. Please analyze it carefully and:

1. Extract ALL visible questions, including:
   - Multiple choice questions (with all options)
   - Text input fields
   - Checkboxes
   - Dropdown selections
   - Rating scales
   - Any other question types

2. For each question, provide a well-thought-out answer that:
   - Is appropriate for the question type
   - Sounds natural and human-like
   - Is specific and detailed (not generic)
   - Matches the expected format

3. Format your response EXACTLY like this:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORM QUESTIONS & SUGGESTED ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: [First question text]
Type: [Multiple Choice/Text/Checkbox/etc.]
Options: [List options if applicable]
✅ Suggested Answer: [Your suggested answer]

Q2: [Second question text]
Type: [Question type]
✅ Suggested Answer: [Your suggested answer]

[Continue for all questions...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 NOTES:
- [Any special instructions or observations about the form]
- [Mention if there appear to be more pages/sections]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Be thorough and extract EVERY question visible.`;
      
      const suggestions = await window.electronAPI.analyzeImage(
        imageBase64,
        formPrompt,
        { ...config.assistant.settings, maxTokens: 1500 }
      );
      
      resultDiv.classList.remove('analyzing-form');
      resultDiv.classList.add('form-detected');
      resultDiv.textContent = suggestions;
      saveToHistory('Auto-detected Form', suggestions, 'image');
      
      showNotification('✅ Form answers suggested! Scroll down to see all.');
    }
  } catch (error) {
    console.error('Form detection error:', error);
  }
}
