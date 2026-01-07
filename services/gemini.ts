
import { GoogleGenAI, Type } from "@google/genai";
import Bytez from "bytez.js";

// Support both Gemini API and Bytez
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BYTEZ_API_KEY = import.meta.env.VITE_BYTEZ_API_KEY;

// Prefer Bytez if available, otherwise use direct Gemini API
const useBytez = !!BYTEZ_API_KEY;
const ai = useBytez ? null : new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const bytez = useBytez ? new Bytez(BYTEZ_API_KEY) : null;

export const getNutritionAdvice = async (trimester: number, condition: string = "None") => {
  try {
    if (useBytez && bytez) {
      // Use Bytez API
      const model = bytez.model("google/gemini-2.5-pro");
      const { error, output } = await model.run([
        {
          role: "user",
          content: `Provide a daily meal plan for a pregnant woman in trimester ${trimester} with medical condition: ${condition}. Focus on Indian cuisine, high protein, and folic acid. Return 3 meals and 2 snacks in JSON format as an array of objects with keys: meal, dish, benefits.`
        }
      ]);
      
      if (error) throw new Error(error);
      return JSON.parse(output || '[]');
    } else if (ai) {
      // Use direct Gemini API
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
      return JSON.parse(response.text || '[]');
    }
    return [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getBabyInsight = async (week: number) => {
  try {
    if (useBytez && bytez) {
      // Use Bytez API
      const model = bytez.model("google/gemini-2.5-pro");
      const { error, output } = await model.run([
        {
          role: "user",
          content: `Give me 3 short, encouraging facts about a baby's development at week ${week}.`
        }
      ]);
      
      if (error) throw new Error(error);
      return output || "Your baby is growing beautifully every day!";
    } else if (ai) {
      // Use direct Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: `Give me 3 short, encouraging facts about a baby's development at week ${week}.`,
      });
      return response.text;
    }
    return "Your baby is growing beautifully every day!";
  } catch (error) {
    return "Your baby is growing beautifully every day!";
  }
};
