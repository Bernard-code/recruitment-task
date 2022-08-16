import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';
import { data } from './movies-data';
import { SearchOptionsFields } from '../models/search-options-fields.enum';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor() {
  }

  getMovieByKey(key: string): Observable<Movie> {
    return of(data.movies.find(movie => movie.key === key)) as Observable<Movie>;
  }

  getMovies(value?: string, searchFilter = SearchOptionsFields.Title): Observable<Movie[]> {
    let moviesData = data.movies;
    if(!value) {
      return of(moviesData);
    }
    moviesData = moviesData.filter((movie: Movie) => {
      switch (searchFilter) {
        case(SearchOptionsFields.Description):
          return movie.description.toLowerCase().trim().includes(value);
        case(SearchOptionsFields.Genre):
          return movie.genres.some((genre: string) => genre.toLowerCase().trim().includes(value));
        default:
          return movie.name.toLowerCase().trim().includes(value);
      }
    });
    if (moviesData.length === 0) {
      return throwError(() => new Error('No movies found. Please clear search field to go back.'));
    }
    return of(moviesData);
  }
}
