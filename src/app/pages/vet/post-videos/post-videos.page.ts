import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { PostingVideosService } from 'src/app/services/posting-videos.service';

@Component({
  selector: 'app-post-videos',
  templateUrl: './post-videos.page.html',
  styleUrls: ['./post-videos.page.scss'],
})
export class PostVideosPage implements OnInit {
   
  video= {
    id:'',
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
async addVideo(modal: IonModal) {
  try {
    const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
    const authorName = authorData.name || 'Unknown'; 

    this.video.authorId = this.userId || ''; 
    this.video.authorName = authorName;      

    if (this.video.id) {
      await this.fireStore.updateVideoPost(this.video);
      this.showAlert('Success', 'Video updated successfully!');
    } else {
      await this.fireStore.postVideo(this.video);
      this.showAlert('Success', 'Video posted successfully!');    
    }

    this.restForm(modal);

    await modal.dismiss();

  } catch (error) {
    this.showAlert('Error', 'Error posting knowledge!');
  }
}

restForm(modal: IonModal) {
  this.video = {
    id: '',
    video_title: '',
    description: '',
    videoUrl: '',
    authorId: '',
    authorName: '', 
  };
  modal.dismiss();
}
  getVideo() {
   this.fireStore.fetchPostedVideo().subscribe((videos)=> {
    this.videos=videos;
   })
  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
  async editPost(video: any, modal: IonModal) {
    this.restForm(modal);
    this.video = {
      id: video.id, 
      video_title: video.video_title,
      description: video.description,
      videoUrl: video.videoUrl,
      authorName: video.authorName,
      authorId: video.authorId,
    };
  
    await modal.present();
  }
  
  
  
  async deletePost(video: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the video for ${video.video_title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.fireStore.deleteVideoPost(video);
              this.showAlert('Success', 'video  deleted successfully!');
            } catch (error) {
              this.showAlert('Error', 'Error deleting video!');
            }
          }
        }
      ]
    });
  
    await alert.present();
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
