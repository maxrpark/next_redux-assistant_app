import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/features/todo/todoSlice';
import projectReducer from '../store/features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    projects: projectReducer,
  },
});
// devTools: true,
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
