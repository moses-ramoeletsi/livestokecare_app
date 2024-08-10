import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostVideosPageRoutingModule } from './post-videos-routing.module';

import { PostVideosPage } from './post-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostVideosPageRoutingModule
  ],
  declarations: [PostVideosPage]
})
export class PostVideosPageModule {}
