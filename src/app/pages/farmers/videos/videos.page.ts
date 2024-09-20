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

  downloadVideo(videoUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = fileName;
    link.click();
  }
}
