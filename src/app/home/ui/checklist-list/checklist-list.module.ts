import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistListComponent } from './checklist-list.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [ChecklistListComponent],
  exports: [ChecklistListComponent]
})
export class ChecklistListComponentModule {}
