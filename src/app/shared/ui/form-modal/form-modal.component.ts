import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormModalComponent {
  @Input() title: string;
  @Input() formGroup: FormGroup;

  @Output() save = new EventEmitter<boolean>();

  constructor() {}
}
