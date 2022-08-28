import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonContent, IonicModule, IonRouterOutlet } from '@ionic/angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { ChecklistItem } from '../shared/interfaces/checklist-item';
import { FormModalComponentModule } from '../shared/ui/form-modal/form-modal.module';
import { ChecklistItemService } from './data-access/checklist-item.service';
import { ChecklistItemListComponentModule } from './ui/checklist-item-list/checklist-item-list.component';

@Component({
  selector: 'app-checklist',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header class="ion-no-border">
        <ion-toolbar color="success">
          <ion-buttons slot="start">
            <ion-back-button
              color="light"
              data-test="checklist-back-button"
              defaultHref="/"
            ></ion-back-button>
          </ion-buttons>
          <ion-title data-test="checklist-detail-title">
            {{ vm.checklist.title }}
          </ion-title>
          <ion-buttons slot="end">
            <ion-button
              data-test="reset-items"
              (click)="resetChecklistItems(vm.checklist.id)"
            >
              <ion-icon name="refresh" slot="icon-only"></ion-icon>
            </ion-button>
            <ion-button
              data-test="add-checklist-item-button"
              (click)="formModalIsOpen$.next(true)"
            >
              <ion-icon name="add" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <app-checklist-item-list
          [checklistItems]="vm.items"
          (toggle)="toggleChecklistItem($event)"
          (delete)="deleteChecklistItem($event)"
          (edit)="openEditModal($event)"
        ></app-checklist-item-list>
      </ion-content>

      <ion-modal
        [isOpen]="vm.formModalIsOpen"
        [presentingElement]="routerOutlet.nativeEl"
        [canDismiss]="true"
        (ionModalDidDismiss)="
          checklistItemIdBeingEdited$.next(null); formModalIsOpen$.next(false)
        "
      >
        <ng-template>
          <app-form-modal
            [title]="
              vm.checklistItemIdBeingEdited ? 'Edit item' : 'Create item'
            "
            [formGroup]="checklistItemForm"
            (save)="
              vm.checklistItemIdBeingEdited
                ? editChecklistItem(vm.checklistItemIdBeingEdited)
                : addChecklistItem(vm.checklist.id)
            "
          ></app-form-modal>
        </ng-template>
      </ion-modal>
    </ng-container>
  `,
  styles: [
    `
      ion-header {
        background-color: var(--ion-color-primary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent {
  @ViewChild(IonContent) ionContent!: IonContent;

  checklistItemForm = this.fb.group({
    title: ['', Validators.required],
  });

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklistItemIdBeingEdited$ = new BehaviorSubject<string | null>(null);
  checklistAndItems$ = this.route.paramMap.pipe(
    switchMap((params) =>
      combineLatest([
        this.checklistService
          .getChecklistById(params.get('id') as string)
          .pipe(filter((checklist): checklist is Checklist => !!checklist)),
        this.checklistItemService
          .getItemsByChecklistId(params.get('id') as string)
          .pipe(
            tap(() => setTimeout(() => this.ionContent?.scrollToBottom(200), 0))
          ),
      ])
    )
  );

  vm$ = combineLatest([
    this.checklistAndItems$,
    this.formModalIsOpen$,
    this.checklistItemIdBeingEdited$,
  ]).pipe(
    map(
      ([[checklist, items], formModalIsOpen, checklistItemIdBeingEdited]) => ({
        checklist,
        items,
        formModalIsOpen,
        checklistItemIdBeingEdited,
      })
    )
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

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChecklistComponent,
      },
    ]),
    FormModalComponentModule,
    ChecklistItemListComponentModule,
  ],
  declarations: [ChecklistComponent],
})
export class ChecklistComponentModule {}
