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

  add(item: Omit<ChecklistItem, 'id' | 'checklistId'>, checklistId: string) {
    const newItem = {
      id: Date.now().toString(),
      checklistId,
      ...item,
    };

    this.checklistItems$.next([...this.checklistItems$.value, newItem]);
  }
}
