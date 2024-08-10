import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterVetPageRoutingModule } from './register-vet-routing.module';

import { RegisterVetPage } from './register-vet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterVetPageRoutingModule
  ],
  declarations: [RegisterVetPage]
})
export class RegisterVetPageModule {}
