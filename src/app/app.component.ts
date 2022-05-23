import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChecklistItemService } from './checklist/data-access/checklist-item.service';
import { ChecklistService } from './shared/data-access/checklist.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private checklistService: ChecklistService,
    private checklistItemService: ChecklistItemService
  ) {}

  ngOnInit() {
    this.checklistService.load();
    this.checklistItemService.load();
  }
}
