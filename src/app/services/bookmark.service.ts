import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarksChanged = new EventEmitter<void>(); // Событие для уведомления об изменениях

  notifyChange() {
    this.bookmarksChanged.emit();
  }
}
