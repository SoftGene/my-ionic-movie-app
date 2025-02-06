import { Component } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { BookmarkService } from '../services/bookmark.service';
import { SortPopoverComponent } from '../components/sort-popover.component'; // Импорт компонента для сортировки
import { PopoverController } from '@ionic/angular';
import { Movie } from '../models/movie.model'; // Подключаем интерфейс


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true, // Указываем, что компонент standalone
  imports: [IonicModule, CommonModule, RouterModule, SortPopoverComponent,], // Подключаем зависимости
})
export class MoviesPage {
  movies = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      description: 'Fear can hold you prisoner. Hope can set you free.',
      fullDescription: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      poster: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg',
      duration: '2h 22min',
      rating: 'R',
      director: 'Frank Darabont',
      writers: 'Stephen King (novel), Frank Darabont (screenplay)',
      stars: 'Tim Robbins, Morgan Freeman, Bob Gunton',
      trailerUrl: 'https://www.youtube.com/embed/6hB3S9bIaco',
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      description: 'An offer you can\'t refuse.',
      fullDescription: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      poster: 'https://i5.walmartimages.com/seo/The-Godfather-Original-Movie-Poster-poster-Frameless-Gift-12-x-18-inch-30cm-x-46cm_c6df3fd5-1e9c-49ca-8cb6-1af6078df4c2.b21fd8bc877c5645b9340a53580833a2.jpeg',
      duration: '2h 55min',
      rating: 'R',
      director: 'Francis Ford Coppola',
      writers: 'Mario Puzo (novel), Francis Ford Coppola (screenplay)',
      stars: 'Marlon Brando, Al Pacino, James Caan',
      trailerUrl: 'https://www.youtube.com/embed/sY1S34973zA?si=DmK7c-mJLIS8_t94',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      description: 'Why So Serious?',
      fullDescription: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
      poster: 'https://static.posters.cz/image/750/obrazy-na-platne-the-dark-knight-trilogy-on-fire-i197743.jpg',
      duration: '2h 32min',
      rating: 'PG-13',
      director: 'Christopher Nolan',
      writers: 'Jonathan Nolan, Christopher Nolan, David S. Goyer',
      stars: 'Christian Bale, Heath Ledger, Aaron Eckhart',
      trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY?si=VtYCErAFbh4JEbqb',
    },
    {
      id: 4,
      title: 'The Godfather Part II',
      year: 1974,
      description: 'I know it was you, Fredo. You broke my heart.',
      fullDescription: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on the family crime syndicate.',
      poster: 'https://m.media-amazon.com/images/I/41g-CRBg8mL._UF894,1000_QL80_.jpg',
      duration: '3h 22min',
      rating: 'R',
      director: 'Francis Ford Coppola',
      writers: 'Francis Ford Coppola (screenplay), Mario Puzo (screenplay)',
      stars: 'Al Pacino, Robert De Niro, Robert Duvall',
      trailerUrl: 'https://www.youtube.com/embed/9O1Iy9od7-A?si=NcRDIOzUVa6YBuHR',
    },
    {
      id: 5,
      title: '12 Angry Men',
      year: 1957,
      description: 'Life is in their hands — Death is on their minds!',
      fullDescription: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
      poster: 'https://storage.googleapis.com/pod_public/750/144102.jpg',
      duration: '1h 36min',
      rating: 'Approved',
      director: 'Sidney Lumet',
      writers: 'Reginald Rose (screenplay)',
      stars: 'Henry Fonda, Lee J. Cobb, Martin Balsam',
      trailerUrl: 'https://www.youtube.com/embed/TEN-2uTi2c0?si=0mww2Av5e_JHn9QE',
    },
    {
      id: 6,
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
      description: 'The eye of the enemy is moving.',
      fullDescription: 'Gandalf and Aragorn lead the World of Men against Sauron’s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
      poster: 'https://static.posters.cz/image/750/plakaty/lord-of-the-rings-return-of-the-king-one-sheet-i11969.jpgg',
      duration: '3h 21min',
      rating: 'PG-13',
      director: 'Peter Jackson',
      writers: 'J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay)',
      stars: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
      trailerUrl: 'https://www.youtube.com/embed/r5X-hFf6Bwo?si=GTBfCJSIgdme0w7_',
    },
    {
      id: 7,
      title: "Schindler's List",
      year: 1993,
      description: 'Whoever saves one life, saves the world entire.',
      fullDescription: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ3aeH4quODDvLaY8PhMPgZWIfuxCgjrIaRg&s',
      duration: '3h 15min',
      rating: 'R',
      director: 'Steven Spielberg',
      writers: 'Thomas Keneally (book), Steven Zaillian (screenplay)',
      stars: 'Liam Neeson, Ralph Fiennes, Ben Kingsley',
      trailerUrl: 'https://www.youtube.com/embed/gG22XNhtnoY?si=yUtMNqXbgbKRB3jY',  
    },
    {
      id: 8,
      title: 'Pulp Fiction',
      year: 1994,
      description: 'Just because you are a character doesn’t mean you have character.',
      fullDescription: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      poster: 'https://static.posters.cz/image/750/1288.jpg',
      duration: '2h 34min',
      rating: 'R',
      director: 'Quentin Tarantino',
      writers: 'Quentin Tarantino (story), Roger Avary (story)',
      stars: 'John Travolta, Uma Thurman, Samuel L. Jackson',
      trailerUrl: 'https://www.youtube.com/embed/s7EdQ4FqbhY?si=lvyCsp_RAOl9p65K',
    },
    {
      id: 9,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
      description: 'One ring to rule them all.',
      fullDescription: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      poster: 'https://static.posters.cz/image/750/lord-of-the-rings-fellowship-i11723.jpg',
      duration: '2h 58min',
      rating: 'PG-13',
      director: 'Peter Jackson',
      writers: 'J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay)',
      stars: 'Elijah Wood, Ian McKellen, Orlando Bloom',
      trailerUrl: 'https://www.youtube.com/embed/V75dMMIW2B4?si=HJXMS4XN3uVSoLPP',
    },
    {
      id: 10,
      title: 'The Good, the Bad and the Ugly',
      year: 1966,
      description: 'For three men, the Civil War wasn’t hell. It was practice.',
      fullDescription: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
      poster: 'https://static.posters.cz/image/750/plakaty/the-good-the-bad-and-the-ugly-i8932.jpg',
      duration: '2h 58min',
      rating: 'R',
      director: 'Sergio Leone',
      writers: 'Luciano Vincenzoni, Sergio Leone',
      stars: 'Clint Eastwood, Eli Wallach, Lee Van Cleef',  
      trailerUrl: 'https://www.youtube.com/embed/WCN5JJY_wiA?si=luYY0SfyMGkmS2Fa',
    },
    {
      id: 11,
      title: 'Forrest Gump',
      year: 1994,
      description: 'Life is like a box of chocolates, you never know what you’re gonna get.',
      fullDescription: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
      poster: 'https://m.media-amazon.com/images/I/41Al9falobL._AC_UF894,1000_QL80_.jpg',
      duration: '2h 22min',
      rating: 'PG-13',
      director: 'Robert Zemeckis',
      writers: 'Winston Groom (novel), Eric Roth (screenplay)',
      stars: 'Tom Hanks, Robin Wright, Gary Sinise',
      trailerUrl: 'https://www.youtube.com/embed/bLvqoHBptjg?si=PgMpWm1PhjBlO0WJ',
    },
    {
      id: 12,
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
      description: 'A new power is rising.',
      fullDescription: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron’s new ally, Saruman, and his hordes of Isengard.',
      poster: 'https://www.originalfilmart.com/cdn/shop/files/lord_of_the_rings_the_two_towers_2002_original_film_art_5dd21feb-10ab-41a1-84a1-4c4b082e9626_5000x.webp?v=1705516902',
      duration: '2h 59min',
      rating: 'PG-13',
      director: 'Peter Jackson',
      writers: 'J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay)',
      stars: 'Elijah Wood, Ian McKellen, Viggo Mortensen',
      trailerUrl: 'https://www.youtube.com/embed/LbfMDwc4azU?si=ie84knpWIn9Bh6UX',
    },
    {
      id: 13,
      title: 'Fight Club',
      year: 1999,
      description: 'The first rule of Fight Club is: You do not talk about Fight Club.',
      fullDescription: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
      poster: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      duration: '2h 19min',
      rating: 'R',
      director: 'David Fincher',
      writers: 'Chuck Palahniuk (novel), Jim Uhls (screenplay)',
      stars: 'Brad Pitt, Edward Norton, Meat Loaf',
      trailerUrl: 'https://www.youtube.com/embed/BdJKm16Co6M?si=jHGt7EsY0u1YYgL4',
    },
    {
      id: 14,
      title: 'Inception',
      year: 2010,
      description: 'Your mind is the scene of the crime.',
      fullDescription: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      poster: 'https://www.vasefotka.cz/fotky22340/fotos/_vyr_271602026-Inception-Pocatek.jpg',
      duration: '2h 28min',
      rating: 'PG-13',
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0?si=4r3H7cRp_kErCxF0',
    },
    {
      id: 15,
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
      description: 'The adventure continues...',
      fullDescription: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTkxNGFlNDktZmJkNC00MDdhLTg0MTEtZjZiYWI3MGE5NWIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      duration: '2h 4min',
      rating: 'PG',
      director: 'Irvin Kershner',
      writers: 'Leigh Brackett, Lawrence Kasdan, George Lucas (story)',
      stars: 'Mark Hamill, Harrison Ford, Carrie Fisher',
      trailerUrl: 'https://www.youtube.com/embed/JNwNXF9Y6kY?si=SPlhb6qlcBosJAt9',
    },
  ];

  filteredMovies = [...this.movies]; // Массив для отображения отфильтрованных фильмов
  bookmarks: Movie[] = [];
  searchQuery: string = ''; // Строка для ввода поиска

  constructor(private storage: Storage, private router: Router, private bookmarkService: BookmarkService, private popoverController: PopoverController) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadBookmarks();
  
    // Подписка на изменения закладок
    this.bookmarkService.bookmarksChanged.subscribe(() => {
      this.loadBookmarks(); // Обновляем состояние закладок
    });
  }

  async loadBookmarks() {
    const storedBookmarks: Movie[] = await this.storage.get('bookmarks');
    this.bookmarks = storedBookmarks ? storedBookmarks : [];
  }
  
  async saveBookmarks() {
    await this.storage.set('bookmarks', this.bookmarks);
    this.bookmarkService.notifyChange(); // Уведомляем о изменении закладок
  }
  
  // Проверяем, добавлен ли фильм в закладки
  isBookmarked(movie: Movie): boolean {
    return this.bookmarks.some((b) => b.id === movie.id);
  }
  
  // Добавление/удаление фильма из закладок
  async toggleBookmark(event: Event, movie: Movie) {
    event.stopPropagation();
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
  }

  goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie-detail', movieId], { queryParams: { returnUrl: '/movies' } });
  }

  filterMovies(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(query));
  }
  
  async openSortPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: SortPopoverComponent, // Указываем компонент для поповера
      event,
      translucent: true,
    });
  
    // Получаем результат после закрытия поповера
    popover.onDidDismiss().then((result) => {
      const sortOption = result.data; // Данные передаются через dismiss
      if (sortOption) {
        this.sortMovies(sortOption); // Сортируем фильмы на основе выбранного варианта
      }
    });
  
    await popover.present();
  }
  

  parseDuration(duration: string): number {
    const hoursMatch = duration.match(/(\d+)h/); // Находим часы
    const minutesMatch = duration.match(/(\d+)min/); // Находим минуты

    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return hours * 60 + minutes; // Конвертируем в минуты
  }

  sortMovies(option: string) {
    if (option === 'date') {
      this.filteredMovies.sort((a, b) => a.year - b.year);
    } else if (option === 'duration') {
      this.filteredMovies.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration));
    } else if (option === 'title') {
      this.filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

}
  

