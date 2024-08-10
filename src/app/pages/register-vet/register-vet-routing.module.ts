import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterVetPage } from './register-vet.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterVetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterVetPageRoutingModule {}
