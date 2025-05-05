import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/movieSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
