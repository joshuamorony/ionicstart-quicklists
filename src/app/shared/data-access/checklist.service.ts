import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Checklist } from '../interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  constructor() {}

  getChecklists() {
    return this.checklists$.asObservable();
  }

  add(checklist: Checklist) {
    this.checklists$.next([...this.checklists$.value, checklist]);
  }
}
