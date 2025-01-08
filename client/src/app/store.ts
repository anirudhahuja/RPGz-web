import { configureStore } from '@reduxjs/toolkit';
import levelUpReducer from './levelUpSlice';

const store = configureStore({
  reducer: {
    levelUp: levelUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 