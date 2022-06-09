import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormModalComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;

  @Output() save = new EventEmitter<boolean>();

  constructor(private modalCtrl: ModalController) {}

  handleSave() {
    this.save.emit(true);
    this.dismiss({
      didSave: true,
    });
  }

  dismiss(data?: any) {
    if (data) {
      this.modalCtrl.dismiss(data);
    } else {
      this.modalCtrl.dismiss();
    }
  }
}
