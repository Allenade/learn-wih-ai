// CourseList.tsx
"use client";
import React from "react";
import { selectCourse } from "@/app/redux/courseSlice";
import { dummyCourses } from "@/app/coursesData";
import { useAppDispatch } from "@/app/redux/store";

const CourseList = () => {
  const dispatch = useAppDispatch();

  const handleCourseClick = (courseId: string) => {
    dispatch(selectCourse(courseId));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full h-auto max-w-[1200px] shadow-lg border rounded-md">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {dummyCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="bg-gray-200 p-4 sm:p-6 rounded-md shadow-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-100 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {course.name}
              </h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
