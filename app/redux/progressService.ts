// services/progressService.ts

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

// 1. Get progress from local storage
export const getLocalProgress = (
  courseId: string
): { currentModuleIndex: number } | null => {
  try {
    const progress = localStorage.getItem(`progress_${courseId}`);
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error("Error getting local progress:", error);
    return null;
  }
};

// 2. Save progress to local storage
export const saveLocalProgress = (
  courseId: string,
  progress: { currentModuleIndex: number }
) => {
  try {
    localStorage.setItem(`progress_${courseId}`, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving local progress:", error);
  }
};

// 3. Save progress to Firestore
export const saveFirestoreProgress = async (
  email: string,
  courseId: string,
  progress: { currentModuleIndex: number }
) => {
  try {
    const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    await setDoc(progressRef, progress);
  } catch (error) {
    console.error("Error saving Firestore progress:", error);
  }
};

// 4. Get progress from Firestore
export const getFirestoreProgress = async (
  email: string,
  courseId: string
): Promise<{ currentModuleIndex: number } | null> => {
  try {
    const progressRef = doc(db, "userProgress", `${email}_${courseId}`);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data() as { currentModuleIndex: number };
    }
    return null;
  } catch (error) {
    console.error("Error getting Firestore progress:", error);
    return null;
  }
};

// 5. Retrieve progress using both local storage and Firestore
export const getProgress = async (
  email: string | null,
  courseId: string
): Promise<{ currentModuleIndex: number }> => {
  try {
    let progress = getLocalProgress(courseId);

    if (!progress && email) {
      const firestoreProgress = await getFirestoreProgress(email, courseId);
      if (firestoreProgress) {
        progress = firestoreProgress;
        saveLocalProgress(courseId, progress);
      }
    }

    return progress || { currentModuleIndex: 0 };
  } catch (error) {
    console.error("Error retrieving progress:", error);
    return { currentModuleIndex: 0 };
  }
};

// 6. Save progress both locally and remotely (if online)
export const saveProgress = async (
  email: string | null,
  courseId: string,
  progress: { currentModuleIndex: number }
) => {
  try {
    saveLocalProgress(courseId, progress);

    if (email) {
      await saveFirestoreProgress(email, courseId, progress);
    }
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};
