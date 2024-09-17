// import axios from "axios";

// // Service to evaluate the user's answer using the AI API
// export const evaluateAnswer = async (
//   question: string,
//   answer: string,
//   courseId: string
// ) => {
//   try {
//     const response = await axios.post("/api/evaluate", {
//       question,
//       answer,
//       courseId,
//     });

//     return response.data; // Return the AI response data
//   } catch (error) {
//     console.error("Error in evaluateAnswer function:", error);
//     throw error;
//   }
// };
// import axios from "axios";

// // Service to evaluate the user's answer using the AI API
// export const evaluateAnswer = async (
//   question: string,
//   answer: string,
//   courseId: string
// ) => {
//   try {
//     console.log("Sending to API - Question:", question);
//     console.log("Sending to API - Answer:", answer);
//     console.log("Sending to API - Course ID:", courseId);

//     const response = await axios.post("/api/evaluate", {
//       question,
//       answer,
//       courseId,
//     });

//     return response.data; // Return the AI response data
//   } catch (error) {
//     console.error("Error in evaluateAnswer function:", error);
//     throw error;
//   }
// };
import axios from "axios";

// Service to evaluate the user's answer using the AI API
export const evaluateAnswer = async (
  question: string,
  answer: string,
  courseId: string
) => {
  try {
    // Log the values to ensure they are being passed correctly
    console.log("Sending to API - Question:", question);
    console.log("Sending to API - Answer:", answer);
    console.log("Sending to API - Course ID:", courseId);

    const response = await axios.post("/api/evaluate", {
      question,
      answer,
      courseId,
    });

    return response.data; // Return the AI response data
  } catch (error) {
    console.error("Error in evaluateAnswer function:", error);
    throw error; // Propagate the error so it can be handled in the UI
  }
};
