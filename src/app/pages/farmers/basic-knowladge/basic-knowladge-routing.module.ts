import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicKnowladgePage } from './basic-knowladge.page';

const routes: Routes = [
  {
    path: '',
    component: BasicKnowladgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicKnowladgePageRoutingModule {}
