import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moviesActions from './movies.actions';
import * as moviesSelectors from './movies.selectors';

@Injectable()
export class MoviesFacade {
  selectMovies$ = this.store.select(moviesSelectors.selectMovies);
  selectCurrentMovie$ = this.store.select(moviesSelectors.selectCurrentMovie);
  selectMoviesFilteredBy$ = this.store.select(moviesSelectors.selectMoviesFilteredBy);
  selectGenres$ = this.store.select(moviesSelectors.selectGenres);

  constructor(private store: Store<moviesSelectors.MoviesState>) {
  }

  getMovieList(): void {
    this.store.dispatch(moviesActions.getMovieList());
  }

  getMovieByKey(key: string): void {
    this.store.dispatch(moviesActions.getMovieByKey({key}));
  }

  searchMovies(value: string, searchFilter='name'): void {
    this.store.dispatch(moviesActions.searchMovies({value, searchFilter}));
  }
}
