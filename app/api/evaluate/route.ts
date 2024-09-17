import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dummyCourses } from "@/app/coursesData"; // Import course data

const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyDZs8k3GizX_3pNv0KDj5lOTH9Q8dhMh1Q";

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
    console.log("POST request received at /api/evaluate");

    // Parse the request body to get the data
    const body = await req.json();
    const { question, answer, courseId } = body;

    // Log the incoming data for debugging
    console.log("Received data from client:", { question, answer, courseId });

    // Validate incoming fields
    if (!question || !answer || !courseId) {
      console.error("Missing required fields:", { question, answer, courseId });
      return NextResponse.json(
        {
          error: "Missing required fields: question, answer, or courseId",
        },
        { status: 400 }
      );
    }

    // Find the course by courseId
    const course = dummyCourses.find((course) => course.id === courseId);
    if (!course) {
      console.error(`Course with id "${courseId}" not found.`);
      return NextResponse.json(
        {
          error: `Course with id "${courseId}" not found.`,
        },
        { status: 404 }
      );
    }

    let correctAnswer = "";
    let explanation = "";
    let found = false;

    // Search for the correct answer in the course's lessons and modules
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        lesson.quiz?.questions.forEach((quizQuestion) => {
          if (quizQuestion.text === question) {
            correctAnswer = quizQuestion.correctAnswer;
            explanation = lesson.content; // Use lesson content for explanation
            found = true;
          }
        });
      });
    });

    if (!found) {
      console.error(
        `Question "${question}" not found in course "${courseId}".`
      );
      return NextResponse.json(
        {
          error: `Question "${question}" not found in course "${courseId}".`,
        },
        { status: 404 }
      );
    }

    // Log the correct answer and explanation
    console.log("Correct Answer Found:", correctAnswer);
    console.log("Explanation:", explanation);

    // If the answer is correct, return immediately
    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      console.log("Answer is correct.");
      return NextResponse.json({
        isCorrect: true,
        correctAnswer,
        explanation: "Your answer is correct!",
      });
    }

    // Otherwise, use the AI to explain why the answer is wrong
    const prompt = `Evaluate the following answer to the question: "${question}". The provided answer is: "${answer}". The correct answer is: "${correctAnswer}". Provide feedback on why the answer is wrong and offer an explanation based on the lesson content: "${explanation}".`;

    console.log("Sending prompt to AI:", prompt);

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    // Log the result of the AI call
    console.log("Received response from AI:", result);

    if (!result || !result.response) {
      throw new Error("Failed to get a valid response from the AI.");
    }

    const responseText = await result.response.text();

    // Log the AI response text
    console.log("AI response text:", responseText);

    // Parse the AI response and return it
    const responseLines = responseText
      .trim()
      .split("\n")
      .filter(Boolean);
    if (responseLines.length < 2) {
      console.error("Invalid AI response format.");
      throw new Error("Invalid AI response format.");
    }

    const explanationText = responseLines.slice(1).join(" ");

    console.log("Returning final response to client.");
    return NextResponse.json({
      isCorrect: false,
      correctAnswer,
      explanation: explanationText.trim() || explanation.trim(),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error evaluating answer:", error.message);
      return NextResponse.json(
        { error: "Failed to evaluate answer", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
