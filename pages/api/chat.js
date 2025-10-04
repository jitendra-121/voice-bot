export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract text and history from request body
    const { text, history = [] } = req.body;

    // Validate required text parameter
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // System prompt to make the assistant respond as ChatGPT
    const systemPrompt = {
      role: 'system',
      content: 'You are ChatGPT, a friendly, concise, helpful assistant. Answer user questions in first person as the assistant (e.g., "I ..."), with a warm, slightly playful tone. Keep replies clear and accessible for non-technical users.'
    };

    // Add user message to conversation
    const userMessage = {
      role: 'user',
      content: text
    };

    // Construct messages array with system prompt, history, and new message
    const messages = [systemPrompt, ...history, userMessage];

    // Get model from environment or use default
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get response from AI service' 
      });
    }

    const data = await response.json();
    
    // Extract the assistant's reply
    const reply = data.choices?.[0]?.message?.content;
    
    if (!reply) {
      console.error('No reply received from OpenAI API');
      return res.status(500).json({ error: 'No response received' });
    }

    // Return the reply to the client
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}