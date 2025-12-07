
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

import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "./types";
// 1. 🟢 IMPORT THE DATA FROM THE CONSTANTS FILE 
import { ABOUT_ME, SKILLS, CERTIFICATIONS, PROJECTS } from '../constants'; 

// --- 1. SECURELY GET THE API KEY ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey });
const model = "gemini-2.5-flash"; 

// --- PORTFOLIO KNOWLEDGE BASE ---
// 2. 🟢 CONSTRUCT THE KNOWLEDGE BASE DYNAMICALLY
const PORTFOLIO_CONTEXT = `
ABOUT ME: ${ABOUT_ME}

SKILLS: 
${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

CERTIFICATIONS (Kaggle & Simplilearn, 2025):
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}): ${c.description}`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `- ${p.title} (${p.type}, ${p.technologies.join(', ')}): ${p.description}`).join('\n')}
`;


// 3. Define the new streaming function
export const streamMessageFromGemini = async (
    userMessage: string, 
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) => {
    try {
        const response = await ai.models.generateContentStream({
            model: model,
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            // 4. 🟢 Use the constructed PORTFOLIO_CONTEXT in the System Instruction
            config: {
                systemInstruction: `You are Christian's personal AI assistant. Your sole purpose is to answer questions about Christian's skills, experience, projects, and certifications. Always refer to Christian in the third person. Base your answers ONLY on the following knowledge provided to you: ${PORTFOLIO_CONTEXT}`
            }
        });

        // Loop through the stream chunks
        let fullResponseText = "";
        for await (const chunk of response) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullResponseText += chunkText;
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    const lastMessage = newMessages[newMessages.length - 1];
                    
                    if (lastMessage.role === 'model') {
                        lastMessage.text = fullResponseText; 
                    }
                    return newMessages;
                });
            }
        }
    } catch (error) {
        console.error("Error streaming response from Gemini:", error);
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
                role: 'model',
                text: "An error occurred while connecting to the AI. Please try again."
            };
            return newMessages;
        });
    }
};

// 3. Keep the old function definition for structure, but it's now unused.
export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
    return "This function is deprecated, use streamMessageFromGemini instead.";
};