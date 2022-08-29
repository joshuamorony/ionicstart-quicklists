import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChecklistItemService } from './checklist/data-access/checklist-item.service';
import { ChecklistService } from './shared/data-access/checklist.service';
import { StorageService } from './shared/data-access/storage.service';

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

  async ngOnInit() {
    this.checklistService.load();
    this.checklistItemService.load();
  }
}
