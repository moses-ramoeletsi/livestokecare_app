import { Component, OnInit } from '@angular/core';
import { BasicKnowladgeService } from 'src/app/services/basic-knowladge.service';

@Component({
  selector: 'app-basic-knowladge',
  templateUrl: './basic-knowladge.page.html',
  styleUrls: ['./basic-knowladge.page.scss'],
})
export class BasicKnowladgePage implements OnInit {
  article = {
    article_title: '',
    description: '',
    articleUrl: '',
    authorId: '',
    authorName: '',
  };
  userId: string | null = null;
  name: any;
  articles: any[] = [];

  showCommonDiseases: boolean = false;

  disease = {
    id: '',
    disease_name: '',
    animal_type: '',
    description: '',
    symptoms: '',
    treatment: '',
  };

  diseases: any[] = [];
  constructor(private fireStore: BasicKnowladgeService) {}

  ngOnInit() {
    this.getArticles();
    this.getCommonDiseases();
  }
  getArticles() {
    this.fireStore.fetchPostedArticle().subscribe((articles) => {
      this.articles = articles;
    });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
  //Common Diseases
  getCommonDiseases() {
    this.fireStore.fetchPostedDiseases().subscribe((diseases) => {
      this.diseases = diseases;
    });
  }

  toggleToCommonDiseasesPage() {
    this.showCommonDiseases = !this.showCommonDiseases;
  }
}
