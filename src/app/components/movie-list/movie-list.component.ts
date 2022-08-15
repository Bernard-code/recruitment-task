import { Component, OnInit } from '@angular/core';
import { MoviesFacade } from '../../store/movies.facade';
import { map, Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  moviesFiltered$!: Observable<Movie[] | null>

  constructor(private moviesFacade: MoviesFacade) {
  }

  ngOnInit(): void {
    this.moviesFacade.getMovieList();
    this.movies$ = this.moviesFacade.selectMovies$;
    this.moviesFiltered$ = this.moviesFacade.selectMoviesFilteredBy$.pipe(
      map(value => value.length === 0 ? null : value)
    );
  }
}
