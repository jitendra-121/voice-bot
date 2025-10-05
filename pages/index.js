import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // State management
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  // Refs
  const recognitionRef = useRef(null);
  const conversationEndRef = useRef(null);
  const maxRetries = 2;

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        setInterimTranscript(interim);
        if (final) {
          setTranscript(prev => prev + final);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = '';
        
        switch(event.error) {
          case 'network':
            if (retryCount < maxRetries) {
              errorMessage = `Network issue detected. Retrying... (Attempt ${retryCount + 1}/${maxRetries})`;
              setError(errorMessage);
              // Auto-retry after a short delay
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setError('');
                try {
                  recognitionRef.current?.start();
                } catch (e) {
                  console.error('Retry failed:', e);
                }
              }, 1000);
              return;
            } else {
              errorMessage = 'Speech recognition unavailable. Please use text input below or check your internet connection and try again later.';
              setRetryCount(0); // Reset retry count
            }
            break;
          case 'not-allowed':
          case 'permission-denied':
            errorMessage = 'Microphone access denied. Please enable microphone permissions in your browser settings and reload the page.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            setIsListening(false);
            return; // Don't stop completely, user can try again
          case 'aborted':
            // Don't show error for aborted, it's usually intentional
            setIsListening(false);
            return;
          case 'audio-capture':
            errorMessage = 'No microphone found. Please connect a microphone and try again.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}. Please use text input below.`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Reset retry count on successful end
        setRetryCount(0);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Start/stop voice recognition
  const toggleListening = () => {
    if (!speechSupported) {
      setError('Speech recognition not supported in this browser. Please use the text input below.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setInterimTranscript('');
      setError(''); // Clear any previous errors
      
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setError('Could not start speech recognition. Please use the text input below.');
      }
    }
  };

  // Send message to API
  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    setIsLoading(true);
    setError('');

    // Add user message to conversation
    const userMessage = { role: 'user', content: messageText.trim() };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messageText.trim(),
          history: conversation
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant response to conversation
      const assistantMessage = { role: 'assistant', content: data.reply };
      setConversation(prev => [...prev, assistantMessage]);

      // Speak the response using TTS
      if ('speechSynthesis' in window && data.reply) {
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice input submission
  const handleVoiceSubmit = () => {
    if (transcript.trim()) {
      sendMessage(transcript);
      setTranscript('');
      setInterimTranscript('');
    }
  };

  // Handle text input submission
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      sendMessage(textInput);
      setTextInput('');
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === ' ' && e.ctrlKey) {
      e.preventDefault();
      toggleListening();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, speechSupported]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Voice Chatbot</h1>
        <p style={styles.subtitle}>
          {speechSupported 
            ? "Click the microphone or type to chat"
            : "Speech not supported - please use text input"
          }
        </p>
        {speechSupported && (
          <div style={styles.infoBanner}>
            💡 <strong>Tip:</strong> If voice input doesn't work, it may be a temporary network issue with the browser's speech service. Text input always works!
          </div>
        )}
      </header>

      <main style={styles.main}>
        {/* Conversation History */}
        <div style={styles.conversationContainer}>
          {conversation.length === 0 ? (
            <div style={styles.welcomeMessage}>
              <p>👋 Hi! I'm ChatGPT. How can I help you today?</p>
            </div>
          ) : (
            conversation.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(message.role === 'user' ? styles.userMessage : styles.assistantMessage)
                }}
              >
                <strong>{message.role === 'user' ? 'You' : 'ChatGPT'}:</strong>
                <p>{message.content}</p>
              </div>
            ))
          )}
          {isLoading && (
            <div style={styles.message}>
              <strong>ChatGPT:</strong>
              <p style={styles.thinking}>Thinking...</p>
            </div>
          )}
          <div ref={conversationEndRef} />
        </div>

        {/* Voice Input Section */}
        {speechSupported && (
          <div style={styles.voiceSection}>
            <button
              onClick={toggleListening}
              disabled={isLoading}
              style={{
                ...styles.micButton,
                ...(isListening ? styles.micButtonActive : {})
              }}
              aria-label={isListening ? "Stop recording" : "Start recording"}
            >
              🎤
            </button>
            
            {/* Transcript Display */}
            <div style={styles.transcriptContainer}>
              <div style={styles.transcript}>
                {transcript && <span style={styles.finalTranscript}>{transcript}</span>}
                {interimTranscript && <span style={styles.interimTranscript}>{interimTranscript}</span>}
                {!transcript && !interimTranscript && (
                  <span style={styles.placeholder}>
                    {isListening ? "Listening..." : "Click mic to start speaking"}
                  </span>
                )}
              </div>
              {transcript && (
                <button
                  onClick={handleVoiceSubmit}
                  disabled={isLoading}
                  style={styles.sendButton}
                  aria-label="Send voice message"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        )}

        {/* Text Input Fallback */}
        <form onSubmit={handleTextSubmit} style={styles.textInputForm}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            style={styles.textInput}
            aria-label="Type your message"
          />
          <button
            type="submit"
            disabled={isLoading || !textInput.trim()}
            style={styles.sendButton}
            aria-label="Send text message"
          >
            Send
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div style={styles.error} role="alert">
            <span>{error}</span>
            <button 
              onClick={() => setError('')}
              style={styles.errorCloseButton}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Keyboard Shortcut Hint */}
        {speechSupported && (
          <div style={styles.hint}>
            💡 Tip: Press Ctrl+Space to toggle microphone
          </div>
        )}
      </main>
    </div>
  );
}

// Inline styles for accessibility and simplicity
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    color: '#333',
    fontSize: '2rem',
  },
  subtitle: {
    margin: '0.5rem 0 0 0',
    color: '#666',
    fontSize: '1rem',
  },
  infoBanner: {
    margin: '0.75rem auto 0',
    padding: '0.5rem 1rem',
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    borderRadius: '4px',
    fontSize: '0.9rem',
    maxWidth: '600px',
    textAlign: 'left',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minHeight: 'calc(100vh - 120px)',
  },
  conversationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #ddd',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  welcomeMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    padding: '2rem',
  },
  message: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
  },
  userMessage: {
    backgroundColor: '#e3f2fd',
    marginLeft: '2rem',
  },
  assistantMessage: {
    backgroundColor: '#f1f8e9',
    marginRight: '2rem',
  },
  thinking: {
    fontStyle: 'italic',
    color: '#666',
  },
  voiceSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  micButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#0070f3',
    backgroundColor: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f0f8ff',
    },
  },
  micButtonActive: {
    backgroundColor: '#ff4444',
    borderColor: '#ff4444',
    color: '#fff',
    animation: 'pulse 1s infinite',
  },
  transcriptContainer: {
    flex: 1,
    display: 'flex',
    gap: '0.5rem',
  },
  transcript: {
    flex: 1,
    minHeight: '60px',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '1rem',
    lineHeight: '1.4',
  },
  finalTranscript: {
    color: '#333',
  },
  interimTranscript: {
    color: '#666',
    fontStyle: 'italic',
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
  },
  textInputForm: {
    display: 'flex',
    gap: '0.5rem',
  },
  textInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  error: {
    padding: '0.75rem',
    backgroundColor: '#ffebee',
    color: '#c62828',
    border: '1px solid #ffcdd2',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  errorCloseButton: {
    background: 'none',
    border: 'none',
    color: '#c62828',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0',
    lineHeight: '1',
    minWidth: '20px',
  },
  hint: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
};