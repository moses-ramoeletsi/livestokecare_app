import { Component, OnInit } from '@angular/core';
import { PostingVideosService } from 'src/app/services/posting-videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  video= {
    video_title: '',
    description: '',
    videoUrl: '',
    authorId: '',
    authorName: '', 
  };
  videos: any[] = [];
  constructor(private fireStore: PostingVideosService) { }

  ngOnInit() {
    this.getVideo();
  }
  getVideo() {
   this.fireStore.fetchPostedVideo().subscribe((videos)=>{
    this.videos =videos;
   })
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
