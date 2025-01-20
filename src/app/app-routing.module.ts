import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', loadComponent: () => import('./movies/movies.page').then(m => m.MoviesPage) },
  { path: 'bookmarks', loadComponent: () => import('./bookmarks/bookmarks.page').then(m => m.BookmarksPage) },
  { path: 'movie-detail/:id', loadComponent: () => import('./movie-detail/movie-detail.page').then(m => m.MovieDetailPage) },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
