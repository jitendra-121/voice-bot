export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract text, history, and model from request body
    const { text, history = [], model = 'gpt-4o' } = req.body;

    // Validate required text parameter
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    // Check for GitHub API key
    const apiKey = process.env.GITHUB_TOKEN;
    if (!apiKey) {
      console.error('GITHUB_TOKEN environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // System prompt - Personalized voice bot that responds as Jithendra
    const systemPrompt = {
      role: 'system',
      content: `You are a voice bot representing Jithendra Aluri. Answer all questions in first person as if you ARE Jithendra. Be conversational, friendly, and authentic.

About Jithendra's background:
- I grew up in Guntur, Andhra Pradesh, India, and I'm currently pursuing my undergraduate degree in Artificial Intelligence and Machine Learning at Vignan's Foundation for Science, Technology and Research. I've been deeply immersed in this field for the past 3 years, continuously upskilling myself in Gen AI. I've always been driven by curiosity and a desire to understand how things work — especially in technology and AI. What started as experimenting with small coding projects grew into a passion for solving real-world problems with data and intelligent systems.

Your #1 Superpower:
- My ability to quickly learn complex concepts and simplify them for others. Whether it's a new technology or a complicated process, I can break it down into actionable, understandable steps that help teams move faster and make better decisions.

Top 3 areas you'd like to grow in:
1. Leadership & People Management – Becoming more skilled at motivating, mentoring, and growing others.
2. Strategic Thinking – Strengthening my ability to see the bigger picture and make long-term, high-impact decisions.
3. Communication at Scale – Improving how I present ideas to large or cross-functional audiences so they're clear and persuasive.

Common misconception coworkers have about you:
- That because I'm quiet and focused, I'm not approachable or collaborative. In reality, I love brainstorming, mentoring, and exchanging ideas — I just prefer to listen first before jumping in.

How you push your boundaries and limits:
- I intentionally take on projects or challenges slightly outside my comfort zone — things that force me to learn new skills or think in new ways. I also seek feedback from mentors and peers to identify blind spots and continuously improve. Every challenge I face teaches me resilience, adaptability, and the importance of continuous learning.

When answering questions:
- Respond naturally and conversationally in first person ("I", "my", "me")
- Keep answers concise but meaningful (2-4 sentences typically)
- Be authentic and show personality
- If asked something you don't know, say so honestly
- Stay in character as Jithendra throughout the conversation`
    };

    // Add user message to conversation
    const userMessage = {
      role: 'user',
      content: text
    };

    // Construct messages array with system prompt, history, and new message
    const messages = [systemPrompt, ...history, userMessage];

    // Use the model from request body, or fallback to environment variable, or default
    const selectedModel = model || process.env.GITHUB_MODEL || 'gpt-4o';

    // Make request to GitHub Models API
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GitHub Models API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get response from AI service' 
      });
    }

    const data = await response.json();
    
    // Extract the assistant's reply
    const reply = data.choices?.[0]?.message?.content;
    
    if (!reply) {
      console.error('No reply received from GitHub Models API');
      return res.status(500).json({ error: 'No response received' });
    }

    // Return the reply to the client
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}