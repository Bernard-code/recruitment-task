import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { DestroyableHelper } from '../../shared/destroyable.helper';
import { MoviesFacade } from '../../store/movies.facade';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent extends DestroyableHelper implements OnInit {
  movie$!: Observable<Movie>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesFacade: MoviesFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        // unsubscribing from ActivatedRoute is not actually necessary, but it's harmless
        takeUntil(this.destroyed$)
      ).subscribe(params => {
        const key = params?.get('key');
        if (key !== null)
          this.moviesFacade.getMovieByKey(key);
          this.movie$ = this.moviesFacade.selectCurrentMovie$ as Observable<Movie>;
    });
  }
}
