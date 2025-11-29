import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize client only when needed to avoid early env check failures if key is missing initially
const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  const client = getClient();
  
  if (!client) {
    throw new Error("Gemini API Key not configured. Please set GEMINI_API_KEY in your .env file.");
  }

  // We use a stateless approach for simplicity here, or we can use the chat session.
  // Given the requirement for a "persona", we will use generateContent with a system instruction.
  // We'll append the user's message to a chat structure.

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: h.parts
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: RESUME_CONTEXT,
        temperature: 0.7, // A bit creative but grounded
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};
