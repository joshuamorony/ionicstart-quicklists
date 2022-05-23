import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  async saveChecklists(checklists: Checklist[]) {
    this.storage?.set('checklists', checklists);
  }

  async saveChecklistItems(checklistItems: ChecklistItem[]) {
    this.storage?.set('checklistItems', checklistItems);
  }
}
