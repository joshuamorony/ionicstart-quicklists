import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, IonList } from '@ionic/angular';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  template: `
    <ion-list lines="none">
      <ion-item-sliding
        *ngFor="let checklist of checklists; trackBy: trackByFn"
      >
        <ion-item
          data-test="checklist-item"
          button
          routerLink="/checklist/{{ checklist.id }}"
          routerDirection="forward"
        >
          <ion-label>{{ checklist.title }}</ion-label>
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option
            color="light"
            (click)="edit.emit(checklist); closeItems()"
            data-test="edit-checklist"
          >
            <ion-icon name="pencil-outline" slot="icon-only"></ion-icon>
          </ion-item-option>
          <ion-item-option
            (click)="delete.emit(checklist.id); closeItems()"
            color="danger"
            data-test="delete-checklist"
          >
            <ion-icon name="trash" slot="icon-only"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
      <ion-card
        *ngIf="checklists.length === 0"
        data-test="no-checklists-message"
      >
        <ion-card-header>
          <h2>Welcome!</h2>
        </ion-card-header>
        <ion-card-content>
          <p>Click the add button to create your first quicklist</p>
        </ion-card-content>
      </ion-card>
    </ion-list>
  `,
  styles: [
    `
      ion-item-sliding {
        background-color: var(--ion-color-light);
        border-radius: 5px;
        margin: 10px 0 10px 10px;
        box-shadow: -2px 4px 4px 0px rgba(235, 68, 90, 0.1);
        overflow: visible;
      }

      ion-item-options {
        padding-right: 5px;
      }

      ion-label {
        font-size: 1.2em;
        font-weight: bold;
        color: var(--ion-color-dark);
        padding-top: 10px;
        padding-bottom: 10px;
      }

      ion-item {
        border-radius: 5px;
        border-left: 4px solid var(--ion-color-tertiary);
        padding-right: 5px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Checklist>();

  @ViewChild(IonList) checklistList!: IonList;

  constructor() {}

  async closeItems() {
    await this.checklistList.closeSlidingItems();
  }

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  declarations: [ChecklistListComponent],
  exports: [ChecklistListComponent],
})
export class ChecklistListComponentModule {}
