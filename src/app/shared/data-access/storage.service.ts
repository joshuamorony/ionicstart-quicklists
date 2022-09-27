import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  #checklistHasLoaded = false;
  #checklistItemsHasLoaded = false;

  storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));

  loadChecklists$: Observable<Checklist[]> = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklists'))),
    map((checklists) => checklists ?? []),
    tap(() => (this.#checklistHasLoaded = true)),
    shareReplay(1)
  );

  loadChecklistItems$: Observable<ChecklistItem[]> = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklistItems'))),
    map((checklistItems) => checklistItems ?? []),
    tap(() => (this.#checklistItemsHasLoaded = true)),
    shareReplay(1)
  );

  constructor(private ionicStorage: Storage) {}

  saveChecklists(checklists: Checklist[]) {
    if (this.#checklistHasLoaded) {
      this.storage$.pipe(take(1)).subscribe((storage) => {
        storage.set('checklists', checklists);
      });
    }
  }

  saveChecklistItems(checklistItems: ChecklistItem[]) {
    if (this.#checklistItemsHasLoaded) {
      this.storage$.pipe(take(1)).subscribe((storage) => {
        storage.set('checklistItems', checklistItems);
      });
    }
  }
}
