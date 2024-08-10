import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetDashboardPageRoutingModule } from './vet-dashboard-routing.module';

import { VetDashboardPage } from './vet-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VetDashboardPageRoutingModule
  ],
  declarations: [VetDashboardPage]
})
export class VetDashboardPageModule {}
