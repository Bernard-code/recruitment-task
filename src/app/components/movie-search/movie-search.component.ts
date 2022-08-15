import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DestroyableHelper } from '../../shared/destroyable.helper';
import { debounceTime, takeUntil } from 'rxjs';
import { MoviesFacade } from '../../store/movies.facade';
import { SearchOptionsFields } from '../../models/search-options-fields.enum';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent extends DestroyableHelper implements OnInit {
  searchOptions!: string[];
  searchForm!: FormGroup;

  constructor(
    private moviesFacade: MoviesFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.searchOptions = Object.keys(SearchOptionsFields);
    this.initializeFields();
  }

  initializeFields(): void {
    this.searchForm = new FormGroup({
      searchPhrase: new FormControl(''),
      searchBy: new FormControl('Title')
    });
    this.searchForm.get('searchPhrase')?.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroyed$),
      )
      .subscribe(val => {
        const searchFilter = SearchOptionsFields[this.searchForm.get('searchBy')?.value as keyof typeof SearchOptionsFields];
        this.moviesFacade.searchMovies(val?.toLowerCase().trim(), searchFilter);
      });
  }

  onClearSearch(): void {
    this.searchForm.get('searchPhrase')?.reset();
  }
}
