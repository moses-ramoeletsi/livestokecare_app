import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostBasicKnowladgePage } from './post-basic-knowladge.page';

const routes: Routes = [
  {
    path: '',
    component: PostBasicKnowladgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostBasicKnowladgePageRoutingModule {}
