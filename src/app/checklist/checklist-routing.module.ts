import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistPage } from './checklist.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistPageRoutingModule {}
