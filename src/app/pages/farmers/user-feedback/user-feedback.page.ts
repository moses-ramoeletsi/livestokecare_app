import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { Observable, filter, switchMap, map } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserFeedbackService } from 'src/app/services/user-feedback.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.page.html',
  styleUrls: ['./user-feedback.page.scss'],
})
export class UserFeedbackPage implements OnInit {

  userFeedback = {
    id: '',
    userId: '',
    name: '',
    email: '',
    feedBackType: '',
    message: '',
  };

  userName: string = '';
  user: Observable<UserDetails | null>;
  feedback: any[] = [];
  userId: string = '';
  constructor(
    private userFeedBackServices: UserFeedbackService,
    private userAuth: AngularFireAuth,
    private fireservices: UserDetailsService,
    private alertController: AlertController
  ) {
    this.user = this.userAuth.authState.pipe(
      filter((user) => user !== null),
      switchMap((user) => {
        return this.fireservices.getUserDetails(user);
      }),
      map((userDetails) => userDetails as UserDetails)
    );
    this.user.subscribe((userDetails) => {
      if (userDetails) {
        this.userName = userDetails.name;
        this.userFeedback.name = this.userName;
        this.loadUserFeedback(userDetails.uid);
      }
    });
  }
  loadUserFeedback(uid: string) {
    this.userFeedBackServices
      .getUserFeedback(this.userFeedback.userId)
      .subscribe((feedback) => {
        this.feedback = feedback;
      });
  }

  ngOnInit() {
    this.userAuth.user.subscribe((user) => {
      if (user) {
        this.userFeedback.userId = user.uid;

        this.userFeedback.name = this.userName;
      }
    });
  }

  async submitFeedBack(modal: IonModal) {
    try {
      const user = await this.userAuth.currentUser;
      if (user) {
        this.userFeedback.userId = user.uid;
        this.userFeedback.name = this.userName;
      }

      if (this.userFeedback.id) {
        await this.userFeedBackServices.updateUserFeedback(this.userFeedback);
        this.showAlert('Success', 'Feedback updated successfully!');
      } else {
        const docRef = await this.userFeedBackServices.addUserFeedback(
          this.userFeedback
        );
        this.showAlert('Success', 'Feedback submitted successfully!');
      }

      this.loadUserFeedback(user!.uid);
      this.resetForm(modal);
    } catch (error) {
      this.showAlert('Error', 'Error submitting feedback!');
    }
  }
  resetForm(modal: IonModal) {
    this.userFeedback = {
      id: '',
      userId: '',
      name: '',
      email: '',
      feedBackType: '',
      message: '',
    };
    modal.dismiss();
  }

  showAlert(title: string, message: string) {
    this.alertController
      .create({
        header: title,
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
  async edituserFeedback(userFeedback: any, modal: IonModal) {
    this.resetForm(modal);
    this.userFeedback = {
      id: userFeedback.id,
      userId: userFeedback.userId,
      name: userFeedback.name,
      email: userFeedback.email,
      feedBackType: userFeedback.feedBackType,
      message: userFeedback.message,
    };

    await modal.present();
  }

  async deleteuserFeedback(userFeedback: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the profile for ${userFeedback.feedBackType}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.userFeedBackServices.deleteUserFeedback(userFeedback);
              this.showAlert('Success', 'Feedback deleted successfully!');
            } catch (error) {
              this.showAlert('Error', 'Error deleting Feedback!');
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
