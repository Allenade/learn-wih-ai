import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import authReducer from "./authSlice"; // Assuming authSlice handles Firebase authentication logic
import { useDispatch, useSelector } from "react-redux";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer, // Add the auth slice to the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Optional: you can also create a custom hook for using the dispatch type
// to ensure consistent typing throughout your app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(
  selector: (state: RootState) => T
) => T = useSelector;
