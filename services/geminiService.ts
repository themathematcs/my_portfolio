import { GoogleGenAI } from "@google/genai";
import { ABOUT_ME, SKILLS, CERTIFICATIONS, PROJECTS, CONTACT_INFO } from '../constants';

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Christian Nganga's portfolio website. 
Christian is a 23-year-old AI/Machine Learning Engineer based in Nairobi, Kenya.

Here is his profile data:
Bio: ${ABOUT_ME}
Skills: ${JSON.stringify(SKILLS)}
Certifications: ${JSON.stringify(CERTIFICATIONS)}
Projects: ${JSON.stringify(PROJECTS)}
Contact: ${JSON.stringify(CONTACT_INFO)}

Your goal is to answer visitor questions about Christian's experience, skills, and background professionally and concisely.
If asked about contact info, provide it.
If asked about specific skills (like Python or TensorFlow), highlight his projects or certifications that use them.
Adopt a friendly, tech-savvy persona. 
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm currently offline (API Key missing). Please contact Christian directly via email.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for speed and efficiency in a chat context
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my neural network. Please try again later.";
  }
};
