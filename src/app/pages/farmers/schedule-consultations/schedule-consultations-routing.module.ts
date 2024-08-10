import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleConsultationsPage } from './schedule-consultations.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleConsultationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleConsultationsPageRoutingModule {}
