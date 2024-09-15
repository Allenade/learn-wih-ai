import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import authReducer from "./authSlice";
import navigationReducer from "./navigationSlice";
import aiReducer from "./aiSlice"; // Import the AI slice
import { useDispatch, useSelector } from "react-redux";

// Configure your Redux store
export const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
    navigation: navigationReducer,
    ai: aiReducer, // Add the AI slice to the store
  },
});

// Define types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for using dispatch and selector with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
