import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetEventsPage } from './vet-events.page';

const routes: Routes = [
  {
    path: '',
    component: VetEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetEventsPageRoutingModule {}
