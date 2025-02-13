import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksPage } from './bookmarks.page';

const routes: Routes = [
  { path: '', component: BookmarksPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes), BookmarksPage], // импортируем standalone компонент
})
export class BookmarksPageModule {}
