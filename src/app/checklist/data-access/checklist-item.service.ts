import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from '../../shared/data-access/storage.service';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  private checklistItems$ = new BehaviorSubject<ChecklistItem[]>([]);

  constructor(private storageService: StorageService) {}

  async load() {
    const checklistItems = await this.storageService.loadChecklistItems();
    this.checklistItems$.next(checklistItems);
  }

  getItemsByChecklistId(checklistId: string) {
    return this.checklistItems$.pipe(
      map((items) => items.filter((item) => item.checklistId === checklistId)),
      tap((items) => this.storageService.saveChecklistItems(items))
    );
  }

  reset(checklistId: string) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.checklistId === checklistId ? { ...item, checked: false } : item
    );

    this.checklistItems$.next(newItems);
  }

  toggle(itemId: string) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );

    this.checklistItems$.next(newItems);
  }

  add(item: Pick<ChecklistItem, 'title'>, checklistId: string) {
    const newItem = {
      id: Date.now().toString(),
      checklistId,
      checked: false,
      ...item,
    };

    this.checklistItems$.next([...this.checklistItems$.value, newItem]);
  }
}
