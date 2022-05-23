import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/checklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveChecklists(checklists: Checklist[]) {}

  saveChecklistItems(checklistItems: ChecklistItem[]) {}
}
