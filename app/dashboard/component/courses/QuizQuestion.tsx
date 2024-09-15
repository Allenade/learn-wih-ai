import React, { useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswerSelected: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  onAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleOptionClick = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerSelected(answer); // Pass the selected answer to the parent component
  };

  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{question}</p>
      <ul className="list-disc pl-5 mb-4">
        {options.map((option, index) => (
          <li
            key={index}
            className={`cursor-pointer mb-1 ${
              selectedAnswer === option ? "bg-gray-200" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
