import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChecklistService } from '../shared/data-access/checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  checklist$ = this.route.paramMap.pipe(
    switchMap((paramMap) =>
      this.checklistService.getChecklistById(paramMap.get('id'))
    )
  );

  checklistItemForm = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private fb: FormBuilder
  ) {}

  addChecklistItem(checklistId: string) {
    this.checklistService.addItem(checklistId, this.checklistItemForm.value);
  }
}
