import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { PostingVideosService } from 'src/app/services/posting-videos.service';

@Component({
  selector: 'app-post-videos',
  templateUrl: './post-videos.page.html',
  styleUrls: ['./post-videos.page.scss'],
})
export class PostVideosPage implements OnInit {

    
  video= {
    video_title: '',
    description: '',
    videoUrl: '',
    authorId: '',
    authorName: '', 
  };
  userId: string | null = null;
  name: any;
  videos: any[] = [];
  constructor(private fireStore: PostingVideosService, private userAuth:  AngularFireAuth, 
    private alertController: AlertController) { }

  ngOnInit() {
    this.userAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log ('current user:', this.userId);
        this.fetchVetData(this.userId);
        this.getVideo();
      }
    });
  }
  fetchVetData(userId: string) {
    this.fireStore.getCurrentUserById(userId).then((userData) => {
    this.name = userData.name
    console.log('Facility Name:', this.name);
  }).catch(error => {
    console.error('Error fetching user data:', error);
  });
}
async addVideo() {
  try {
    const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
    const authorName = authorData.name || 'Unknown'; 

    this.video.authorId = this.userId || ''; 
    this.video.authorName = authorName;      


    await this.fireStore.postVideo(this.video);

    this.showAlert('Success', 'Video posted successfully!');
  
  } catch (error) {
    this.showAlert('Error', 'Error posting video!');
   
  }
}
  getVideo() {
   this.fireStore.fetchPostedVideo().subscribe((videos)=> {
    this.videos=videos;
   })
  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
  showAlert(title: string, message: string) {
    this.alertController
      .create({
        header: title,
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
}
