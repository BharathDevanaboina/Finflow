
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Goal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-flash-preview';

export const parseDecisionIntent = async (
  input: string, 
  context: {
    balance: number,
    projected90d: number,
    goals: Goal[],
    fixedExpenses: number
  }
): Promise<{
  intent: 'DECISION_ANALYSIS' | 'ADD_TRANSACTION' | 'CHAT';
  analysis?: string;
  textResponse: string;
  actionableData?: any;
}> => {
  const systemInstruction = `
    You are a Financial Decision-Support Assistant. 
    PRINCIPLES:
    1. Focus on the PRESENT decision (e.g., "Should I buy this phone?").
    2. Explain FORWARD-LOOKING IMPACT for 30, 60, and 90 days.
    3. Make trade-offs EXPLICIT (e.g., "X delays your goal Y by 2 weeks").
    4. Use reflective questions to slow down impulsive spending.
    5. Suggest 2-3 supportive alternatives (delay, reduce, partial pay).
    6. Tone: Calm, premium, emotionally safe. No red alerts or shaming.

    CURRENT USER DATA:
    - Current Balance: ₹${context.balance}
    - 90-day Projected Surplus: ₹${context.projected90d}
    - Active Goals: ${context.goals.map(g => g.name + " (Target: ₹" + g.targetAmount + ")").join(", ")}
    - Monthly Commitments: ₹${context.fixedExpenses}

    RESPONSE FORMAT (JSON):
    {
      "intent": "DECISION_ANALYSIS" | "ADD_TRANSACTION" | "CHAT",
      "analysis": "Markdown analysis following the principles",
      "textResponse": "A short, encouraging summary of the analysis",
      "actionableData": {} 
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: input,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Decision Lab Error:", error);
    return {
      intent: 'CHAT',
      textResponse: "I'm reflecting on your data. Let's look at this decision calmly. Could you rephrase that?"
    };
  }
};
