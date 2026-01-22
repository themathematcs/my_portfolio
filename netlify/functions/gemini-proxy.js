// Netlify Function: Gemini proxy (single attempt)
// Env var required: GEMINI_API_KEY (configured in Netlify project settings)

const MODEL = 'gemini-1.5-flash-latest';
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// Single fetch only; any error is returned to client to handle fallback

export default async (req, context) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const userMessage = (body && body.userMessage) || '';
    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'userMessage required' }), { status: 400 });
    }

    const url = `${BASE}/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    // Extract plain text from candidates
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), {
      headers: { 'Content-Type': 'application/json' },
      status: 502,
    });
  }
};
