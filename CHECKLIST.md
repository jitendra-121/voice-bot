# End-to-End Verification Checklist

This checklist provides manual verification steps to ensure the voice chatbot is working correctly.

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] Valid OpenAI API key
- [ ] Chrome, Edge, or Safari browser (for voice features)

## Local Setup Verification

### 1. Environment Setup
- [ ] Set `.env.local` with `OPENAI_API_KEY`
- [ ] Optional: Set `OPENAI_MODEL` (defaults to gpt-4o-mini)
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` and server starts on http://localhost:3000

### 2. API Endpoint Testing
- [ ] Run `./test-local.sh` and all tests pass
- [ ] Verify API returns 400 for missing body
- [ ] Verify API returns 500 for missing API key (if key not set)
- [ ] Verify API returns 405 for non-POST methods

## Frontend UI Verification

### 3. Basic Interface
- [ ] Open http://localhost:3000 in browser
- [ ] Page loads without JavaScript errors
- [ ] Welcome message "Hi! I'm ChatGPT..." appears
- [ ] Microphone button is visible and accessible
- [ ] Text input field is visible and functional

### 4. Browser Compatibility Check
- [ ] **Chrome/Edge**: Voice features should be available
- [ ] **Safari**: Voice features should work with webkit prefix
- [ ] **Firefox**: Should show "Speech not supported" message
- [ ] Text input fallback works in all browsers

### 5. Voice Input Testing (Chrome/Edge)
- [ ] Click microphone button and browser requests permission
- [ ] Grant microphone permission
- [ ] Microphone button changes color when active
- [ ] Speak "Hello, how are you?" and transcript appears
- [ ] Click "Send" and message is sent to API
- [ ] Assistant response appears in conversation
- [ ] Response is spoken aloud via text-to-speech

### 6. Text Input Testing
- [ ] Type "What's 2+2?" in text input field
- [ ] Click "Send" button or press Enter
- [ ] Message appears in conversation history
- [ ] Assistant responds with calculation
- [ ] Response is spoken aloud

### 7. Conversation Flow
- [ ] Multiple messages maintain conversation context
- [ ] User messages appear on the right (blue background)
- [ ] Assistant messages appear on the left (green background)
- [ ] Conversation auto-scrolls to bottom
- [ ] "Thinking..." indicator shows during API calls

### 8. Accessibility Testing
- [ ] Tab through interface using keyboard only
- [ ] Microphone button is focusable and activatable with Enter/Space
- [ ] All buttons have proper ARIA labels
- [ ] Text input is properly labeled
- [ ] Error messages are announced by screen readers
- [ ] Use Ctrl+Space to toggle microphone (keyboard shortcut)

### 9. Error Handling
- [ ] Test with invalid API key (should show error message)
- [ ] Test with network disconnection (should handle gracefully)
- [ ] Test microphone permission denied (should show error)
- [ ] Error messages are user-friendly and not technical

## Security Verification

### 10. Client-Side Security Check
- [ ] Open Browser DevTools → Sources tab
- [ ] Search for "OPENAI_API_KEY" or "sk-" in all files
- [ ] **CRITICAL**: No API keys should appear in frontend bundle
- [ ] Verify API calls go to `/api/chat` (not directly to OpenAI)

### 11. Network Traffic Analysis
- [ ] Open DevTools → Network tab
- [ ] Send a test message
- [ ] Verify only POST to `/api/chat` is made from frontend
- [ ] No direct calls to api.openai.com from browser
- [ ] API key never appears in request headers from browser

## Performance Testing

### 12. Response Times
- [ ] First message response time < 5 seconds
- [ ] Subsequent messages maintain reasonable speed
- [ ] TTS starts promptly after text response
- [ ] No memory leaks during extended use

### 13. Mobile Testing (Optional)
- [ ] Open on mobile device
- [ ] Text input works on mobile
- [ ] Interface is responsive
- [ ] Touch interactions work properly

## Production Readiness Checklist

### 14. Build Process
- [ ] Run `npm run build` successfully
- [ ] Run `npm start` and production build works
- [ ] No build warnings or errors
- [ ] All features work in production mode

### 15. Environment Variables
- [ ] `.env.example` contains all required variables
- [ ] No sensitive data in committed files
- [ ] `.gitignore` properly excludes `.env*` files

## Expected Behavior Summary

✅ **Working correctly when:**
- Voice input transcribes speech accurately
- Text appears in conversation bubbles
- Assistant responses are contextual and helpful
- TTS speaks responses naturally
- No API keys visible in frontend
- All accessibility features work

❌ **Issues to investigate:**
- Microphone doesn't activate (check permissions)
- No voice recognition (check browser support)
- API errors (check key and network)
- Silent responses (check TTS/audio settings)
- Security issues (check for exposed secrets)

## Troubleshooting Common Issues

- **"Speech recognition not supported"**: Use Chrome/Edge or text input
- **"Server configuration error"**: Check OPENAI_API_KEY in .env.local
- **No audio output**: Check browser audio settings and TTS support
- **API timeouts**: Check network connection and OpenAI service status
- **Permission denied**: Re-enable microphone permissions in browser settings

---

**Note**: This checklist should be completed before deployment and periodically during development to ensure quality and security standards are maintained.