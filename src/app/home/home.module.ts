import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FormModalComponentModule } from '../shared/ui/form-modal/form-modal.module';
import { ChecklistListComponentModule } from './ui/checklist-list/checklist-list.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormModalComponentModule,
    ChecklistListComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
