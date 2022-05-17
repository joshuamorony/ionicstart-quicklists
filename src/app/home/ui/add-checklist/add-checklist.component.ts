import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddChecklistComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
