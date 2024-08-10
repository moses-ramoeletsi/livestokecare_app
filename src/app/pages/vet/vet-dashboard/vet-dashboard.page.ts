import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vet-dashboard',
  templateUrl: './vet-dashboard.page.html',
  styleUrls: ['./vet-dashboard.page.scss'],
})
export class VetDashboardPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  openChat() {
    this.navCtrl.navigateForward('/chat');
  }

}
