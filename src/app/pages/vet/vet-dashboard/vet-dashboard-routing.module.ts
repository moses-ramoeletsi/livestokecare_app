import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetDashboardPage } from './vet-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: VetDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetDashboardPageRoutingModule {}
