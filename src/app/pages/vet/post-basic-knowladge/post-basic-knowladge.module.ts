import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostBasicKnowladgePageRoutingModule } from './post-basic-knowladge-routing.module';

import { PostBasicKnowladgePage } from './post-basic-knowladge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostBasicKnowladgePageRoutingModule
  ],
  declarations: [PostBasicKnowladgePage]
})
export class PostBasicKnowladgePageModule {}
