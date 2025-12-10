import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemma-3-27b",
  "gemma-3-12b"
];

const questionSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      text: { type: Type.STRING, description: "The question text" },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "Unique ID for option (e.g., 'A')" },
            text: { type: Type.STRING, description: "The answer option text" },
          },
          required: ["id", "text"],
        },
      },
      correctOptionId: { type: Type.STRING, description: "The ID of the correct option" },
    },
    required: ["id", "text", "options", "correctOptionId"],
  },
};

const generateWithFallback = async (prompt, schema = null, temperature = 0.7) => {
  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    try {
      const config = {
        model,
        contents: prompt,
        config: {
          temperature,
        }
      };

      if (schema) {
        config.config.responseMimeType = "application/json";
        config.config.responseSchema = schema;
      }

      const response = await ai.models.generateContent(config);
      const text = response.text;
      
      if (!text) throw new Error("No data returned");
      return text;
      
    } catch (error) {
      if (i === MODELS.length - 1) throw error;
    }
  }
};

export const generateQuizQuestions = async (topic) => {
  try {
    const prompt = `Generate 5 high-quality, engaging multiple-choice questions about "${topic}".
      
      Guidelines:
      1. Difficulty: Intermediate to Advanced. Avoid trivial or obvious questions.
      2. Style: Focus on scenarios, application of concepts, or interesting facts rather than simple definitions.
      3. Structure: Ensure questions are clear and unambiguous.
      4. Options: Provide exactly 4 distinct options per question. One must be clearly correct, and the other three should be plausible distractors.
      5. Variety: Cover diverse aspects of the topic to test comprehensive knowledge.`;

    const text = await generateWithFallback(prompt, questionSchema);
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate quiz. Please try a different topic.");
  }
};

export const generateQuizFeedback = async (topic, score, total) => {
  try {
    const prompt = `The user took a quiz on "${topic}" and scored ${score} out of ${total}. 
      Provide a witty, helpful, and concise feedback message (max 2 sentences). 
      If the score is low, be encouraging and suggest a key area to study. 
      If the score is high, be congratulatory and mention a specific advanced concept related to the topic they might enjoy next.`;

    return await generateWithFallback(prompt);
  } catch (error) {
    console.error(error);
    return "Quiz completed! (Feedback unavailable)";
  }
};
