import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllOrdersPageRoutingModule } from './view-all-orders-routing.module';

import { ViewAllOrdersPage } from './view-all-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllOrdersPageRoutingModule
  ],
  declarations: [ViewAllOrdersPage]
})
export class ViewAllOrdersPageModule {}
