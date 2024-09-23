import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, IonModal, ModalController } from '@ionic/angular';
import { filter, map, Observable, switchMap } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-farmers-dashboard',
  templateUrl: './farmers-dashboard.page.html',
  styleUrls: ['./farmers-dashboard.page.scss'],
})
export class FarmersDashboardPage implements OnInit {
  userName: string = '';
  user: Observable<UserDetails | null>;
  tourSteps = [
    {
      title: 'Knowledge Base',
      content:
        'Access important farming information for better and improved Healthcare and diseases awareness.',
    },
    {
      title: 'Videos',
      content:
        'Watch educational videos related to  livestock farming practices techniques.',
    },
    {
      title: 'Medication',
      content:
        'Find information about various medications for your crops and livestock.',
    },
    {
      title: 'Forum',
      content: 'Connect with other farmers and share your experiences.',
    },
    {
      title: 'Chat',
      content:
        'Get instant support  from available vets through our chat feature.',
    },
  ];
  currentStep = 0;

  constructor(
    private navCtrl: NavController,
    public fireServices: UserDetailsService,
    public afAuth: AngularFireAuth,
    private modalController: ModalController
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

  ngOnInit(): void {}

  openChat() {
    this.navCtrl.navigateForward('/chatlist');
  }

  nextStep() {
    if (this.currentStep < this.tourSteps.length - 1) {
      this.currentStep++;
    }
  }
  previousStep() {
    if (this.currentStep < this.tourSteps.length - 1) {
      this.currentStep--;
    }
  }
  dismissModal() {
    this.modalController.dismiss();
  }
}
