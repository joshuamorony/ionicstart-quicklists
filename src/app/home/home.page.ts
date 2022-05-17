import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  isAddingChecklist = false;

  constructor() {}

  openAddChecklistModal() {
    this.isAddingChecklist = true;
  }
}
