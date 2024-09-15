import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not defined");
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();
    const prompt = `Evaluate the following answer to the question: "${question}". The answer provided is: "${answer}". Provide feedback on whether it is correct or incorrect, the correct answer, and an explanation.`;

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();

    console.log("Response Text:", responseText); // Add logging here

    const [
      isCorrectText,
      correctAnswerText,
      explanationText,
    ] = responseText.split("\n");
    const isCorrect = isCorrectText.includes("correct");

    return NextResponse.json({
      isCorrect,
      correctAnswer: correctAnswerText.replace("Correct answer: ", ""),
      explanation: explanationText.replace("Explanation: ", ""),
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
