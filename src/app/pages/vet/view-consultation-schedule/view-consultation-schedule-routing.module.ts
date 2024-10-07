import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewConsultationSchedulePage } from './view-consultation-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ViewConsultationSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewConsultationSchedulePageRoutingModule {}
