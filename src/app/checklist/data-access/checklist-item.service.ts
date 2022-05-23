import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChecklistItem } from 'src/app/shared/interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  private checklistItems$ = new BehaviorSubject<ChecklistItem[]>([]);

  constructor() {}

  getItemsByChecklistId(checklistId: string) {
    return this.checklistItems$.pipe(
      map((items) => items.filter((item) => item.checklistId === checklistId))
    );
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
