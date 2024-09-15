import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const savedCourseId = localStorage.getItem("selectedCourseId");
const savedProgress = savedCourseId
  ? localStorage.getItem("progress_" + savedCourseId)
  : null;

interface CourseState {
  courses(courses: any): unknown;
  selectedCourseId: string | null;
  currentModuleIndex: number;
}

const initialState: CourseState = {
  selectedCourseId: savedCourseId ?? null,
  currentModuleIndex: savedProgress
    ? JSON.parse(savedProgress).currentModuleIndex
    : 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    selectCourse(state, action: PayloadAction<string | null>) {
      state.selectedCourseId = action.payload;
      if (action.payload) {
        localStorage.setItem("selectedCourseId", action.payload);
      } else {
        localStorage.removeItem("selectedCourseId");
      }
    },
    advanceModule(state) {
      if (state.currentModuleIndex < 9) {
        state.currentModuleIndex += 1;
        if (state.selectedCourseId) {
          localStorage.setItem(
            "progress_" + state.selectedCourseId,
            JSON.stringify({ currentModuleIndex: state.currentModuleIndex })
          );
        }
      }
    },
    previousModule(state) {
      if (state.currentModuleIndex > 0) {
        state.currentModuleIndex -= 1;
        if (state.selectedCourseId) {
          localStorage.setItem(
            "progress_" + state.selectedCourseId,
            JSON.stringify({ currentModuleIndex: state.currentModuleIndex })
          );
        }
      }
    },
    setModuleIndex(state, action: PayloadAction<number>) {
      state.currentModuleIndex = action.payload;
      if (state.selectedCourseId) {
        localStorage.setItem(
          "progress_" + state.selectedCourseId,
          JSON.stringify({ currentModuleIndex: state.currentModuleIndex })
        );
      }
    },
  },
});

export const {
  selectCourse,
  advanceModule,
  previousModule,
  setModuleIndex,
} = courseSlice.actions;

export default courseSlice.reducer;
