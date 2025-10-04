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
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

Deploy to Vercel by connecting your GitHub repository and setting the environment variables in the Vercel dashboard.

### Required Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL` (optional): OpenAI model to use (defaults to gpt-4o-mini)

## Usage

1. Allow microphone permissions when prompted
2. Click the microphone button to start voice input
3. Speak your message or use the text input as fallback
4. The assistant will respond with both text and speech

## Browser Compatibility

- Voice input: Chrome, Edge, Safari (with webkit prefix)
- Text-to-speech: All modern browsers
- Text fallback: All browsers