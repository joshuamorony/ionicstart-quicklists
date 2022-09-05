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
import { IonicModule, IonList } from '@ionic/angular';
import { ChecklistItem } from '../../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  template: `
    <ion-list lines="none">
      <ion-item-sliding
        side="end"
        *ngFor="let item of checklistItems; trackBy: trackByFn"
      >
        <ion-item
          data-test="checklist-list-item"
          (click)="toggleItem(item.id)"
          color="success"
        >
          <ion-label>{{ item.title }}</ion-label>
          <ion-checkbox
            color="light"
            data-test="checklist-item-checkbox"
            slot="end"
            [checked]="item.checked"
          ></ion-checkbox>
        </ion-item>

        <ion-item-options>
          <ion-item-option
            data-test="edit-checklist-item"
            color="light"
            (click)="edit.emit(item); closeItems()"
          >
            <ion-icon name="pencil-outline" slot="icon-only"></ion-icon>
          </ion-item-option>
          <ion-item-option
            color="danger"
            data-test="delete-checklist-item"
            (click)="delete.emit(item.id); closeItems()"
          >
            <ion-icon name="trash" slot="icon-only"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
      <ion-card
        *ngIf="checklistItems.length === 0"
        data-test="no-items-message"
      >
        <ion-card-header>
          <h2>Add an item</h2>
        </ion-card-header>
        <ion-card-content>
          <p>Click the add button to add your first item to this quicklist</p>
        </ion-card-content>
      </ion-card>
    </ion-list>
  `,
  styles: [
    `
      ion-label {
        font-weight: bold;
        margin: 20px;
        white-space: normal;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistItemListComponent {
  @Input() checklistItems!: ChecklistItem[];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<ChecklistItem>();

  @ViewChild(IonList) itemList!: IonList;

  toggleItem(itemId: string) {
    this.toggle.emit(itemId);
  }

  async closeItems() {
    await this.itemList.closeSlidingItems();
  }

  trackByFn(index: number, item: ChecklistItem) {
    return item.id;
  }
}

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ChecklistItemListComponent],
  exports: [ChecklistItemListComponent],
})
export class ChecklistItemListComponentModule {}
