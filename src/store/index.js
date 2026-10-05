import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import typingReducer from './slices/typingSlice';
import lessonReducer from './slices/lessonSlice';
import uiReducer from './slices/uiSlice';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    typing: typingReducer,
    lesson: lessonReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
