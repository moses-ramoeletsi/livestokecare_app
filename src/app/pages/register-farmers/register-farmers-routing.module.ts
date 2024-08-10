import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFarmersPage } from './register-farmers.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFarmersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFarmersPageRoutingModule {}
