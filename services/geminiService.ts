
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