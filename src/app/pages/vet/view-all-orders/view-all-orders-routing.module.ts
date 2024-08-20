import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllOrdersPage } from './view-all-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllOrdersPageRoutingModule {}
