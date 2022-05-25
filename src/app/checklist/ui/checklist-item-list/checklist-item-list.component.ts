import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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

  toggleItem(itemId: string) {
    this.toggle.emit(itemId);
  }

  trackByFn(index: number, item: ChecklistItem) {
    return item.id;
  }
}
