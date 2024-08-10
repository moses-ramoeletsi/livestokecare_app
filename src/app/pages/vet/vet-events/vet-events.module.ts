import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetEventsPageRoutingModule } from './vet-events-routing.module';

import { VetEventsPage } from './vet-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VetEventsPageRoutingModule
  ],
  declarations: [VetEventsPage]
})
export class VetEventsPageModule {}
