// data/dummyData.ts

import { Course } from "@/app/types";

export const dummyCourses: Course[] = [
  {
    id: "1",
    name: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript.",
    difficulty: "Beginner",
    modules: [
      {
        id: "1",
        title: "Introduction to JavaScript",
        description: "Understand the basics of JavaScript.",
        lessons: [
          {
            id: "1",
            title: "What is JavaScript?",
            content:
              "JavaScript is a programming language used to create dynamic and interactive web content.",
            quiz: {
              questions: [
                {
                  id: "1",
                  text: "What is JavaScript?",
                  options: [
                    "A programming language",
                    "A database",
                    "A framework",
                  ],
                  correctAnswer: "A programming language",
                },
              ],
            },
          },
          {
            id: "2",
            title: "JavaScript Variables",
            content: "Learn about variables and data types in JavaScript.",
            quiz: {
              questions: [
                {
                  id: "2",
                  text: "What are variables in JavaScript?",
                  options: ["Containers for data", "Functions", "Objects"],
                  correctAnswer: "Containers for data",
                },
              ],
            },
          },
        ],
      },
      {
        id: "2",
        title: "JavaScript Control Structures",
        description:
          "Learn about loops and conditional statements in JavaScript.",
        lessons: [
          {
            id: "3",
            title: "If Statements",
            content:
              "Understand how to use if statements to control the flow of code.",
            quiz: {
              questions: [
                {
                  id: "3",
                  text: "What does an if statement do?",
                  options: [
                    "Executes code based on a condition",
                    "Declares a variable",
                    "Creates a loop",
                  ],
                  correctAnswer: "Executes code based on a condition",
                },
              ],
            },
          },
        ],
      },
      {
        id: "3",
        title: "JavaScript Functions",
        description: "In-depth exploration of functions in JavaScript.",
        lessons: [
          {
            id: "4",
            title: "Defining and Using Functions",
            content: "Learn how to define and invoke functions in JavaScript.",
            quiz: {
              questions: [
                {
                  id: "4",
                  text: "How do you define a function in JavaScript?",
                  options: [
                    "function myFunction()",
                    "createFunction()",
                    "function = new Function()",
                  ],
                  correctAnswer: "function myFunction()",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Python for Beginners",
    description: "An introduction to Python programming.",
    difficulty: "Beginner",
    modules: [
      {
        id: "4",
        title: "Getting Started with Python",
        description: "Basics of Python programming.",
        lessons: [
          {
            id: "5",
            title: "Python Syntax",
            content: "Learn the syntax and structure of Python programming.",
            quiz: {
              questions: [
                {
                  id: "5",
                  text: "What is the correct syntax for printing in Python?",
                  options: ["print()", "echo()", "console.log()"],
                  correctAnswer: "print()",
                },
              ],
            },
          },
        ],
      },
      {
        id: "5",
        title: "Python Data Types",
        description: "Understand the different data types in Python.",
        lessons: [
          {
            id: "6",
            title: "Strings and Numbers",
            content: "Learn how to work with strings and numbers in Python.",
            quiz: {
              questions: [
                {
                  id: "6",
                  text: "How do you convert a string to an integer in Python?",
                  options: ["int()", "str()", "float()"],
                  correctAnswer: "int()",
                },
              ],
            },
          },
        ],
      },
      {
        id: "6",
        title: "Python Control Structures",
        description: "Learn how to use if statements and loops in Python.",
        lessons: [
          {
            id: "7",
            title: "If Statements in Python",
            content:
              "Learn how to write conditional logic using if statements in Python.",
            quiz: {
              questions: [
                {
                  id: "7",
                  text: "What does an if statement do in Python?",
                  options: [
                    "Executes code based on a condition",
                    "Declares a variable",
                    "Creates a loop",
                  ],
                  correctAnswer: "Executes code based on a condition",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Advanced JavaScript",
    description: "Dive deeper into JavaScript for advanced topics.",
    difficulty: "Advanced",
    modules: [
      {
        id: "7",
        title: "JavaScript Closures",
        description:
          "Learn about closures and their applications in JavaScript.",
        lessons: [
          {
            id: "8",
            title: "Understanding Closures",
            content: "Learn what closures are and how to use them.",
            quiz: {
              questions: [
                {
                  id: "8",
                  text: "What is a closure in JavaScript?",
                  options: [
                    "A function that remembers its lexical scope",
                    "A method inside a class",
                    "A type of array",
                  ],
                  correctAnswer: "A function that remembers its lexical scope",
                },
              ],
            },
          },
        ],
      },
      {
        id: "8",
        title: "JavaScript Promises",
        description: "Learn about promises for handling asynchronous code.",
        lessons: [
          {
            id: "9",
            title: "Using Promises",
            content:
              "Understand how to create and work with promises in JavaScript.",
            quiz: {
              questions: [
                {
                  id: "9",
                  text: "What does a promise represent in JavaScript?",
                  options: [
                    "A placeholder for a future value",
                    "A loop that runs infinitely",
                    "A new type of variable",
                  ],
                  correctAnswer: "A placeholder for a future value",
                },
              ],
            },
          },
        ],
      },
      {
        id: "9",
        title: "Async/Await",
        description:
          "Learn how to simplify asynchronous code using async/await.",
        lessons: [
          {
            id: "10",
            title: "Using Async/Await",
            content:
              "Learn how to use async/await for handling asynchronous operations.",
            quiz: {
              questions: [
                {
                  id: "10",
                  text: "What does async/await do in JavaScript?",
                  options: [
                    "Simplifies working with promises",
                    "Creates new variables",
                    "Runs code synchronously",
                  ],
                  correctAnswer: "Simplifies working with promises",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
