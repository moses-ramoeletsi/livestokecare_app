import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Observable, filter, switchMap, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-farmers-profile',
  templateUrl: './farmers-profile.page.html',
  styleUrls: ['./farmers-profile.page.scss'],
})
export class FarmersProfilePage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  user: Observable<UserDetails | null>;

  constructor(
    private authService: AuthService,
    public fireServices: UserDetailsService,
    public afAuth: AngularFireAuth,
    private alertController: AlertController
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
        this.userEmail = userDetails.email;
      }
    });
  }

  ngOnInit() {}

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: async () => {
            await this.authService.logout();
            localStorage.removeItem('userRole');
            localStorage.clear();         },
        },
      ],
    });
    await alert.present();
  }
}
