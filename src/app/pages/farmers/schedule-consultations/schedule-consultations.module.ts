import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleConsultationsPageRoutingModule } from './schedule-consultations-routing.module';

import { ScheduleConsultationsPage } from './schedule-consultations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleConsultationsPageRoutingModule
  ],
  declarations: [ScheduleConsultationsPage]
})
export class ScheduleConsultationsPageModule {}
