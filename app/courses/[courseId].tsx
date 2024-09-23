// import { GetServerSideProps } from "next";
// import React, { useEffect, useState } from "react";
// import { auth } from "../firebase/firebase-config";

// interface Props {
//   courseId: string;
// }

// const CoursePage: React.FC<Props> = ({ courseId }) => {
//   const [progress, setProgress] = useState<{ currentModuleIndex: number }>({
//     currentModuleIndex: 0,
//   });
//   const [loading, setLoading] = useState<boolean>(true); // State to track loading

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const user = auth.currentUser;
//         const email = user ? user.email : null;
//         const progress = await getProgress(email, courseId);
//         setProgress(progress);
//       } catch (error) {
//         console.error("Error fetching progress:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProgress();
//   }, [courseId]);

//   const handleProgressChange = async (newProgress: {
//     currentModuleIndex: number;
//   }) => {
//     setProgress(newProgress);
//     try {
//       const user = auth.currentUser;
//       const email = user ? user.email : null;
//       await saveProgress(email, courseId, newProgress);
//     } catch (error) {
//       console.error("Error saving progress:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state while fetching progress
//   }

//   return (
//     <div>
//       <h1>Course Progress</h1>
//       <div>Current Module Index: {progress.currentModuleIndex}</div>
//       <button
//         onClick={() =>
//           handleProgressChange({
//             currentModuleIndex: progress.currentModuleIndex + 1,
//           })
//         }
//       >
//         Next Module
//       </button>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { courseId } = context.query;

//   // Ensure courseId is a string
//   if (typeof courseId !== "string") {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       courseId,
//     },
//   };
// };

// export default CoursePage;
