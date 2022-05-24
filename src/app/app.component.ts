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
    private storageService: StorageService,
    private checklistService: ChecklistService,
    private checklistItemService: ChecklistItemService
  ) {}

  async ngOnInit() {
    await this.storageService.init();
    this.checklistService.load();
    this.checklistItemService.load();
  }
}
