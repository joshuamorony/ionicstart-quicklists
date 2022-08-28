import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Checklist } from '../../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-item-header',
  template: `
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
          {{ checklist.title }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button
            data-test="reset-items"
            (click)="resetChecklist.emit(checklist.id)"
          >
            <ion-icon name="refresh" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button
            data-test="add-checklist-item-button"
            (click)="addItem.emit()"
          >
            <ion-icon name="add" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
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
export class ChecklistItemHeaderComponent {
  @Input() checklist!: Checklist;
  @Output() resetChecklist = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<void>();
}

@NgModule({
  declarations: [ChecklistItemHeaderComponent],
  exports: [ChecklistItemHeaderComponent],
  imports: [IonicModule],
})
export class ChecklistItemHeaderModule {}
