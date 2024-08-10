import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetProfilePageRoutingModule } from './vet-profile-routing.module';

import { VetProfilePage } from './vet-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VetProfilePageRoutingModule
  ],
  declarations: [VetProfilePage]
})
export class VetProfilePageModule {}
