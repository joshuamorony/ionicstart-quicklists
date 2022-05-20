import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistPageRoutingModule } from './checklist-routing.module';

import { ChecklistPage } from './checklist.page';
import { FormModalComponentModule } from '../shared/ui/form-modal/form-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistPageRoutingModule,
    FormModalComponentModule,
  ],
  declarations: [ChecklistPage],
})
export class ChecklistPageModule {}
