import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistItemListComponent } from './checklist-item-list.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [ChecklistItemListComponent],
  exports: [ChecklistItemListComponent]
})
export class ChecklistItemListComponentModule {}
