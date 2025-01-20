import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isDarkMode = false;

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loadTheme(); // Загрузка сохранённой темы при запуске приложения
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
    this.saveTheme(); // Сохранение текущей темы
  }

  updateTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  saveTheme() {
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode)); // Сохраняем в localStorage
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      this.isDarkMode = JSON.parse(savedTheme); // Восстанавливаем из localStorage
      this.updateTheme();
    }
  }
}