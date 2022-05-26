import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { merge, Observable, Subject } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistListComponent } from './ui/checklist-list/checklist-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  // @ViewChild(ChecklistListComponent) checklistList!: ChecklistListComponent;
  // checklistIdBeingEdited$: Observable<string | boolean> | undefined;
  // currentlyEditing$ = new Subject<boolean>();

  checklists$ = this.checklistService.getChecklists();

  checklistForm = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private alertCtrl: AlertController
  ) {}

  // ngAfterViewInit() {
  //   this.checklistIdBeingEdited$ = merge(
  //     this.checklistList.edit,
  //     this.currentlyEditing$
  //   );
  // }

  addChecklist() {
    this.checklistService.add(this.checklistForm.value);
  }

  editChecklist(checklistId: string | boolean) {
    // this.checklistService.update(checklistId, this.checklistForm.value);
  }

  async deleteChecklist(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      subHeader: 'This will also delete all of the items for this checklist',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'confirm-delete-button',
          role: 'destructive',
          handler: () => {
            this.checklistService.remove(id);
          },
        },
        {
          text: 'Cancel',
          cssClass: 'cancel-delete-button',
          role: 'cancel',
        },
      ],
    });

    alert.present();
  }
}
