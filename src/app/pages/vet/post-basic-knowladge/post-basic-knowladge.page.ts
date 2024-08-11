import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BasicKnowladgeService } from 'src/app/services/basic-knowladge.service';

@Component({
  selector: 'app-post-basic-knowladge',
  templateUrl: './post-basic-knowladge.page.html',
  styleUrls: ['./post-basic-knowladge.page.scss'],
})
export class PostBasicKnowladgePage implements OnInit {

  article= {
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

async addArticle() {
  try {
    const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
    const authorName = authorData.name || 'Unknown'; 

    this.article.authorId = this.userId || ''; 
    this.article.authorName = authorName;      


    await this.fireStore.postArticle(this.article);

    this.showAlert('Success', 'Aritcle posted successfully!');
  
  } catch (error) {
    this.showAlert('Error', 'Error posting event!');
   
  }
}
getArticles() {
  this.fireStore.fetchPostedArticle().subscribe((articles) => {
    this.articles = articles;
  });
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
