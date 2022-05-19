import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistListComponent } from './checklist-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  declarations: [ChecklistListComponent],
  exports: [ChecklistListComponent],
})
export class ChecklistListComponentModule {}
