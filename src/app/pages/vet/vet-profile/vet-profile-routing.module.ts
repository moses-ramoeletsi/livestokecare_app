import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetProfilePage } from './vet-profile.page';

const routes: Routes = [
  {
    path: '',
    component: VetProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetProfilePageRoutingModule {}
