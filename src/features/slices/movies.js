import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  languages: [],
  genres: [],
  movieDetails: {},
  externalIds: {},
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

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId) => {
    return axios
    .get(`/movie/${movieId}?language=en-US`)
    .then(function (response) {
      return response.data
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

export const fetchExternalIds = createAsyncThunk(
  'externalIds/fetchExternalIds',
  async (movieId) => {
    return axios
    .get(`/movie/${movieId}/external_ids?language=en-US`)
    .then(function (response) {
      return response.data
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
      }).addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails[action.payload.id] = action.payload;
      }).addCase(fetchExternalIds.fulfilled, (state, action) => {
        state.externalIds[action.payload.id] = action.payload;
      })},
});

export const selectLanguages = (state) => state.movies.languages;
export const selectGenres = (state) => state.movies.genres;
export const selectMovieDetails = (state, movieId) => state.movies.movieDetails[movieId]
export const selectExternalIds = (state, movieId) => state.movies.externalIds[movieId]

export default moviesSlice.reducer;
