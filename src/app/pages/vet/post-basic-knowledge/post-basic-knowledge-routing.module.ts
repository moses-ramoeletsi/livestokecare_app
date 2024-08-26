import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostBasicKnowledgePage } from './post-basic-knowledge.page';

const routes: Routes = [
  {
    path: '',
    component: PostBasicKnowledgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostBasicKnowladgePageRoutingModule {}
