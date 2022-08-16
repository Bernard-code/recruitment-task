import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { SearchOptionsFields } from '../models/search-options-fields.enum';

export const getMovieList = createAction(
  '[Movies actions] get movie list'
);
export const getMovieListSuccess = createAction(
  '[Movies actions] get movie list success',
  props<{ movies: Movie[] }>()
);
export const getMovieListFailure = createAction(
  '[Movies actions] get movie list failure',
  props<{ error: string }>()
);

export const getMovieByKey = createAction(
  '[Movies actions] get movie by key',
  props<{ key: string }>()
);
export const getMovieByKeySuccess = createAction(
  '[Movies actions] get movie by key success',
  props<{ movie: Movie }>()
);
export const getMovieByKeyFailure = createAction(
  '[Movies actions] get movie by key failure',
  props<{ error: string }>()
);

export const searchMovies = createAction(
  '[Movies actions] search movies by filter',
  props<{ value: string, searchFilter: SearchOptionsFields }>()
);
