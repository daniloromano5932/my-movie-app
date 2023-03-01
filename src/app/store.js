import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/slices/movies';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});
