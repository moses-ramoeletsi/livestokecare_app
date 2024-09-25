import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserFeedbackPageRoutingModule } from './view-user-feedback-routing.module';

import { ViewUserFeedbackPage } from './view-user-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserFeedbackPageRoutingModule
  ],
  declarations: [ViewUserFeedbackPage]
})
export class ViewUserFeedbackPageModule {}
