import { GoogleGenAI } from "@google/genai";
import { PROPOSAL_PROMPT_TEMPLATE } from '../constants';
import type { ProposalInputs } from '../types';

// FIX: Aligned with Gemini API coding guidelines.
// The Gemini API client is initialized directly with `process.env.API_KEY`
// with the assumption that it is always provided in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProposal = async (inputs: ProposalInputs): Promise<string> => {
  // Per coding guidelines, we assume API_KEY is configured, so no need for a check.
  const prompt = PROPOSAL_PROMPT_TEMPLATE(inputs);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating proposal:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the proposal: ${error.message}`;
    }
    return "An unknown error occurred while generating the proposal.";
  }
};
