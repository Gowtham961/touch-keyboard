import { createSlice } from '@reduxjs/toolkit';
import { LESSONS } from '../../data/lessons';

const initialState = {
  lessons: LESSONS,
  currentLessonId: 'benchmark-5min',
  isFetchingExternal: false,
  externalLessonError: null,
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    selectLesson: (state, action) => {
      state.currentLessonId = action.payload;
    },
    // Async Saga triggers for external resource access
    fetchExternalLessonRequest: (state) => {
      state.isFetchingExternal = true;
      state.externalLessonError = null;
    },
    fetchExternalLessonSuccess: (state, action) => {
      state.isFetchingExternal = false;
      const newLesson = action.payload;
      // Add or replace external lesson
      const existingIdx = state.lessons.findIndex((l) => l.id === newLesson.id);
      if (existingIdx >= 0) {
        state.lessons[existingIdx] = newLesson;
      } else {
        state.lessons.push(newLesson);
      }
      state.currentLessonId = newLesson.id;
    },
    fetchExternalLessonFailure: (state, action) => {
      state.isFetchingExternal = false;
      state.externalLessonError = action.payload;
    },
  },
});

export const {
  selectLesson,
  fetchExternalLessonRequest,
  fetchExternalLessonSuccess,
  fetchExternalLessonFailure,
} = lessonSlice.actions;

export default lessonSlice.reducer;
