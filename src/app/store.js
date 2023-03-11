import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/slices/movies';
import authenticationSlice from "../features/slices/authentication"

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    authentication: authenticationSlice, 
  },
});
