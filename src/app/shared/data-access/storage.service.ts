import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));

  loadChecklists$ = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklists'))),
    map((checklists) => checklists ?? []),
    shareReplay(1)
  );

  loadChecklistItems$ = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklistItems'))),
    map((checklistItems) => checklistItems ?? []),
    shareReplay(1)
  );

  constructor(private ionicStorage: Storage) {}

  saveChecklists(checklists: Checklist[]) {
    // We don't need/use the loadChecklists$ stream here we just want to make
    // sure it has emitted before we try to save data to storage
    this.loadChecklists$
      .pipe(
        switchMap(() => this.storage$),
        take(1)
      )
      .subscribe((storage) => {
        storage.set('checklists', checklists);
      });
  }

  saveChecklistItems(checklistItems: ChecklistItem[]) {
    this.loadChecklistItems$
      .pipe(
        switchMap(() => this.storage$),
        take(1)
      )
      .subscribe((storage) => {
        storage.set('checklistItems', checklistItems);
      });
  }
}
