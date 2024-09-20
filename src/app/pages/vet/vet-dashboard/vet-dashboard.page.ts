import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, filter, switchMap, map } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-vet-dashboard',
  templateUrl: './vet-dashboard.page.html',
  styleUrls: ['./vet-dashboard.page.scss'],
})
export class VetDashboardPage implements OnInit {
  userName: string = '';
  user: Observable<UserDetails | null>;
  constructor(
    private navCtrl: NavController,
    public fireServices: UserDetailsService,
    public afAuth: AngularFireAuth,
  ) {
    this.user = this.afAuth.authState.pipe(
      filter((user) => user !== null),
      switchMap((user) => {
        return this.fireServices.getUserDetails(user);
      }),
      map((userDetails) => userDetails as UserDetails)
    );

    this.user.subscribe((userDetails) => {
      if (userDetails) {
        this.userName = userDetails.name;
      }
    });
  }

  ngOnInit() {}

  openChat() {
    this.navCtrl.navigateForward('/chatlist');
  }
}
