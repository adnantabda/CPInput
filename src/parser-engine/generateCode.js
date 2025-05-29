import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "API_KEY"});

export async function generateWithGoogle(lines, lang) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Follow this Instructions strictly Convert this ${lines} to ${lang} code line by line. 
               Return only the pure code without any markdown syntax, 
               without comments, and with proper indentation. Combine all code into 
               one continuous block. generate the part that takes only the input`,
      config: {
      systemInstruction: `You are an expert competitive programming assistant. Your task is to generate only valid and properly indented ${lang} code for taking input. Do not include comments, markdown formatting, explanations, or print statements.`,
      temperature: 0.1,
      topP: 0.95,
      maxOutputTokens: 512,
    },
  });
  
  let cleanCode = response.text.replace(/```.*?\n/g, '')
                               .replace(/#.*?\n/g, '')
                               .trim()
                               .trim("\`\`\`");   
  cleanCode = cleanCode.replace(/^```|```$/g, '');   
  return cleanCode;
}