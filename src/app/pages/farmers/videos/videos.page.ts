import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  videos = [
    { title: 'Video 1', url: 'https://www.example.com/video1' },
    { title: 'Video 2', url: 'https://www.example.com/video2' },
  ];

  playVideo(url: string) {
    window.open(url, '_blank');
  }
}
