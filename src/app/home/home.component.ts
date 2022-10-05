import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AlertController,
  IonContent,
  IonicModule,
  IonRouterOutlet,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { AddChecklist, Checklist } from '../shared/interfaces/checklist';
import { FormModalComponentModule } from '../shared/ui/form-modal/form-modal.component';
import { ChecklistListComponentModule } from './ui/checklist-list/checklist-list.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>
          <img src="assets/logo.svg" />
        </ion-title>
        <ion-buttons slot="end">
          <ion-button
            data-test="add-checklist-button"
            (click)="formModalIsOpen$.next(true)"
          >
            <ion-icon name="add" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title color="light" size="large">Your lists</ion-title>
        </ion-toolbar>
      </ion-header>

      <app-checklist-list
        *ngIf="checklists$ | async as checklists"
        [checklists]="checklists"
        (delete)="deleteChecklist($event)"
        (edit)="openEditModal($event)"
      ></app-checklist-list>

      <ion-modal
        *ngIf="{
          checklistIdBeingEdited: checklistIdBeingEdited$ | async,
          isOpen: formModalIsOpen$ | async
        } as vm"
        [isOpen]="vm.isOpen"
        [canDismiss]="true"
        [presentingElement]="routerOutlet.nativeEl"
        (ionModalDidDismiss)="
          formModalIsOpen$.next(false); checklistIdBeingEdited$.next(null)
        "
      >
        <ng-template>
          <app-form-modal
            [title]="
              vm.checklistIdBeingEdited ? 'Edit checklist' : 'Create checklist'
            "
            [formGroup]="checklistForm"
            (save)="
              vm.checklistIdBeingEdited
                ? editChecklist(vm.checklistIdBeingEdited)
                : addChecklist()
            "
          ></app-form-modal>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @ViewChild(IonContent) ionContent!: IonContent;

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklistIdBeingEdited$ = new BehaviorSubject<string | null>(null);

  checklists$ = this.checklistService.getChecklists().pipe(
    tap(() => {
      setTimeout(() => {
        this.ionContent.scrollToBottom(200);
      }, 0);
    })
  );

  checklistForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private alertCtrl: AlertController,
    public routerOutlet: IonRouterOutlet
  ) {}

  addChecklist() {
    this.checklistService.add(this.checklistForm.getRawValue());
  }

  openEditModal(checklist: Checklist) {
    this.checklistForm.patchValue({
      title: checklist.title,
    });
    this.checklistIdBeingEdited$.next(checklist.id);
    this.formModalIsOpen$.next(true);
  }

  editChecklist(checklistId: string) {
    this.checklistService.update({
      id: checklistId,
      editedData: this.checklistForm.getRawValue(),
    });
  }

  async deleteChecklist(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      subHeader: 'This will also delete all of the items for this checklist',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'confirm-delete-button',
          role: 'destructive',
          handler: () => {
            this.checklistService.remove(id);
          },
        },
        {
          text: 'Cancel',
          cssClass: 'cancel-delete-button',
          role: 'cancel',
        },
      ],
    });

    alert.present();
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    ReactiveFormsModule,
    IonicModule,
    FormModalComponentModule,
    ChecklistListComponentModule,
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}
