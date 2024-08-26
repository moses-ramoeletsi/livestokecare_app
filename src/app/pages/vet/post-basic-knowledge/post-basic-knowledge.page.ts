import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { BasicKnowladgeService } from 'src/app/services/basic-knowladge.service';

@Component({
  selector: 'app-post-basic-knowledge',
  templateUrl: './post-basic-knowledge.page.html',
  styleUrls: ['./post-basic-knowledge.page.scss'],
})
export class PostBasicKnowledgePage implements OnInit {

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
  
  showDiseases: boolean = false;

  disease = {
    id: '',
    disease_name: '',
    animal_type:'',
    description: '',
    symptoms: '',
    treatment: '',
  };
  
  diseases: any[] = [];
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
        this.getDiseases();
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

// Diseases Page

async addDisease(modal: IonModal) {
  try {
    if (this.disease.id) {
      await this.fireStore.updateDisease(this.disease);
      this.showAlert('Success', 'Disease updated successfully!');
    } else {
      await this.fireStore.postDisease(this.disease);
      this.showAlert('Success', 'Disease posted successfully!');    
    }

    this.resetDisease(modal);
    await modal.dismiss();

  } catch (error) {
    this.showAlert('Error', 'Error posting disease!');
  }
}

resetDisease(modal: IonModal) {
  this.disease = {
    id: '',
    disease_name: '',
    animal_type:'',
    description: '',
    symptoms: '',
    treatment: '',
  };
  modal.dismiss();
}

getDiseases() {
  this.fireStore.fetchPostedDiseases().subscribe((diseases) => {
    this.diseases = diseases;
  });
}

async editDisease(disease: any, modal: IonModal) {
  this.resetDisease(modal);
  this.disease = {
    id: disease.id, 
    disease_name: disease.disease_name,
    description: disease.description,
    animal_type:disease.animal_type,
    symptoms: disease.symptoms,
    treatment: disease.meadication,
  };

  await modal.present();
}

// Delete disease
async deleteDisease(disease: any) {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete the disease for ${disease.disease_name}?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: async () => {
          try {
            await this.fireStore.deleteDisease(disease);
            this.showAlert('Success', 'Disease deleted successfully!');
          } catch (error) {
            this.showAlert('Error', 'Error deleting disease!');
          }
        }
      }
    ]
  });

  await alert.present();
}
toggleToDiseasesPage( ){
  this.showDiseases = !this.showDiseases;
  
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
