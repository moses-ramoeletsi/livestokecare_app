import { Component, OnInit } from '@angular/core';
import { BasicKnowledgeService } from 'src/app/services/basic-knowledge.service';

@Component({
  selector: 'app-basic-Knowledge',
  templateUrl: './basic-Knowledge.page.html',
  styleUrls: ['./basic-Knowledge.page.scss'],
})
export class BasicKnowledgePage implements OnInit {
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
  constructor(private fireStore: BasicKnowledgeService) {}

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
