export const CLAUDE_PROMPTS = {
  system: "You are a professional translation capable of translating between multiple languages.",
  role: "user",
  content: (from: string, to: string, text: string) => {
    return `Translate the following source text from {from_language: ${from.length === 0 ? "undetected" : from}} to {to_language: ${to}}. If the from_language is empty or null, just neglect that variable and auto detect the input language. Return result only. source text: ${text}. Please return the translated result only.`;
  },
};