// courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyCourses } from "../coursesData";

interface CourseState {
  selectedCourseId: string | null;
  currentModuleIndex: number;
}

const initialState: CourseState = {
  selectedCourseId: null,
  currentModuleIndex: 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    selectCourse(state, action: PayloadAction<string>) {
      state.selectedCourseId = action.payload;
      state.currentModuleIndex = 0;
    },
    advanceModule(state) {
      if (
        state.currentModuleIndex <
        (dummyCourses.find((course) => course.id === state.selectedCourseId)
          ?.modules.length ?? 0) -
          1
      ) {
        state.currentModuleIndex += 1;
      }
    },
    previousModule(state) {
      if (state.currentModuleIndex > 0) {
        state.currentModuleIndex -= 1;
      }
    },
    setModuleIndex(state, action: PayloadAction<number>) {
      state.currentModuleIndex = action.payload;
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
