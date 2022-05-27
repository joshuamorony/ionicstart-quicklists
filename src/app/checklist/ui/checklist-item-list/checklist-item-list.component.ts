import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonList } from '@ionic/angular';
import { ChecklistItem } from 'src/app/shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  templateUrl: './checklist-item-list.component.html',
  styleUrls: ['./checklist-item-list.component.scss'],
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
