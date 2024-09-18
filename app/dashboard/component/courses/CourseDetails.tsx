import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  advanceModule,
  previousModule,
  setModuleIndex,
  selectCourse,
} from "@/app/redux/courseSlice";
import { getAuth } from "firebase/auth";
import { dummyCourses } from "@/app/coursesData";
import QuizQuestion from "./QuizQuestion";
import {
  getProgressFromLocalStorage,
  saveProgressToLocalStorage,
} from "@/app/redux/progressUtils";
import { evaluateAnswer } from "@/app/redux/geminiAiService";
import axios from "axios";

// Define the prop types for FeedbackModal
interface FeedbackModalProps {
  show: boolean;
  feedback: string;
  onClose: () => void;
}

// Modal component for showing AI feedback
const FeedbackModal: React.FC<FeedbackModalProps> = ({
  show,
  feedback,
  onClose,
}) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }} // Ensure it's on top
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
        {/* Add max height to make the modal scrollable when content is large */}
        <h2 className="text-2xl font-bold mb-4">
          AI Feedback on Your Performance
        </h2>
        <pre className="whitespace-pre-wrap">{feedback}</pre>{" "}
        {/* Ensures line breaks */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CourseDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );
  const currentModuleIndex = useSelector(
    (state: RootState) => state.course.currentModuleIndex
  );

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0); // Track attempts
  const [aiFeedbackReceived, setAiFeedbackReceived] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // Modal state
  const [feedback, setFeedback] = useState<string>(""); // Feedback text
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Track correct answers
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0); // Track incorrect answers
  const [startTime, setStartTime] = useState<number>(Date.now()); // Track start time

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email ?? "");
    }
    setStartTime(Date.now()); // Start time for tracking course completion
  }, []);

  useEffect(() => {
    if (selectedCourseId && userEmail) {
      const progress = getProgressFromLocalStorage(userEmail, selectedCourseId);
      if (progress !== null) {
        dispatch(setModuleIndex(progress));
      }
    }
  }, [selectedCourseId, userEmail, dispatch]);

  useEffect(() => {
    if (selectedCourseId && userEmail !== null) {
      saveProgressToLocalStorage(
        userEmail,
        selectedCourseId,
        currentModuleIndex
      );
    }
  }, [currentModuleIndex, selectedCourseId, userEmail]);

  if (!selectedCourseId)
    return (
      <div className="text-center py-10">
        <button
          onClick={() => dispatch(selectCourse(null))}
          className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          Back to Course List
        </button>
      </div>
    );

  const course = dummyCourses.find((course) => course.id === selectedCourseId);
  if (!course)
    return <div className="text-center py-10">Course not found.</div>;

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

  const handleAnswerSelected = async (
    selectedOption: string,
    courseId: string
  ) => {
    if (currentLesson?.quiz) {
      try {
        // Call the AI to evaluate the selected answer, passing courseId
        const response = await evaluateAnswer(
          currentLesson.quiz.questions[0].text, // Send question to AI
          selectedOption, // Send user's selected option
          courseId // Pass the course ID to the AI
        );

        // Increment attempt count
        setAttempts(attempts + 1);

        if (response.isCorrect) {
          setCorrectAnswers(correctAnswers + 1); // Increment correct answers
          setQuizCompleted(true); // Mark quiz as completed
        } else {
          setIncorrectAnswers(incorrectAnswers + 1); // Increment incorrect answers
          if (attempts >= 1) {
            setAiFeedbackReceived(true); // If failed twice, show AI feedback
            setQuizCompleted(true); // Mark quiz as completed
          }
        }

        return response; // Return the AI evaluation result
      } catch (error) {
        console.error("Failed to evaluate answer", error);
        return null;
      }
    }
  };

  const handleNextModule = async () => {
    if (quizCompleted || aiFeedbackReceived) {
      // Check if this is the last module and lesson
      if (
        currentModuleIndex === course.modules.length - 1 &&
        currentLessonIndex === currentModule.lessons.length - 1
      ) {
        // Generate AI feedback for the user
        const finalFeedback = await generateAiFeedback(course.name);
        setFeedback(finalFeedback); // Store feedback in state
        setShowModal(true); // Show feedback modal
      } else {
        dispatch(advanceModule());
        setCurrentLessonIndex(0);
        setQuizCompleted(false);
        setAttempts(0);
      }
    } else {
      alert("Please complete the quiz or see AI feedback before proceeding.");
    }
  };

  const handlePreviousModule = () => {
    dispatch(previousModule());
    setCurrentLessonIndex(0);
  };

  // Updated generateAiFeedback function to request personalized AI feedback
  const generateAiFeedback = async (courseName: string) => {
    const totalTimeSpent = (Date.now() - startTime) / 1000; // Time spent in seconds

    // Ensure the email, course name, and scores are included in the feedback
    const prompt = `Provide detailed feedback for the user with email "${userEmail}" who completed the course "${courseName}". The user completed the course in ${totalTimeSpent.toFixed(
      2
    )} seconds. They answered ${correctAnswers} questions correctly and ${incorrectAnswers} questions incorrectly. Evaluate their progress, suggest areas for improvement, and provide advice on how they can improve. Format the response neatly with line breaks.`;

    try {
      // Request AI feedback from the backend
      const response = await axios.post("/api/evaluate", {
        question: prompt,
        courseId: selectedCourseId,
        feedbackRequest: true,
      });

      return (
        response.data.explanation || "Thank you for completing the course!"
      );
    } catch (error) {
      console.error("Failed to generate AI feedback", error);
      return "An error occurred while generating your feedback. Please try again.";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      {/* Feedback Modal */}
      <FeedbackModal
        show={showModal}
        feedback={feedback}
        onClose={() => setShowModal(false)}
      />

      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full max-w-[1200px] shadow-lg border rounded-md mx-auto">
        <button
          onClick={() => dispatch(selectCourse(null))}
          className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          Back to Course List
        </button>
        <h1 className="text-3xl font-bold mb-6">{course.name}</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {currentModule.title}
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          {currentModule.description}
        </p>
        {currentLesson && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {currentLesson.title}
            </h3>
            <p className="text-gray-700 mb-4">{currentLesson.content}</p>
            {currentLesson.quiz && (
              <div>
                <h4 className="text-md font-semibold mb-2">Quiz</h4>
                {currentLesson.quiz.questions.map((question) => (
                  <QuizQuestion
                    key={question.id}
                    question={question.text}
                    options={question.options}
                    courseId={selectedCourseId}
                    onAnswerSelected={handleAnswerSelected}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between w-full">
          {currentModuleIndex > 0 && (
            <button
              onClick={handlePreviousModule}
              className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Previous Module
            </button>
          )}
          <button
            onClick={handleNextModule}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {currentModuleIndex === course.modules.length - 1 &&
            currentLessonIndex === currentModule.lessons.length - 1
              ? "Finish Course"
              : "Next Module"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
