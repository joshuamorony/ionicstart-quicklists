import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;
  private checklistsLoaded = false;
  private checklistItemsLoaded = false;

  constructor(private ionicStorage: Storage) {}

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  async loadChecklists(): Promise<Checklist[]> {
    const checklists = (await this.storage?.get('checklists')) ?? [];
    this.checklistsLoaded = true;

    return checklists;
  }

  async saveChecklists(checklists: Checklist[]) {
    if (this.checklistsLoaded) {
      this.storage?.set('checklists', checklists);
    }
  }

  async loadChecklistItems(): Promise<ChecklistItem[]> {
    const checklistItems = (await this.storage?.get('checklistItems')) ?? [];
    this.checklistItemsLoaded = true;

    return checklistItems;
  }

  async saveChecklistItems(checklistItems: ChecklistItem[]) {
    if (this.checklistItemsLoaded) {
      this.storage?.set('checklistItems', checklistItems);
    }
  }
}
