import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-farmers-dashboard',
  templateUrl: './farmers-dashboard.page.html',
  styleUrls: ['./farmers-dashboard.page.scss'],
})
export class FarmersDashboardPage implements OnInit {

  constructor(private navCtrl: NavController) {}
  ngOnInit(): void {
   
  }

  openChat() {
    this.navCtrl.navigateForward('/chat');
  }


}
