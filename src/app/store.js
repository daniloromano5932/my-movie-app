import { configureStore } from '@reduxjs/toolkit';
import {x} from '../features/slices/movies';

export const store = configureStore({
  reducer: {
    movies: x,
  },
});
