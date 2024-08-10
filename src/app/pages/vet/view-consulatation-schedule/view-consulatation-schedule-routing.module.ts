import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewConsulatationSchedulePage } from './view-consulatation-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ViewConsulatationSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewConsulatationSchedulePageRoutingModule {}
