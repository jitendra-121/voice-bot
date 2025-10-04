# Voice Chatbot

A universally user-friendly voice chatbot web app built with Next.js that provides voice input capabilities and text-to-speech responses.

## Features

- 🎤 Voice input using browser Web Speech API with text fallback
- 💬 OpenAI-powered chat responses 
- 🔊 Text-to-speech using browser speechSynthesis
- ♿ Accessible UI with keyboard navigation
- 🔒 Secure API key handling (server-side only)
- 🚀 Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with your OpenAI API key:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Test Prompts to Try

- "What's the weather like today?"
- "Explain quantum computing in simple terms"
- "Tell me a short joke"
- "How do I make a good cup of coffee?"

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `OPENAI_MODEL` (optional): Model to use (defaults to gpt-4o-mini)
4. Deploy!

### Required Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL` (optional): OpenAI model to use (defaults to gpt-4o-mini)

## Usage

1. Allow microphone permissions when prompted (Chrome/Edge recommended)
2. Click the microphone button to start voice input
3. Speak your message or use the text input as fallback
4. The assistant will respond with both text and speech

### Keyboard Shortcuts

- `Ctrl + Space`: Toggle microphone on/off

## Browser Compatibility

- **Voice input**: Chrome, Edge, Safari (with webkit prefix)
- **Text-to-speech**: All modern browsers
- **Text fallback**: All browsers

## Project Structure

```
voice-chatbot/
├── pages/
│   ├── index.js          # Main UI with voice chat interface
│   └── api/
│       └── chat.js       # OpenAI API proxy endpoint
├── public/
│   └── favicon.ico       # App icon
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── .env.example          # Environment variable template
└── README.md            # This file
```

## Security

- API keys are never exposed to the client
- All OpenAI requests go through the server-side API route
- Environment variables are handled securely
- No sensitive data is stored in the repository