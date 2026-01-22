

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