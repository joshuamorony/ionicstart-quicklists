import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { ChecklistItemService } from './data-access/checklist-item.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  vm$ = this.route.paramMap.pipe(
    switchMap((paramMap) =>
      combineLatest([
        this.checklistService
          .getChecklistById(paramMap.get('id') as string)
          // just to please the TypeScript compiler for potentially undefined values
          .pipe(map((checklist) => checklist as Checklist)),
        this.checklistItemService.getItemsByChecklistId(
          paramMap.get('id') as string
        ),
      ])
    ),
    map(([checklist, items]) => ({ checklist, items }))
  );

  checklistItemForm = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private checklistItemService: ChecklistItemService,
    private fb: FormBuilder
  ) {}

  addChecklistItem(checklistId: string) {
    this.checklistItemService.add(this.checklistItemForm.value, checklistId);
  }

  toggleChecklistItem(itemId: string) {
    this.checklistItemService.toggle(itemId);
  }

  resetChecklistItems(checklistId: string) {
    this.checklistItemService.reset(checklistId);
  }

  deleteChecklistItem(id: string) {
    this.checklistItemService.remove(id);
  }
}
