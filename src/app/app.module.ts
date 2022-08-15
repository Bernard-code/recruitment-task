import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesFacade } from './store/movies.facade';
import { MoviesEffects } from './store/movies.effects';
import { initialState, moviesReducer } from './store/movies.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { GenreFilterComponent } from './components/genre-filter/genre-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    MovieListComponent,
    MovieCardComponent,
    GenreFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('moviesReducer', moviesReducer, {initialState: initialState}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MoviesEffects]),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [MoviesFacade, MoviesEffects],
  bootstrap: [AppComponent]
})
export class AppModule {
}
