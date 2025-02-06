import { Component, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage-angular';
import { RouterModule } from '@angular/router';
import { BookmarkService } from '../services/bookmark.service'; // Импорт сервиса
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Импорт Router


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class BookmarksPage implements OnDestroy {
  bookmarks: any[] = [];
  private subscription: Subscription | null = null;
  filteredBookmarks: any[] = []; // Отфильтрованные закладки
  searchQuery: string = ''; // Строка для поиска

  constructor(
    private storage: Storage,
    private bookmarkService: BookmarkService,
    private router: Router // Внедрение Router
  ) {}

  
  async ngOnInit() {
    await this.storage.create();
    this.loadBookmarks();

    // Подписка на изменения в закладках
    this.subscription = this.bookmarkService.bookmarksChanged.subscribe(() => {
      this.loadBookmarks();
    });
  }

      
  async loadBookmarks() {
    const storedBookmarks = await this.storage.get('bookmarks');
    this.bookmarks = storedBookmarks ? storedBookmarks : [];
    this.filteredBookmarks = [...this.bookmarks];
  }


  async removeBookmark(event: Event, movieId: number) {
    event.stopPropagation();
    this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== movieId);
    this.filteredBookmarks = [...this.bookmarks];
    await this.storage.set('bookmarks', this.bookmarks);
    this.bookmarkService.notifyChange();
  }


  goToMovieDetail(movie: any) {
    const fromApi = movie.poster_path ? 'true' : 'false';
    this.router.navigate(['/movie-detail', movie.id], {
      queryParams: { returnUrl: '/bookmarks', fromApi }
    });
  }
  
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

    // Метод для фильтрации закладок
  filterBookmarks(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredBookmarks = this.bookmarks.filter(bookmark => bookmark.title.toLowerCase().includes(query));
  }
}