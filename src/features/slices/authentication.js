import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../axios";

const initialState = {
  session: "",
};

export const fetchSessionId = createAsyncThunk(
  'sessionId/fetchSessionId',
  async (request_token) => {
      return axios
        .post("/authentication/session/new", { request_token })
        .then(function(response) {
          return response.data
        })
        .catch(function(error) {
          console.log(error);
        })
  }
);

const authenticationSlide = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchSessionId.fulfilled, (state, action) => {
      state.session = action.payload;
    })
  }
})

export const selectSession = (state) => state.authentication.session;

export default authenticationSlide.reducer;