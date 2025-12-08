// FILE: netlify/functions/gemini-proxy.ts

import type { Handler } from '@netlify/functions';
import { GoogleGenAI } from "@google/genai";

// 🛑 The API key is READ SECURELY from Netlify's environment
const apiKey = process.env.GEMINI_API_KEY; 
const model = "gemini-2.5-flash";

// --- PORTFOLIO KNOWLEDGE BASE (USE YOUR REAL CONTENT HERE) ---
const PORTFOLIO_CONTEXT = `
ABOUT ME: [Paste your actual ABOUT_ME content here]

SKILLS: 
[Paste your actual SKILLS content here]

CERTIFICATIONS (Kaggle & Simplilearn, 2025):
[Paste your actual CERTIFICATIONS content here]

PROJECTS:
[Paste your actual PROJECTS content here]
`;


export const handler: Handler = async (event) => {
    // 1. Initialize AI Client (must be done inside the handler if API Key is missing during global startup)
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error: Missing API Key configuration." }) };
    }
    const ai = new GoogleGenAI({ apiKey });


    if (event.httpMethod !== 'POST' || !event.body) {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { userMessage } = JSON.parse(event.body);

        const responseStream = await ai.models.generateContentStream({
            model: model,
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            config: {
                systemInstruction: `You are Christian's personal AI assistant. Your sole purpose is to answer questions about Christian's skills, experience, projects, and certifications. Always refer to Christian in the third person. Base your answers ONLY on the following knowledge provided to you: ${PORTFOLIO_CONTEXT}`
            }
        });

        // Collect the entire stream response into a single string
        let fullResponseText = "";
        for await (const chunk of responseStream) {
            fullResponseText += chunk.text;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ text: fullResponseText }),
            headers: { 'Content-Type': 'application/json' },
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error connecting to AI." }),
        };
    }
};