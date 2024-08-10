import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-knowladge',
  templateUrl: './basic-knowladge.page.html',
  styleUrls: ['./basic-knowladge.page.scss'],
})
export class BasicKnowladgePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  knowledgeBaseArticles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' },
  ];

}
