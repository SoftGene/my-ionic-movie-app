import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookmarkService } from '../services/bookmark.service';
import { Movie } from '../models/movie.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-premiere',
  templateUrl: './premiere.component.html',
  styleUrls: ['./premiere.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PremiereComponent implements OnInit {
  premieres: any[] = [];
  filteredPremieres: any[] = [];
  searchQuery: string = '';
  bookmarks: any[] = [];
  private bookmarkSubscription: Subscription | null = null;
  apiUrl = 'https://api.themoviedb.org/3/movie/upcoming';
  apiKey = '0801601f852bc183c6d26b5b9ffcda11'; // Вставьте ваш API-ключ

  constructor(private http: HttpClient, private router: Router, private bookmarkService: BookmarkService) {}

  async ngOnInit() {
    this.loadPremieres();
    await this.loadBookmarks();

    // Подписываемся на обновления закладок
    this.bookmarkSubscription = this.bookmarkService.bookmarksChanged.subscribe(() => {
      this.loadBookmarks();
    });
  }

  loadPremieres() {
    const totalPages = 15;
    this.premieres = [];
    this.filteredPremieres = []; // Очищаем перед загрузкой

    for (let page = 1; page <= totalPages; page++) {
      const url = `${this.apiUrl}?api_key=${this.apiKey}&language=en-US&page=${page}`;
      this.http.get(url).subscribe((response: any) => {
        this.premieres = [...this.premieres, ...response.results];
        this.filteredPremieres = [...this.premieres];
      });
    }
  }

  async loadBookmarks() {
    const storedBookmarks = await this.bookmarkService.loadBookmarks();
    this.bookmarks = storedBookmarks ? storedBookmarks : [];
  }

  filterPremieres(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredPremieres = this.premieres.filter(premiere =>
      premiere.title.toLowerCase().includes(query)
    );
  }

  goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie-detail', movieId], { 
      queryParams: { returnUrl: '/premiere', fromApi: true } 
    });
  }
  
  toggleBookmark(event: Event, movie: any) {
    event.stopPropagation();
    this.bookmarkService.toggleBookmark(movie);
  }

  isBookmarked(movie: any): boolean {
    return this.bookmarks.some((b) => b.id === movie.id);
  }

  ngOnDestroy() {
    if (this.bookmarkSubscription) {
      this.bookmarkSubscription.unsubscribe();
    }
  }
}
