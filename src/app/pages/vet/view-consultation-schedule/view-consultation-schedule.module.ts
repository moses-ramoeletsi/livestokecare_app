import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewConsultationSchedulePageRoutingModule } from './view-consultation-schedule-routing.module';

import { ViewConsultationSchedulePage } from './view-consultation-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewConsultationSchedulePageRoutingModule
  ],
  declarations: [ViewConsultationSchedulePage]
})
export class ViewConsultationSchedulePageModule {}
