import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular'; // Импортируем IonicModule

@Component({
  selector: 'app-sort-popover',
  template: `
    <ion-list>
      <ion-item button (click)="selectSort('date')">Sort by Date</ion-item>
      <ion-item button (click)="selectSort('duration')">Sort by Duration</ion-item>
      <ion-item button (click)="selectSort('title')">Sort by Title</ion-item>
    </ion-list>
  `,
  standalone: true, // Указываем, что компонент является standalone
  imports: [IonicModule], // Добавляем IonicModule
})
export class SortPopoverComponent {
  constructor(private popoverController: PopoverController) {}

  selectSort(option: string) {
    // Закрываем поповер и передаём выбранный вариант
    this.popoverController.dismiss(option);
  }
}
