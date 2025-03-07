import { configureStore } from '@reduxjs/toolkit';
import levelUpReducer from './slices/levelUp.slice';

export const createStore = () => {
  return configureStore({
    reducer: {
      levelUp: levelUpReducer,
      // Add other reducers here as we migrate them
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch']; 