import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmersProfilePage } from './farmers-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FarmersProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmersProfilePageRoutingModule {}
