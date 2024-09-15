"use client";

import React, { useEffect, useState } from "react";
import { selectCourse } from "@/app/redux/courseSlice";
import { dummyCourses } from "@/app/coursesData";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getProgress, updateCourseProgress } from "@/app/redux/progressService";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const [courseProgress, setCourseProgress] = useState<{
    [key: string]: number;
  }>({});
  const userEmail = useAppSelector((state) => state.auth.userEmail); // Assumes userEmail is managed in authSlice

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const progressData: { [key: string]: number } = {};
        for (const course of dummyCourses) {
          const progress = await getProgress(userEmail, course.id);
          progressData[course.id] = (progress.currentModuleIndex / 10) * 100; // Assuming 10 modules
        }
        setCourseProgress(progressData);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    if (userEmail) {
      fetchCourseProgress();
    }
  }, [userEmail]);

  const handleCourseClick = (courseId: string) => {
    dispatch(selectCourse(courseId));
    // Optionally, update course progress if needed
    // updateCourseProgress(userEmail, courseId, 1); // Replace with actual progress update logic
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full h-auto max-w-[1200px] shadow-lg border rounded-md">
        <h1 className="text-3xl font-bold mb-6">Course List</h1>
        <ul className="space-y-4">
          {dummyCourses.map((course) => (
            <li key={course.id} className="p-4 bg-gray-50 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <button
                onClick={() => handleCourseClick(course.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                View Details
              </button>
              {courseProgress[course.id] && (
                <p className="mt-2 text-gray-500">
                  Progress: {courseProgress[course.id].toFixed(2)}%
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseList;
