import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonRouterOutlet } from '@ionic/angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { ChecklistItem } from '../shared/interfaces/checklist-item';
import { ChecklistItemService } from './data-access/checklist-item.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  @ViewChild(IonContent) ionContent!: IonContent;

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklistItemIdBeingEdited$ = new BehaviorSubject<string | null>(null);

  checklistItemForm = this.fb.group({
    title: ['', Validators.required],
  });

  vm$ = this.route.paramMap.pipe(
    switchMap((paramMap) =>
      combineLatest([
        this.checklistService
          .getChecklistById(paramMap.get('id') as string)
          // just to please the TypeScript compiler for potentially undefined values
          .pipe(map((checklist) => checklist as Checklist)),
        this.checklistItemService
          .getItemsByChecklistId(paramMap.get('id') as string)
          .pipe(
            tap(() => setTimeout(() => this.ionContent?.scrollToBottom(200), 0))
          ),
        this.formModalIsOpen$,
        this.checklistItemIdBeingEdited$,
      ])
    ),
    map(([checklist, items, formModalIsOpen, checklistItemIdBeingEdited]) => ({
      checklist,
      items,
      formModalIsOpen,
      checklistItemIdBeingEdited,
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private checklistItemService: ChecklistItemService,
    private fb: FormBuilder,
    public routerOutlet: IonRouterOutlet
  ) {}

  addChecklistItem(checklistId: string) {
    this.checklistItemService.add(this.checklistItemForm.value, checklistId);
  }

  editChecklistItem(checklistItemId: string) {
    this.checklistItemService.update(
      checklistItemId,
      this.checklistItemForm.value
    );
  }

  openEditModal(checklistItem: ChecklistItem) {
    this.checklistItemForm.patchValue({
      title: checklistItem.title,
    });
    this.checklistItemIdBeingEdited$.next(checklistItem.id);
    this.formModalIsOpen$.next(true);
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
