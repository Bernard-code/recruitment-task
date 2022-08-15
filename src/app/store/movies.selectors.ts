import { Movie } from '../models/movie.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
  movies: Movie[],
  currentMovie?: Movie,
  filteredMovies: Movie[]
}

export const getMoviesState = createFeatureSelector<MoviesState>('moviesReducer');

export const selectMovies = createSelector(
  getMoviesState,
  (state) => state.movies
);
export const selectCurrentMovie = createSelector(
  getMoviesState,
  (state) => state.currentMovie
);
export const selectMoviesFilteredBy = createSelector(
  getMoviesState,
  (state) => state.filteredMovies
);
export const selectGenres = createSelector(
  getMoviesState,
  (state) => new Array(...new Set(state.movies.map(movie => movie.genres).flat()))
);
