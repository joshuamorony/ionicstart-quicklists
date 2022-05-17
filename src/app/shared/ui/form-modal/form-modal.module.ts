import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormModalComponent } from './form-modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [FormModalComponent],
  exports: [FormModalComponent],
})
export class FormModalComponentModule {}
