import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { Checklist } from '../interfaces/checklist';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  // This is out data source where we will emit the latest state
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  // This is what we will use to consume the checklist data throughout the app
  private sharedChecklists$: Observable<Checklist[]> = this.checklists$.pipe(
    // Trigger a save whenever this stream emits new data
    tap((checklists) => this.storageService.saveChecklists(checklists)),
    // Share this stream with multiple subscribers, instead of creating a new one for each
    shareReplay(1)
  );

  constructor(private storageService: StorageService) {}

  async load() {
    const checklists = await this.storageService.loadChecklists();
    this.checklists$.next(checklists);
  }

  getChecklists() {
    return this.sharedChecklists$;
  }

  getChecklistById(id: string) {
    return this.getChecklists().pipe(
      filter((checklists) => checklists.length > 0), // don't emit if checklists haven't loaded yet
      map((checklists) => checklists.find((checklist) => checklist.id === id))
    );
  }

  add(checklist: Pick<Checklist, 'title'>) {
    const newChecklist = {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  remove(id: string) {}

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
