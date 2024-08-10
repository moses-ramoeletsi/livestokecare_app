import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicKnowladgePageRoutingModule } from './basic-knowladge-routing.module';

import { BasicKnowladgePage } from './basic-knowladge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicKnowladgePageRoutingModule
  ],
  declarations: [BasicKnowladgePage]
})
export class BasicKnowladgePageModule {}
