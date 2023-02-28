import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  languages: [],
  genres: [],
};

export const fetchLanguages = createAsyncThunk(
  'languages/fetchLanguages',
  async () => {
    return axios
      .get(`/configuration/languages`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }
);

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async () => {
    return axios
    .get(`/genre/movie/list`)
    .then(function (response) {
      return response.data.genres;
    })
    .catch(function (error) {
      console.log(error);
    })
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
      }).addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })},
});

export const selectLanguages = (state) => state.movies.languages;
export const selectGenres = (state) => state.movies.genres;

export const x = moviesSlice.reducer;
