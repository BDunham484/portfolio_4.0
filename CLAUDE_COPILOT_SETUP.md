# Claude Copilot Setup Guide

## Overview
This guide will help you set up Claude for AI-powered code completions in VSCode, similar to GitHub Copilot.

## Current Extensions
You already have these relevant extensions installed:
- `anthropic.claude-code` - Official Claude extension for VSCode
- `saoudrizwan.claude-dev` - Cline (AI assistant)
- `github.copilot` - GitHub Copilot (if you want to compare/use alongside)

## Setup Steps

### 1. Configure Claude Code Extension

The `anthropic.claude-code` extension provides inline code completions powered by Claude. To set it up:

1. **API Key Configuration:**
   - Open VSCode Settings (Ctrl+,)
   - Search for "claude"
   - Find "Claude Code: API Key" setting
   - Enter your Anthropic API key

2. **Enable Inline Completions:**
   - In Settings, search for "claude code completions"
   - Enable "Claude Code: Enable Completions"
   - Set completion trigger to "automatic" or "manual" based on preference

### 2. VSCode Settings Configuration

Add these settings to your VSCode settings.json:

```json
{
  "claude-code.enableCompletions": true,
  "claude-code.completionTrigger": "automatic",
  "claude-code.maxCompletionLength": 100,
  "claude-code.enableInlineChat": true,
  "editor.inlineSuggest.enabled": true,
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  }
}
```

### 3. Alternative: Continue.dev Extension

If you want more advanced Claude integration, consider installing Continue.dev:

```bash
# Install Continue extension
code --install-extension continue.continue
```

Then configure it with Claude in `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "model": "claude-3-5-sonnet-20241022",
      "apiKey": "your-api-key-here"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Claude 3.5 Sonnet",
    "provider": "anthropic",
    "model": "claude-3-5-sonnet-20241022",
    "apiKey": "your-api-key-here"
  }
}
```

### 4. Keyboard Shortcuts

Set up these keyboard shortcuts for better workflow:

```json
[
  {
    "key": "ctrl+shift+i",
    "command": "claude-code.inlineChat"
  },
  {
    "key": "tab",
    "command": "editor.action.inlineSuggest.commit",
    "when": "inlineSuggestionVisible"
  },
  {
    "key": "escape",
    "command": "editor.action.inlineSuggest.hide",
    "when": "inlineSuggestionVisible"
  }
]
```

## Usage

### Inline Completions
- Start typing code and Claude will suggest completions
- Press Tab to accept suggestions
- Press Escape to dismiss suggestions

### Chat-based Coding
- Use Ctrl+Shift+I to open inline chat
- Ask Claude to write, explain, or refactor code
- Claude will provide contextual suggestions based on your current file

### Best Practices
1. **Context Matters:** Claude works better with clear, well-commented code
2. **Specific Prompts:** Be specific about what you want when using chat features
3. **Review Suggestions:** Always review AI-generated code before accepting
4. **Combine with Copilot:** You can use both Claude and GitHub Copilot together

## Troubleshooting

### Common Issues:
1. **No completions appearing:**
   - Check API key is set correctly
   - Ensure completions are enabled in settings
   - Verify internet connection

2. **Slow completions:**
   - Adjust `maxCompletionLength` setting
   - Check API rate limits

3. **Conflicts with other extensions:**
   - Disable GitHub Copilot temporarily to test Claude
   - Check extension priority in settings

## Testing Your Setup

Create a test file to verify everything works:

```typescript
// test-claude-completions.ts
function calculateFibonacci(n: number): number {
  // Start typing here and see if Claude suggests completions
  
}

// Try asking Claude to implement a React component
const MyComponent = () => {
  // Type a comment describing what you want and see suggestions
  
}
```

## Next Steps

1. Test the setup with your existing TypeScript/React code
2. Experiment with different completion triggers
3. Customize settings based on your workflow preferences
4. Consider setting up project-specific configurations
