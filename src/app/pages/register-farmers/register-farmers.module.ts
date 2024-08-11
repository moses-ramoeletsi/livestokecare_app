import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFarmersPageRoutingModule } from './register-farmers-routing.module';

import { RegisterFarmersPage } from './register-farmers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterFarmersPageRoutingModule
  ],
  declarations: [RegisterFarmersPage]
})
export class RegisterFarmersPageModule {}
