import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Checklist, ChecklistItem } from '../interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  constructor() {}

  getChecklists() {
    return this.checklists$.asObservable();
  }

  getChecklistById(id: string) {
    return this.getChecklists().pipe(
      map((checklists) => checklists.find((checklist) => checklist.id === id))
    );
  }

  add(checklist: Omit<Checklist, 'id'>) {
    const newChecklist = {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  addItem(checklistId: string, checklistItem: ChecklistItem) {}

  private generateSlug(title: string) {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // Check if the slug already exists
    const matchingSlugs = this.checklists$.value.find(
      (checklist) => checklist.id === slug
    );

    // If the title is already being used, add a string to make the slug unique
    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
