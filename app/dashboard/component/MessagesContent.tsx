// export default MessagesContent;
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/app/redux/store";
// import { clearFeedback } from "@/app/redux/courseSlice";

// const MessagesContent: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const feedback = useSelector((state: RootState) => state.course.feedback); // Access feedback from Redux

//   const handleClearFeedback = () => {
//     dispatch(clearFeedback()); // Clear feedback when "Clear Feedback" button is clicked
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Messages Content</h1>

//       {/* Check if there is feedback available */}
//       {feedback ? (
//         <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//           <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
//           <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>

//           <button
//             onClick={handleClearFeedback}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
//           >
//             Clear Feedback
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-600">No feedback available.</p>
//       )}
//     </div>
//   );
// };

// export default MessagesContent;
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/app/redux/store";
// import { clearFeedback } from "@/app/redux/courseSlice";
// import axios from "axios";

// const MessagesContent: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const feedback = useSelector((state: RootState) => state.course.feedback); // Access feedback from Redux
//   const [chatHistory, setChatHistory] = useState<
//     { role: string; content: string }[]
//   >([]); // Chat history
//   const [userMessage, setUserMessage] = useState<string>(""); // User input

//   // Function to send message to AI
//   const handleSendMessage = async () => {
//     if (!userMessage.trim()) return; // Do nothing if the input is empty

//     const newChatHistory = [
//       ...chatHistory,
//       { role: "user", content: userMessage },
//     ];
//     setChatHistory(newChatHistory); // Update chat history with user's message

//     try {
//       const response = await axios.post("/api/evaluate", {
//         question: userMessage,
//         feedbackRequest: false, // This is a chat interaction
//         chatHistory: newChatHistory, // Send the current chat history
//         courseId: "your-course-id", // Modify to your course ID logic
//       });

//       const aiResponse = response.data.explanation || "AI is thinking...";
//       setChatHistory([...newChatHistory, { role: "ai", content: aiResponse }]); // Update chat with AI response
//       setUserMessage(""); // Clear input after sending
//     } catch (error) {
//       console.error("Error sending message to AI:", error);
//     }
//   };

//   const handleClearFeedback = () => {
//     dispatch(clearFeedback()); // Clear feedback when "Clear Feedback" button is clicked
//     setChatHistory([]); // Clear chat history as well
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">AI Chat and Feedback</h1>

//       {/* Display Feedback */}
//       {feedback ? (
//         <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
//           <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
//           <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>
//         </div>
//       ) : (
//         <p className="text-gray-600">No feedback available.</p>
//       )}

//       {/* Display Chat History */}
//       <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
//         <h3 className="text-lg font-bold mb-2">Chat History</h3>
//         <div className="overflow-y-auto max-h-60">
//           {chatHistory.map((chat, index) => (
//             <p
//               key={index}
//               className={
//                 chat.role === "user" ? "text-blue-600" : "text-green-600"
//               }
//             >
//               <strong>{chat.role === "user" ? "You" : "AI"}:</strong>{" "}
//               {chat.content}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Chat Input and Send Button */}
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-md"
//           placeholder="Ask the AI something..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md"
//         >
//           Send
//         </button>
//       </div>

//       <button
//         onClick={handleClearFeedback}
//         className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
//       >
//         Clear Feedback
//       </button>
//     </div>
//   );
// };

// export default MessagesContent;
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/app/redux/store';
// import { clearFeedback } from '@/app/redux/courseSlice';
// import axios from 'axios';

// const MessagesContent: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const feedback = useSelector((state: RootState) => state.course.feedback);
//   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
//   const [userMessage, setUserMessage] = useState<string>("");

//   const handleSendMessage = async () => {
//     if (!userMessage.trim()) return;
  
//     const newChatHistory = [...chatHistory, { role: 'user', content: userMessage }];
//     setChatHistory(newChatHistory);

//     try {
//       // const response = await fetch('https://api/onnx', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ userMessage })
//       // });
  
//       // if (!response.ok) {
//       //   throw new Error(`HTTP error! status: ${response.status}`);
//       // }
  
//       // const data = await response.json();
//       // const aiResponse = data.aiResponse || 'AI is thinking...';
//   // Make a request to Gemmine AI API
//   const response = await axios.post('https://api/onnx', {
//     prompt: userMessage, // Assuming 'prompt' is the required field for Gemmine AI
//     // Include any other fields required by the API
//   });

//   const aiResponse = response.data.aiResponse || 'AI is thinking...';

//   // Update chat history with AI's response
//       setChatHistory([...newChatHistory, { role: 'ai', content: aiResponse }]);
//       setUserMessage('');  // Clear input after sending
//     } catch (error) {
//       console.error('Error sending message to AI:', error);
//     }
//   };
  
  

//   const handleClearFeedback = () => {
//     dispatch(clearFeedback());
//     setChatHistory([]);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">AI Chat and Feedback</h1>

//       {/* Display Feedback */}
//       {feedback ? (
//         <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
//           <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
//           <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>
//         </div>
//       ) : (
//         <p className="text-gray-600">No feedback available.</p>
//       )}

//       {/* Display Chat History */}
//       <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
//         <h3 className="text-lg font-bold mb-2">Chat History</h3>
//         <div className="overflow-y-auto max-h-60">
//           {chatHistory.map((chat, index) => (
//             <p
//               key={index}
//               className={chat.role === 'user' ? 'text-blue-600' : 'text-green-600'}
//             >
//               <strong>{chat.role === 'user' ? 'You' : 'AI'}:</strong> {chat.content}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Chat Input and Send Button */}
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-md"
//           placeholder="Ask the AI something..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md"
//         >
//           Send
//         </button>
//       </div>

//       <button
//         onClick={handleClearFeedback}
//         className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
//       >
//         Clear Feedback
//       </button>
//     </div>
//   );
// };

// export default MessagesContent;


'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { clearFeedback } from '@/app/redux/courseSlice';

const MessagesContent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const feedback = useSelector((state: RootState) => state.course.feedback);

  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  // Reference for the worker object
  const worker = useRef<Worker | null>(null);

  // Set up the worker on component mount
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../../worker.js', import.meta.url), {
        type: 'module'
      });
      console.log("working")

    }

    // Callback function to handle messages from the worker
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'loading':
          // Update UI to show model loading progress
          console.log(`Model loading progress: ${e.data.progress}`);
          break;
        case 'complete':
          // Update chat with the classification result
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { role: 'ai', content: e.data.output[0].label }
          ]);
          break;
        case 'error':
          // Handle the error by showing it in the UI
          console.error('Error from worker:', e.data.error);
          break;
        default:
          console.warn('Unexpected message from worker:', e.data);
      }
    };
    

    worker.current.addEventListener('message', onMessageReceived);

    // Cleanup on unmount
    return () => worker.current?.removeEventListener('message', onMessageReceived);
  }, [chatHistory]);

  // Function to send the message to the worker
  const classifyMessage = useCallback((text: string) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);

  // Function to handle sending message from the user
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Do nothing if input is empty

    const newChatHistory = [...chatHistory, { role: 'user', content: userMessage }];
    setChatHistory(newChatHistory); // Update chat with user's message

    // Send the user message to the worker for classification
    classifyMessage(userMessage);

    setUserMessage(''); // Clear input after sending
  };

  // Clear feedback and chat history
  const handleClearFeedback = () => {
    dispatch(clearFeedback());
    setChatHistory([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat and Feedback</h1>

      {/* Display Feedback */}
      {feedback ? (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
          <h2 className="text-xl font-bold mb-2">AI Feedback</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{feedback}</pre>
        </div>
      ) : (
        <p className="text-gray-600">No feedback available.</p>
      )}

      {/* Display Chat History */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-lg w-full mb-4">
        <h3 className="text-lg font-bold mb-2">Chat History</h3>
        <div className="overflow-y-auto max-h-60">
          {chatHistory.map((chat, index) => (
            <p
              key={index}
              className={chat.role === 'user' ? 'text-blue-600' : 'text-green-600'}
            >
              <strong>{chat.role === 'user' ? 'You' : 'AI'}:</strong> {chat.content}
            </p>
          ))}
        </div>
      </div>

      {/* Chat Input and Send Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Ask the AI something..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={!ready}  // Disable send button if worker is not ready
        >
          {ready ? 'Send' : 'Loading...'}
        </button>
      </div>

      <button
        onClick={handleClearFeedback}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Clear Feedback
      </button>
    </div>
  );
};

export default MessagesContent;
