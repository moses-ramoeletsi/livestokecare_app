import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { PostingVideosService } from 'src/app/services/posting-videos.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-videos',
  templateUrl: './post-videos.page.html',
  styleUrls: ['./post-videos.page.scss'],
})
export class PostVideosPage implements OnInit {
   
  video = {
    id: '',
    video_title: '',
    description: '',
    videoUrl: '',
    authorId: '',
    authorName: '', 
  };
  userId: string | null = null;
  name: any;
  videos: any[] = [];
  selectedFile: File | null = null;
  uploadProgress: number = 0;

  constructor(
    private fireStore: PostingVideosService, 
    private userAuth: AngularFireAuth, 
    private alertController: AlertController,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.userAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log('current user:', this.userId);
        this.fetchVetData(this.userId);
        this.getVideo();
      }
    });
  }

  fetchVetData(userId: string) {
    this.fireStore.getCurrentUserById(userId).then((userData) => {
      this.name = userData.name;
    }).catch(error => {
      console.error('Error fetching user data:', error);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  async addVideo(modal: IonModal) {
    try {
      const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
      const authorName = authorData.name || 'Unknown'; 

      this.video.authorId = this.userId || ''; 
      this.video.authorName = authorName;      

      if (this.selectedFile) {
        const filePath = `videos/${new Date().getTime()}_${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);

        task.percentageChanges().subscribe((percentage) => {
          this.uploadProgress = percentage || 0;
        });

        task.snapshotChanges().pipe(
          finalize(async () => {
            this.video.videoUrl = await fileRef.getDownloadURL().toPromise();
            await this.saveVideo(modal);
          })
        ).subscribe();
      } else {
        await this.saveVideo(modal);
      }
    } catch (error) {
      this.showAlert('Error', 'Error posting video!');
    }
  }

  async saveVideo(modal: IonModal) {
    if (this.video.id) {
      await this.fireStore.updateVideoPost(this.video);
      this.showAlert('Success', 'Video updated successfully!');
    } else {
      await this.fireStore.postVideo(this.video);
      this.showAlert('Success', 'Video posted successfully!');    
    }

    this.resetForm(modal);
    await modal.dismiss();
  }

  resetForm(modal: IonModal) {
    this.video = {
      id: '',
      video_title: '',
      description: '',
      videoUrl: '',
      authorId: '',
      authorName: '', 
    };
    this.selectedFile = null;
    this.uploadProgress = 0;
    modal.dismiss();
  }

  getVideo() {
    this.fireStore.fetchPostedVideo().subscribe((videos) => {
      this.videos = videos;
    });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  async editPost(video: any, modal: IonModal) {
    this.resetForm(modal);
    this.video = { ...video };
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
              if (video.videoUrl) {
                await this.storage.refFromURL(video.videoUrl).delete().toPromise();
              }
              this.showAlert('Success', 'Video deleted successfully!');
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

  downloadVideo(videoUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = fileName;
    link.click();
  }
}
