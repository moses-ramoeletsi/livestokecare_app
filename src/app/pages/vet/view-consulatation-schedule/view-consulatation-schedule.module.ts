import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewConsulatationSchedulePageRoutingModule } from './view-consulatation-schedule-routing.module';

import { ViewConsulatationSchedulePage } from './view-consulatation-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewConsulatationSchedulePageRoutingModule
  ],
  declarations: [ViewConsulatationSchedulePage]
})
export class ViewConsulatationSchedulePageModule {}
