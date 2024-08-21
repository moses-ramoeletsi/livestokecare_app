import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { BasicKnowladgeService } from 'src/app/services/basic-knowladge.service';

@Component({
  selector: 'app-post-basic-knowladge',
  templateUrl: './post-basic-knowladge.page.html',
  styleUrls: ['./post-basic-knowladge.page.scss'],
})
export class PostBasicKnowladgePage implements OnInit {

  article= {
    id:'',
    article_title: '',
    description: '',
    articleUrl: '',
    authorId: '',
    authorName: '', 
  };
  userId: string | null = null;
  name: any;
  articles: any[] = [];
  constructor(
    private userAuth:  AngularFireAuth, 
    private fireStore: BasicKnowladgeService,
    private alertController: AlertController
  
  ) { }

  ngOnInit() {
    this.userAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log ('current user:', this.userId);
        this.fetchVetData(this.userId);
        this.getArticles();
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
async addArticle(modal: IonModal) {
  try {
    const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
    const authorName = authorData.name || 'Unknown'; 

    this.article.authorId = this.userId || ''; 
    this.article.authorName = authorName;      

    if (this.article.id) {
      await this.fireStore.updatePost(this.article);
      this.showAlert('Success', 'Basic knowledge updated successfully!');
    } else {
      await this.fireStore.postArticle(this.article);
      this.showAlert('Success', 'Basic knowledge posted successfully!');    
    }

    this.resetArticle(modal);

    await modal.dismiss();

  } catch (error) {
    this.showAlert('Error', 'Error posting knowledge!');
  }
}
resetArticle(modal: IonModal) {
  this.article = {
    id: '',
    article_title: '',
    description: '',
    articleUrl: '',
    authorId: '',
    authorName: '', 
  };
  modal.dismiss();
}

getArticles() {
  this.fireStore.fetchPostedArticle().subscribe((articles) => {
    this.articles = articles;
  });
}
openLink(url: string) {
  window.open(url, '_blank');
}

async editArticle(article: any, modal: IonModal) {
  this.resetArticle(modal);
  this.article = {
    id: article.id, 
    article_title: article.article_title,
    description: article.description,
    articleUrl: article.articleUrl,
    authorName: article.authorName,
    authorId: article.authorId,
  };

  await modal.present();
}



async deleteArticle(article: any) {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete the article for ${article.article_title}?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: async () => {
          try {
            await this.fireStore.deletearticle(article);
            this.showAlert('Success', 'article profile deleted successfully!');
          } catch (error) {
            this.showAlert('Error', 'Error deleting article!');
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
