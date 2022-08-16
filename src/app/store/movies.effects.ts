import { MoviesService } from '../services/movies.service';
import * as moviesActions from './movies.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesEffects {
  getMovieList$ = createEffect(() => this.actions$.pipe(
      ofType(moviesActions.getMovieList),
      switchMap(() =>
        this.moviesService.getMovies().pipe(
          map(movies => moviesActions.getMovieListSuccess({movies})),
          catchError(error => of(moviesActions.getMovieListFailure({error})))
        ))
    )
  );

  getMovieByKey$ = createEffect(() => this.actions$.pipe(
      ofType(moviesActions.getMovieByKey),
      switchMap(action =>
        this.moviesService.getMovieByKey(action.key).pipe(
          map(movie => moviesActions.getMovieByKeySuccess({movie})),
          catchError(error => of(moviesActions.getMovieByKeyFailure({error})))
        ))
    )
  );

  searchMovies$ = createEffect(() => this.actions$.pipe(
      ofType(moviesActions.searchMovies),
      switchMap(action =>
        this.moviesService.getMovies(action.value, action.searchFilter).pipe(
          map(movies => moviesActions.getMovieListSuccess({movies})),
          catchError(error => of(moviesActions.getMovieListFailure({error})))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {
  }
}
