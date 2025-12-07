// import { GoogleGenAI } from "@google/genai";
// import { ABOUT_ME, SKILLS, CERTIFICATIONS, PROJECTS, CONTACT_INFO } from '../constants';

// const SYSTEM_INSTRUCTION = `
// You are an AI assistant for Christian Nganga's portfolio website. 
// Christian is a 23-year-old AI/Machine Learning Engineer based in Nairobi, Kenya.

// Here is his profile data:
// Bio: ${ABOUT_ME}
// Skills: ${JSON.stringify(SKILLS)}
// Certifications: ${JSON.stringify(CERTIFICATIONS)}
// Projects: ${JSON.stringify(PROJECTS)}
// Contact: ${JSON.stringify(CONTACT_INFO)}

// Your goal is to answer visitor questions about Christian's experience, skills, and background professionally and concisely.
// If asked about contact info, provide it.
// If asked about specific skills (like Python or TensorFlow), highlight his projects or certifications that use them.
// Adopt a friendly, tech-savvy persona. 
// `;

// export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
//   try {
//     const apiKey = process.env.API_KEY;
//     if (!apiKey) {
//       return "I'm currently offline (API Key missing). Please contact Christian directly via email.";
//     }

//     const ai = new GoogleGenAI({ apiKey });
    
//     // Using flash model for speed and efficiency in a chat context
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: userMessage,
//       config: {
//         systemInstruction: SYSTEM_INSTRUCTION,
//       }
//     });

//     return response.text || "I didn't catch that. Could you rephrase?";
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "I'm having trouble connecting to my neural network. Please try again later.";
//   }
// };
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "./types";

// --- 1. SECURELY GET THE API KEY ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey });
const model = "gemini-2.5-flash"; // Efficient model for chat

// 2. Define the new streaming function
export const streamMessageFromGemini = async (
    userMessage: string, 
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) => {
    try {
        const response = await ai.models.generateContentStream({
            model: model,
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
        });

        // Loop through the stream chunks
        for await (const chunk of response) {
            const chunkText = chunk.text;

            if (chunkText) {
                // Update the last (empty) model message with the new chunk text
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    const lastMessage = newMessages[newMessages.length - 1];
                    
                    // Ensure the last message is a 'model' message before updating
                    if (lastMessage.role === 'model') {
                        lastMessage.text += chunkText;
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