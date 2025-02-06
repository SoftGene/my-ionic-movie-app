import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Movie } from '../models/movie.model';


@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarksChanged = new EventEmitter<void>();
  private bookmarks: Movie[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.loadBookmarks();
  }

  async loadBookmarks(): Promise<any[]> {
    const storedBookmarks = await this.storage.get('bookmarks');
    this.bookmarks = storedBookmarks ? storedBookmarks : [];
    return this.bookmarks; // Теперь метод возвращает массив закладок
  }

  async saveBookmarks() {
    await this.storage.set('bookmarks', this.bookmarks);
    this.bookmarksChanged.emit();
  }

  isBookmarked(movie: Movie): boolean {
    return this.bookmarks.some((b) => b.id === movie.id);
  }

  async toggleBookmark(movie: Movie) {
    await this.loadBookmarks(); // Загружаем актуальные закладки
  
    const index = this.bookmarks.findIndex((b) => b.id === movie.id);
  
    if (index === -1) {
      const formattedMovie: Movie = {
        ...movie,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : movie.poster || '',
      };
      this.bookmarks.push(formattedMovie);
    } else {
      this.bookmarks.splice(index, 1);
    }
  
    await this.saveBookmarks();
    await this.loadBookmarks(); // После изменения загружаем обновленный список
  }
  

  notifyChange() {
    this.bookmarksChanged.emit();
  }
}
