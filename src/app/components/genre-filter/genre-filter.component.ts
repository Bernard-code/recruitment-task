import { Component, OnInit } from '@angular/core';
import { MoviesFacade } from '../../store/movies.facade';
import { Observable, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchOptionsFields } from '../../models/search-options-fields.enum';
import { DestroyableHelper } from '../../shared/destroyable.helper';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent extends DestroyableHelper implements OnInit {
  genreOptions$!: Observable<string[]>;
  genresForm!: FormGroup;

  constructor(private moviesFacade: MoviesFacade) {
    super();
  }

  ngOnInit(): void {
    this.genreOptions$ = this.moviesFacade.selectGenres$;
    this.initializeFields();
  }

  initializeFields(): void {
    this.genresForm = new FormGroup({
      genre: new FormControl(''),
    });
    this.genresForm.get('genre')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        this.moviesFacade.searchMovies(value.toLowerCase().trim(), SearchOptionsFields.Genre);
      });
  }

  onClearSearch(): void {
    this.genresForm.get('searchPhrase')?.reset();
  }
}
