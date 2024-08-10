import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
})
export class AddAnimalPage implements OnInit {
 

  constructor() { }

  ngOnInit() {
  }
  isDetailsView: boolean = true; // Default view is Animal Details

  toggleView() {
    this.isDetailsView = !this.isDetailsView; // Toggle between true and false
  }

  

}
