import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailPage } from './movie-detail.page';

const routes: Routes = [
  { path: '', component: MovieDetailPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Уберите MovieDetailPage из массива imports
})
export class MovieDetailPageModule {}

  