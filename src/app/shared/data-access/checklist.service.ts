import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  constructor() {}

  add(checklist: Checklist) {}
}
