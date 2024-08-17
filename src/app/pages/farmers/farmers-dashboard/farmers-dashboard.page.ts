import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { filter, map, Observable, switchMap } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-farmers-dashboard',
  templateUrl: './farmers-dashboard.page.html',
  styleUrls: ['./farmers-dashboard.page.scss'],
})
export class FarmersDashboardPage implements OnInit {

  userName: string ="";
  user: Observable<UserDetails | null>;
  constructor(private navCtrl: NavController,
    public fireServices: UserDetailsService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {
    this.user = this.afAuth.authState.pipe(
      filter(user => user !== null),
      switchMap((user) => {
        return this.fireServices.getUserDetails(user);
      }),
      map(userDetails => userDetails as UserDetails)
    );

    this.user.subscribe((userDetails) => {
      if (userDetails) {
        this.userName = userDetails.name;
      }
    })

  }
  ngOnInit(): void {
   
  }

  openChat() {
    this.navCtrl.navigateForward('/chatlist');
  }


}
