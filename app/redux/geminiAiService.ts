// export const evaluateAnswer = async (question: string, answer: string) => {
//   try {
//     const response = await fetch("/api/evaluate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ question, answer }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to evaluate answer", error);
//     throw error;
//   }
// };
// geminiAiService.ts
import axios from "axios";

export const evaluateAnswer = async (question: string, answer: string) => {
  try {
    const response = await axios.post("/api/evaluate", { question, answer });
    return response.data;
  } catch (error) {
    console.error("Error evaluating answer", error);
    throw error;
  }
};
