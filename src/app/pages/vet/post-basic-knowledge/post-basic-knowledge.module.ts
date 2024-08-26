import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostBasicKnowladgePageRoutingModule } from './post-basic-knowledge-routing.module';

import { PostBasicKnowledgePage } from './post-basic-knowledge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostBasicKnowladgePageRoutingModule
  ],
  declarations: [PostBasicKnowledgePage]
})
export class PostBasicKnowladgePageModule {}
