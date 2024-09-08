import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { getProgress } from "@/app/redux/progressService";
import { getAuth } from "firebase/auth";

const HomeContent = () => {
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );
  const [progress, setProgress] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email || "");
    }
  }, []);

  useEffect(() => {
    if (selectedCourseId && userEmail) {
      const fetchProgress = async () => {
        const userProgress = await getProgress(userEmail, selectedCourseId);
        setProgress(userProgress);
      };

      fetchProgress();
    }
  }, [selectedCourseId, userEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Learning Journey!
        </h1>
        {userEmail && <p className="text-lg mb-4">Logged in as: {userEmail}</p>}
        {selectedCourseId ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
            <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
              <div
                style={{
                  width: `${
                    progress ? (progress.currentModuleIndex / 10) * 100 : 0
                  }%`,
                }}
                className="bg-blue-500 h-full rounded-full text-center text-white text-sm"
              >
                {progress
                  ? Math.round((progress.currentModuleIndex / 10) * 100)
                  : 0}
                %
              </div>
            </div>
            <p className="text-lg mb-6">
              Keep pushing forward and embrace every challenge!
            </p>
          </div>
        ) : (
          <p className="text-lg mb-6">
            No course selected. Get started to begin your journey!
          </p>
        )}
        <Link href="/courses">
          <span className="text-lg font-semibold text-blue-500 hover:text-blue-700 underline">
            View Available Courses
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomeContent;
