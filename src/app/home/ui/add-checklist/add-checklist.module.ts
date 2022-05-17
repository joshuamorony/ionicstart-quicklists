import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddChecklistComponent } from './add-checklist.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [AddChecklistComponent],
  exports: [AddChecklistComponent],
})
export class AddChecklistComponentModule {}
