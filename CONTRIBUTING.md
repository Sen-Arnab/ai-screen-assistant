# Contributing to AI Screen Assistant

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/ai-screen-assistant/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - System information (OS, versions)
   - Relevant logs from `backend.log`

### Suggesting Features

1. Check [existing feature requests](https://github.com/yourusername/ai-screen-assistant/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Any relevant examples

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the code style
   - Add tests if applicable
   - Update documentation
4. **Test your changes**
   ```bash
   ./start.sh
   # Test all functionality
   ```
5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add new feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

## Development Setup

### Prerequisites
- Node.js 14+
- Python 3.8+
- Git
- AWS Account (for testing)

### Setup Steps
```bash
# Clone your fork
git clone https://github.com/yourusername/ai-screen-assistant.git
cd ai-screen-assistant

# Install dependencies
npm install
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Configure environment
cp backend/.env.example backend/.env
# Add your AWS credentials

# Start development
./start.sh
```

## Code Style

### JavaScript
- Use ES6+ features
- 2 spaces for indentation
- Semicolons required
- Clear variable names
- Comments for complex logic

### Python
- Follow PEP 8
- 4 spaces for indentation
- Type hints where applicable
- Docstrings for functions
- Clear error handling

### CSS
- BEM naming convention
- Mobile-first approach
- Comments for sections
- Consistent spacing

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

## Testing

### Manual Testing
1. Test all keyboard shortcuts
2. Test all quick actions
3. Test form filling
4. Test auto-scroll
5. Test error handling
6. Test on different screen sizes

### Automated Testing
```bash
# Run tests (when available)
npm test
```

## Documentation

Update documentation when:
- Adding new features
- Changing behavior
- Fixing bugs
- Updating dependencies

Files to update:
- `README.md` - Main documentation
- `QUICK-REFERENCE.md` - Shortcuts and actions
- Relevant guides in `/docs`

## Areas for Contribution

### High Priority
- [ ] Unit tests
- [ ] Integration tests
- [ ] Error handling improvements
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Features
- [ ] Plugin system
- [ ] IDE integrations
- [ ] Cloud sync
- [ ] Voice input
- [ ] Custom themes
- [ ] Multi-language UI

### Documentation
- [ ] Video tutorials
- [ ] More examples
- [ ] API documentation
- [ ] Architecture diagrams

### Bug Fixes
- Check [open issues](https://github.com/yourusername/ai-screen-assistant/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

## Questions?

- Open a [Discussion](https://github.com/yourusername/ai-screen-assistant/discussions)
- Check existing [Issues](https://github.com/yourusername/ai-screen-assistant/issues)
- Read the [Documentation](./docs)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in commit history

Thank you for contributing! 🙏
