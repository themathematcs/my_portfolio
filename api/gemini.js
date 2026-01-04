// Sample Vercel / serverless handler: api/gemini
// Deploy this to a server or a serverless platform (Vercel, Netlify functions,
// Cloud Run, Cloud Functions). Store your Gemini API key in the platform's
// environment variables as `GEMINI_API_KEY` (do NOT commit it to the repo).

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message in body" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    const text = response?.text || "";
    // Return as JSON; the client accepts either JSON {text} or plain text
    res.status(200).json({ text });
  } catch (err) {
    console.error("gemini proxy error:", err);
    res.status(500).json({ error: "AI proxy error" });
  }
}
