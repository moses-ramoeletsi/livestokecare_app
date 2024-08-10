import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmersProfilePageRoutingModule } from './farmers-profile-routing.module';

import { FarmersProfilePage } from './farmers-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmersProfilePageRoutingModule
  ],
  declarations: [FarmersProfilePage]
})
export class FarmersProfilePageModule {}
