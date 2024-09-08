import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  advanceModule,
  previousModule,
  setModuleIndex,
} from "@/app/redux/courseSlice";
import { getProgress, saveProgress } from "@/app/redux/progressService";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { dummyCourses } from "@/app/coursesData";
import { FaRobot } from "react-icons/fa"; // AI icon

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

  // Fetch user email from Firebase auth
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  // Load progress from either local storage or Firestore when component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      if (selectedCourseId && userEmail) {
        const userProgress = await getProgress(userEmail, selectedCourseId);
        dispatch(setModuleIndex(userProgress.currentModuleIndex));
      }
    };
    fetchProgress();
  }, [selectedCourseId, userEmail, dispatch]);

  // Save progress to both local storage and Firestore when module index changes
  useEffect(() => {
    if (selectedCourseId && userEmail) {
      const progress = { currentModuleIndex };
      saveProgress(userEmail, selectedCourseId, progress);
    }
  }, [currentModuleIndex, selectedCourseId, userEmail]);

  if (!selectedCourseId)
    return (
      <div className="text-center py-10">Select a course to see details.</div>
    );

  const course = dummyCourses.find((course) => course.id === selectedCourseId);
  if (!course)
    return <div className="text-center py-10">Course not found.</div>;

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];

  const handleNextModule = () => {
    dispatch(advanceModule());
    setCurrentLessonIndex(0); // Reset lesson index when moving to the next module
  };

  const handlePreviousModule = () => {
    dispatch(previousModule());
    setCurrentLessonIndex(0); // Reset lesson index when moving to the previous module
  };

  const handleLessonChange = (lessonIndex: number) => {
    setCurrentLessonIndex(lessonIndex);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full max-w-[1200px] shadow-lg border rounded-md">
        <Link href="/courses">
          <span className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out cursor-pointer">
            Back to Course List
          </span>
        </Link>
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
                  <div key={question.id} className="mb-4">
                    <p className="font-semibold mb-2">{question.text}</p>
                    <ul className="list-disc pl-5 mb-4">
                      {question.options.map((option, index) => (
                        <li key={index} className="mb-1">
                          {option}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center">
                      <FaRobot className="text-gray-500 mr-2" />
                      <span className="text-gray-500">
                        AI will provide answers here.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={handlePreviousModule}
            disabled={currentModuleIndex === 0}
            className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-gray-400"
          >
            Previous Module
          </button>
          <button
            onClick={handleNextModule}
            disabled={currentModuleIndex === course.modules.length - 1}
            className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-gray-400"
          >
            Next Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
