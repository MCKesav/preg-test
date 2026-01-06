
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getNutritionAdvice = async (trimester: number, condition: string = "None") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `Provide a daily meal plan for a pregnant woman in trimester ${trimester} with medical condition: ${condition}. Focus on Indian cuisine, high protein, and folic acid. Return 3 meals and 2 snacks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              meal: { type: Type.STRING },
              dish: { type: Type.STRING },
              benefits: { type: Type.STRING }
            },
            required: ["meal", "dish", "benefits"]
          }
        }
      }
    });
    // Fix: Using the .text property directly instead of a method or nested object.
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getBabyInsight = async (week: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `Give me 3 short, encouraging facts about a baby's development at week ${week}.`,
    });
    // Fix: Using the .text property directly.
    return response.text;
  } catch (error) {
    return "Your baby is growing beautifully every day!";
  }
};
