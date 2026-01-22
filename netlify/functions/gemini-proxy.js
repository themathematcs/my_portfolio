// Netlify Function: Gemini proxy with basic retry/backoff
// Env var required: GEMINI_API_KEY (configured in Netlify project settings)

const MODEL = 'gemini-1.5-flash-latest';
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, init, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      if (res.status >= 500 || res.status === 429) {
        lastErr = new Error(`HTTP ${res.status}`);
      } else {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || `HTTP ${res.status}`);
      }
    } catch (e) {
      lastErr = e;
    }
    await sleep(1000 * Math.pow(2, i)); // 1s, 2s
  }
  throw lastErr || new Error('Request failed');
}

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

    const res = await fetchWithRetry(url, {
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
