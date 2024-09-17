import React, { useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  courseId: string; // Now passing courseId for the AI lookup
  onAnswerSelected: (
    selectedOption: string,
    courseId: string
  ) => Promise<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null>; // Make sure it can return null
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  courseId,
  onAnswerSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [aiResponse, setAIResponse] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setErrorMessage(""); // Clear error message on new selection
  };

  //   const handleSubmit = async () => {
  //     if (!selectedOption) {
  //       alert("Please select an option before submitting.");
  //       return;
  //     }

  //     try {
  //       // AI checks the question, courseId, and selected answer every time the user submits
  //       const response = await onAnswerSelected(selectedOption, courseId); // Pass courseId

  //       // Check if the response is null or undefined
  //       if (!response) {
  //         setErrorMessage(
  //           "Failed to get a response from the AI. Please try again."
  //         );
  //         return;
  //       }

  //       setAIResponse(response);

  //       // If answer is correct or after 2 wrong attempts, show correct answer
  //       if (response.isCorrect) {
  //         setQuizCompleted(true);
  //       } else {
  //         setAttempts(attempts + 1);

  //         // After 2 wrong attempts, show the correct answer and explanation
  //         if (attempts >= 1) {
  //           setQuizCompleted(true);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to evaluate the answer:", error);
  //       setErrorMessage(
  //         "An error occurred while evaluating your answer. Please try again."
  //       );
  //     }
  //   };

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }

    console.log("Selected Option:", selectedOption);
    console.log("Question:", question);
    console.log("Course ID:", courseId);

    try {
      // AI checks the question, courseId, and selected answer every time the user submits
      const response = await onAnswerSelected(selectedOption, courseId); // Pass courseId

      // Check if the response is null or undefined
      if (!response) {
        setErrorMessage(
          "Failed to get a response from the AI. Please try again."
        );
        return;
      }

      setAIResponse(response);

      // If answer is correct or after 2 wrong attempts, show correct answer
      if (response.isCorrect) {
        setQuizCompleted(true);
      } else {
        setAttempts(attempts + 1);

        // After 2 wrong attempts, show the correct answer and explanation
        if (attempts >= 1) {
          setQuizCompleted(true);
        }
      }
    } catch (error) {
      console.error("Failed to evaluate the answer:", error);
      setErrorMessage(
        "An error occurred while evaluating your answer. Please try again."
      );
    }
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{question}</h4>
      {options.map((option, index) => (
        <label key={index} className="block mb-2">
          <input
            type="radio"
            name="quiz-option"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {!quizCompleted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      )}

      {aiResponse && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-md">
          {aiResponse.isCorrect ? (
            <p className="text-green-500">Correct!</p>
          ) : attempts < 2 ? (
            <p className="text-red-500">Incorrect. Please try again.</p>
          ) : (
            <div>
              <p className="text-red-500">
                Incorrect. The correct answer is: {aiResponse.correctAnswer}
              </p>
              <p>{aiResponse.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
