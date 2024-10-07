import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicKnowledgePage } from './basic-knowledge.page';

const routes: Routes = [
  {
    path: '',
    component: BasicKnowledgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicKnowledgePageRoutingModule {}
