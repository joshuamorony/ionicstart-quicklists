import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[] | null;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  constructor() {}

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }
}
