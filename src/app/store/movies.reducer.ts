import { MoviesState } from './movies.selectors';
import { createReducer, on } from '@ngrx/store';
import * as moviesActions from './movies.actions';

export const initialState: MoviesState = {
  movies: [],
  filteredMovies: [],
};

export const moviesReducer = createReducer(
  initialState,
  on(moviesActions.getMovieListSuccess, (state, payload) => ({
    ...state,
    movies: payload.movies
  })),
  on(moviesActions.getMovieByKeySuccess, (state, payload) => ({
    ...state,
    currentMovie: payload.movie
  })),
  // In real world app we would have this logic on back-end side.
  on(moviesActions.searchMovies, (state, payload) => ({
    ...state,
    filteredMovies: state.movies.filter(movie => {
      switch (payload.searchFilter) {
        case('description'):
          return movie.description.toLowerCase().trim().includes(payload.value);
        case('genres'):
          return movie.genres.some(genre => genre.toLowerCase().trim().includes(payload.value));
        default:
          return movie.name.toLowerCase().trim().includes(payload.value);
      }
    })
  })),
);
