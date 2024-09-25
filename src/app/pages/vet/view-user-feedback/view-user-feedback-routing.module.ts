import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserFeedbackPage } from './view-user-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUserFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserFeedbackPageRoutingModule {}
