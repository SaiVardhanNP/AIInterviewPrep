import { GoogleGenAI } from "@google/genai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Invalid request data" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    // console.log(response.candidates[0].content.parts[0].text);
    const rawText = response.candidates[0].content.parts[0].text;
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating interview questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing the question." });
    }
    const prompt = conceptExplainPrompt(question);
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const rawText = response.candidates[0].content.parts[0].text;
    const cleanedText=rawText
    .replace(/^```json\s*/,"")
    .replace(/```$/,"")
    .trim()

    const data=JSON.parse(cleanedText);
    res.status(200).json(data); 
  } catch (error) {
    console.error("Error generating concept explanation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
