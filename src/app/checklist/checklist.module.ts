import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistPageRoutingModule } from './checklist-routing.module';

import { ChecklistPage } from './checklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistPageRoutingModule
  ],
  declarations: [ChecklistPage]
})
export class ChecklistPageModule {}
