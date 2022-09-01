import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { StorageService } from '../../shared/data-access/storage.service';
import {
  AddChecklistItem,
  ChecklistItem,
} from '../../shared/interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  private checklistItems$ = new BehaviorSubject<ChecklistItem[]>([]);

  constructor(private storageService: StorageService) {}

  load() {
    this.storageService
      .loadChecklistItems()
      .pipe(take(1))
      .subscribe((checklistItems) => {
        this.checklistItems$.next(checklistItems);
      });
  }

  getItemsByChecklistId(checklistId: string) {
    return this.checklistItems$.pipe(
      map((items) => items.filter((item) => item.checklistId === checklistId)),
      tap(() =>
        this.storageService.saveChecklistItems(this.checklistItems$.value)
      )
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

  add(item: AddChecklistItem, checklistId: string) {
    const newItem = {
      id: Date.now().toString(),
      checklistId,
      checked: false,
      ...item,
    };

    this.checklistItems$.next([...this.checklistItems$.value, newItem]);
  }

  update(id: string, editedItem: AddChecklistItem) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.id === id ? { ...item, title: editedItem.title } : item
    );

    this.checklistItems$.next(newItems);
  }

  remove(id: string) {
    const modifiedItems = this.checklistItems$.value.filter(
      (item) => item.id !== id
    );

    this.checklistItems$.next(modifiedItems);
  }

  removeAllItemsForChecklist(checklistId: string) {
    const modifiedItems = this.checklistItems$.value.filter(
      (item) => item.checklistId !== checklistId
    );

    this.checklistItems$.next(modifiedItems);
  }
}
