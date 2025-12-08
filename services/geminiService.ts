
// import { GoogleGenAI } from "@google/genai";
// import { ChatMessage } from "./types";

// // --- 1. SECURELY GET THE API KEY ---
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// if (!apiKey) {
//     throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your .env file.");
// }

// const ai = new GoogleGenAI({ apiKey });
// const model = "gemini-2.5-flash"; // Efficient model for chat

// // 2. Define the new streaming function
// export const streamMessageFromGemini = async (
//     userMessage: string, 
//     setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
// ) => {
//     try {
//         const response = await ai.models.generateContentStream({
//             model: model,
//             contents: [{ role: "user", parts: [{ text: userMessage }] }],
//         });

//         // Loop through the stream chunks
//         for await (const chunk of response) {
//             const chunkText = chunk.text;

//             if (chunkText) {
//                 // Update the last (empty) model message with the new chunk text
//                 setMessages(prevMessages => {
//                     const newMessages = [...prevMessages];
//                     const lastMessage = newMessages[newMessages.length - 1];
                    
//                     // Ensure the last message is a 'model' message before updating
//                     if (lastMessage.role === 'model') {
//                         lastMessage.text += chunkText;
//                     }
//                     return newMessages;
//                 });
//             }
//         }
//     } catch (error) {
//         console.error("Error streaming response from Gemini:", error);
//         setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//                 role: 'model',
//                 text: "An error occurred while connecting to the AI. Please try again."
//             };
//             return newMessages;
//         });
//     }
// };

// // 3. Keep the old function definition for structure, but it's now unused.
// export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
//     return "This function is deprecated, use streamMessageFromGemini instead.";
// };
// import { GoogleGenAI } from "@google/genai";
// import { ChatMessage } from "./types";
// // 1. 🟢 Import the constants to build the AI's knowledge base
// import { ABOUT_ME, SKILLS, CERTIFICATIONS, PROJECTS } from '../constants';

// // --- 1. SECURELY GET THE API KEY ---
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// if (!apiKey) {
//     throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your .env file.");
// }

// const ai = new GoogleGenAI({ apiKey });
// const model = "gemini-2.5-flash"; // Efficient model for chat

// // --- PORTFOLIO KNOWLEDGE BASE ---
// // 2. 🟢 Construct the knowledge base using the imported data
// const PORTFOLIO_CONTEXT = `
// ABOUT ME: ${ABOUT_ME}

// SKILLS: 
// ${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

// CERTIFICATIONS (Kaggle & Simplilearn, 2025):
// ${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}): ${c.description}`).join('\n')}

// PROJECTS:
// ${PROJECTS.map(p => `- ${p.title} (${p.type}, ${p.technologies.join(', ')}): ${p.description}`).join('\n')}
// `;


// // 3. Define the new streaming function
// export const streamMessageFromGemini = async (
//     userMessage: string, 
//     setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
// ) => {
//     try {
//         const response = await ai.models.generateContentStream({
//             model: model,
//             contents: [{ role: "user", parts: [{ text: userMessage }] }],
//             // 3. 🟢 ADD THE CONFIGURATION OBJECT HERE
//             config: {
//                 systemInstruction: `You are Christian's personal AI assistant. Your sole purpose is to answer questions about Christian's skills, experience, projects, and certifications. Always refer to Christian in the third person. Base your answers ONLY on the following knowledge provided to you: ${PORTFOLIO_CONTEXT}`
//             }
//         });

//         // Loop through the stream chunks
//         let fullResponseText = "";
//         for await (const chunk of response) {
//             const chunkText = chunk.text;

//             if (chunkText) {
//                 fullResponseText += chunkText;
//                 setMessages(prevMessages => {
//                     const newMessages = [...prevMessages];
//                     const lastMessage = newMessages[newMessages.length - 1];
                    
//                     // Ensure the last message is a 'model' message before updating
//                     if (lastMessage.role === 'model') {
//                         // 4. 🟢 Update the text completely (for smoother streaming experience)
//                         lastMessage.text = fullResponseText; 
//                     }
//                     return newMessages;
//                 });
//             }
//         }
//     } catch (error) {
//         console.error("Error streaming response from Gemini:", error);
//         setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//                 role: 'model',
//                 text: "An error occurred while connecting to the AI. Please try again."
//             };
//             return newMessages;
//         });
//     }
// };

// // 3. Keep the old function definition for structure, but it's now unused.
// export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
//     return "This function is deprecated, use streamMessageFromGemini instead.";
// };

// FILE: src/geminiService.ts (Final Clean Version)

// 
// FILE: src/geminiService.ts

/*
    Client-side proxy layer

    IMPORTANT: This file intentionally does NOT include the Gemini API key or call
    the GoogleGenAI client directly. Browser-hosted keys are public. For GitHub
    Pages (static hosting) you must deploy a small server or serverless function
    that holds the secret and forwards requests to Gemini. The client calls
    that server endpoint instead.

    This module exposes `streamMessageFromGemini` and `sendMessageToGemini` but
    those functions call `/api/gemini` on your deployed backend (see `api/gemini.js`).
*/

// import { ChatMessage } from "./types";

// // Helper: send a message to the server-side proxy and return text
// async function callGeminiProxy(message: string) {
//     const res = await fetch("/api/gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//     });

//     if (!res.ok) {
//         const body = await res.text().catch(() => "");
//         throw new Error(`Proxy error: ${res.status} ${body}`);
//     }

//     // Expect the proxy to return plain text or JSON { text }
//     const ct = res.headers.get("content-type") || "";
//     if (ct.includes("application/json")) {
//         const j = await res.json();
//         return j.text || "";
//     }

//     return res.text();
// }

// export const streamMessageFromGemini = async (
//     userMessage: string,
//     setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
// ) => {
//     try {
//         const text = await callGeminiProxy(userMessage);

//         setMessages(prev => {
//             const newMessages = [...prev];
//             // Replace or append the model message
//             const last = newMessages[newMessages.length - 1];
//             if (last && last.role === "model") {
//                 last.text = text;
//             } else {
//                 newMessages.push({ role: "model", text });
//             }
//             return newMessages;
//         });
//     } catch (err) {
//         console.error("Error contacting Gemini proxy:", err);
//         setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//                 role: "model",
//                 text: "An error occurred while connecting to the AI. Please try again.",
//             };
//             return newMessages;
//         });
//     }
// };

// export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
//     try {
//         return await callGeminiProxy(userMessage);
//     } catch (err) {
//         console.error(err);
//         return "";
//     }
// };
// FILE: src/services/geminiService.ts (Client Update for Proxy)

import { ChatMessage } from "../types";

// 1. Define the proxy endpoint using a non-secret environment variable
// Use a fallback of '/.netlify/functions/gemini-proxy' for local development/Netlify
const PROXY_URL = import.meta.env.VITE_GEMINI_PROXY_URL || '/.netlify/functions/gemini-proxy';

// 2. Client function now makes a simple fetch call to the proxy
export const streamMessageFromGemini = async (
    userMessage: string, 
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) => {
    try {
        // We no longer stream on the client side; we wait for the serverless function to return the full text.
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMessage }),
        });

        if (!response.ok) {
            // Attempt to read error message from proxy
            const errorData = await response.json();
            throw new Error(errorData.error || "Proxy failed to get response.");
        }
        
        const data = await response.json();
        let fullResponseText = data.text || "Sorry, I could not retrieve an answer from the AI assistant.";

        // Update state with the final response text
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            const lastMessage = newMessages[newMessages.length - 1];
            
            // This logic ensures the last message (the placeholder) is updated
            if (lastMessage.role === 'model') {
                lastMessage.text = fullResponseText; 
            }
            return newMessages;
        });

    } catch (error) {
        console.error("Error calling AI proxy:", error);
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
                role: 'model',
                text: "An error occurred while connecting to the AI. Check console for details."
            };
            return newMessages;
        });
    }
};
// 3. Keep the old function definition for structure, but it's now unused.
export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
    return "This function is deprecated, use streamMessageFromGemini instead.";
};