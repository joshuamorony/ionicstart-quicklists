import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveChecklists(checklists: Checklist[]) {}
}
