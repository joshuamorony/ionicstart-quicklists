import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonList } from '@ionic/angular';
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
