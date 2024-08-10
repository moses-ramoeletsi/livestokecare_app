import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostVideosPage } from './post-videos.page';

const routes: Routes = [
  {
    path: '',
    component: PostVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostVideosPageRoutingModule {}
