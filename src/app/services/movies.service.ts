import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { data } from './movies-data';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor() {
  }

  getMovies(): Observable<Movie[]> {
    return of(data.movies);
  }

  getMovieByKey(key: string): Observable<Movie> {
    return of(data.movies.find(movie => movie.key === key)) as Observable<Movie>;
  }
}
