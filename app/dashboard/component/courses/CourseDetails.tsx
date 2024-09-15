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

const CourseDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );
  const currentModuleIndex = useSelector(
    (state: RootState) => state.course.currentModuleIndex
  );

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [aiResponse, setAIResponse] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email ?? "");
    }
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

  const handleNextModule = () => {
    dispatch(advanceModule());
    setCurrentLessonIndex(0);
  };

  const handlePreviousModule = () => {
    dispatch(previousModule());
    setCurrentLessonIndex(0);
  };

  const handleLessonChange = (lessonIndex: number) => {
    setCurrentLessonIndex(lessonIndex);
  };

  const handleAnswerSelected = async (answer: string) => {
    if (currentLesson?.quiz) {
      try {
        const response = await evaluateAnswer(
          currentLesson.quiz.questions[0].text,
          answer
        );
        setAIResponse(response);
      } catch (error) {
        console.error("Failed to evaluate answer", error);
        setAIResponse(null); // Handle error
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
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
                    onAnswerSelected={handleAnswerSelected}
                  />
                ))}
                {aiResponse && (
                  <div className="mt-4 p-4 border rounded-md bg-white shadow-md">
                    {aiResponse.isCorrect ? (
                      <p className="text-green-500">Correct!</p>
                    ) : (
                      <div>
                        <p className="text-red-500">
                          Incorrect. The correct answer is:{" "}
                          {aiResponse.correctAnswer}
                        </p>
                        <p>{aiResponse.explanation}</p>
                      </div>
                    )}
                    <div className="mt-2">
                      <button
                        onClick={() => alert("Ask your question here")}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        Ask a Question
                      </button>
                    </div>
                  </div>
                )}
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
          {currentModuleIndex < course.modules.length - 1 && (
            <button
              onClick={handleNextModule}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Next Module
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
