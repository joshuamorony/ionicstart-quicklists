import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddChecklistComponent {
  checklistForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private modalCtrl: ModalController) {}

  save() {
    this.modalCtrl.dismiss(this.checklistForm.value);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
