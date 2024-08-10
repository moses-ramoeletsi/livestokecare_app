import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmersDashboardPageRoutingModule } from './farmers-dashboard-routing.module';

import { FarmersDashboardPage } from './farmers-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmersDashboardPageRoutingModule
  ],
  declarations: [FarmersDashboardPage]
})
export class FarmersDashboardPageModule {}
