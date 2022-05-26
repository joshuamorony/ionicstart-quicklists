import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  checklists$ = this.checklistService.getChecklists();

  checklistForm = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  addChecklist() {
    this.checklistService.add(this.checklistForm.value);
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

  async editChecklist(id: string) {
    const formModal = await this.modalCtrl.create({
      component: FormModalComponent,
      componentProps: {},
    });

    formModal.present();
  }
}
