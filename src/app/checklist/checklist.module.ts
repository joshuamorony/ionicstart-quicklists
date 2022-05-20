import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistPageRoutingModule } from './checklist-routing.module';

import { ChecklistPage } from './checklist.page';
import { FormModalComponentModule } from '../shared/ui/form-modal/form-modal.module';
import { ChecklistItemListComponentModule } from './ui/checklist-item-list/checklist-item-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistPageRoutingModule,
    FormModalComponentModule,
    ChecklistItemListComponentModule,
  ],
  declarations: [ChecklistPage],
})
export class ChecklistPageModule {}
