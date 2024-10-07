import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicKnowledgePageRoutingModule } from './basic-knowledge-routing.module';

import { BasicKnowledgePage } from './basic-knowledge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicKnowledgePageRoutingModule
  ],
  declarations: [BasicKnowledgePage]
})
export class BasicKnowledgePageModule {}
