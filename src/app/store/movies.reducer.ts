import { MoviesState } from './movies.selectors';
import { createReducer, on } from '@ngrx/store';
import * as moviesActions from './movies.actions';

export const initialState: MoviesState = {
  movies: [],
  filteredMovies: [],
  error: null
};

export const moviesReducer = createReducer(
  initialState,
  on(moviesActions.getMovieListSuccess, (state, payload) => ({
    ...state,
    movies: payload.movies,
    error: null
  })),
  on(moviesActions.getMovieByKeySuccess, (state, payload) => ({
    ...state,
    currentMovie: payload.movie,
    error: null
  })),
  on(moviesActions.getMovieListFailure, (state, payload) => ({
    ...state,
    error: payload.error,
    movies: []
  }))
);
