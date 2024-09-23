import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { Observable, filter, switchMap, map } from 'rxjs';
import { ConsultationService } from 'src/app/services/consultation.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-schedule-consultations',
  templateUrl: './schedule-consultations.page.html',
  styleUrls: ['./schedule-consultations.page.scss'],
})
export class ScheduleConsultationsPage implements OnInit {
  showSchedule: boolean = true;
  consultation: any = {
    farmerName: '',
    vetDoctorName: '',
    consultationDate: '',
    animalAge: '',
    purpose: '',
    animalType: '',
    contactNumber: '',
    farmAddress: '',
    status: 'Pending',
    farmerUid: '',
  };

  userName: string = '';
  user: Observable<UserDetails | null>;
  veterinarians: any[] = [];
  farmerUid: string = '';

  pendingConsultations: any[] = [];
  approvedConsultations: any[] = [];
  completedConsultations: any[] = [];
  approvedConsultationsWithReminders: any[] = [];

  constructor(
    private consultationService: ConsultationService,
    private fireStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fireServices: UserDetailsService,
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
        this.consultation.farmerName = userDetails.name;
        this.consultation.contactNumber = userDetails.phoneNumber || '';
        this.consultation.farmAddress = userDetails.address || '';
      }
    });
  }

  ngOnInit() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.consultation.farmerUid = user.uid;
        this.consultation.farmerName = this.userName;
        this.loadConsultations();
        this.loadApprovedConsultationsWithReminders();
      }
    });
    this.getVeterinarians();
  }

  loadConsultations() {
    console.log('Farmer UID:', this.consultation.farmerUid);

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Pending')
      .subscribe((data) => {
        this.pendingConsultations = data.map((consultation: any) => {
          return {
            ...consultation,
            id: consultation.id,
          };
        });
      });

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Approved')
      .subscribe((data) => {
        this.approvedConsultations = data.map((consultation: any) => {
          return {
            ...consultation,
            id: consultation.id,
          };
        });
      });

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Completed')
      .subscribe((data) => {
        this.completedConsultations = data.map((consultation: any) => {
          return {
            ...consultation,
            id: consultation.id,
          };
        });
      });
  }

  getFormattedDateTime(dateTimeStr: string): { date: string; time: string } {
    const dateTime = new Date(dateTimeStr);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return {
      date: `${year}-${month}-${date}`,
      time: `${hours}:${minutes < 10 ? '0' : ''}${minutes}`,
    };
  }

  getVeterinarians() {
    this.fireStore
      .collection('users', (ref) => ref.where('userType', '==', 'veterinarian'))
      .snapshotChanges()
      .subscribe((res) => {
        this.veterinarians = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          };
        });
      });
  }

  setVetDoctorName(event: any) {
    const selectedVetId = event.detail.value;
    const selectedVet = this.veterinarians.find(
      (vet) => vet.id === selectedVetId
    );
    if (selectedVet) {
      this.consultation.vetDoctorName = selectedVet.name;
    }
  }

  toggleShowSchedule() {
    this.showSchedule = !this.showSchedule;
    if (this.showSchedule) {
      this.resetConsultationForm();
    }
  }

  resetConsultationForm() {
    this.consultation = {
      farmerName: this.userName,
      vetDoctorName: '',
      consultationDate: '',
      animalAge: '',
      purpose: '',
      animalType: '',
      contactNumber: this.consultation.contactNumber,
      farmAddress: this.consultation.farmAddress,
      status: 'Pending',
      farmerUid: this.consultation.farmerUid,
    };
  }

  editConsultation(consultation: any) {
    this.consultation = { ...consultation };
    this.toggleShowSchedule();
  }

  deleteCompletedConsultation(id: string) {
    this.consultationService
      .deleteConsultation(id)
      .then(() => {
        this.showAlert('Success', 'Consultation deleted successfully!');
        this.loadConsultations();
      })
      .catch(() => {
        this.showAlert('Error', 'Failed to delete consultation.');
      });
  }

  async submitConsultation() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        this.consultation.farmerUid = user.uid;
      }

      if (this.consultation.id) {
        await this.consultationService.updateConsultation(
          this.consultation.id,
          this.consultation
        );
        this.showAlert('Success', 'Consultation updated successfully!');
      } else {
        await this.consultationService.addConsultation(this.consultation);
        this.showAlert('Success', 'Consultation added successfully!');
      }

      this.toggleShowSchedule();
    } catch (error) {
      this.showAlert('Error', 'Error sending consultation schedule!');
    }
  }

  loadApprovedConsultationsWithReminders() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.consultationService
          .getApprovedConsultationsWithReminders(user.uid)
          .subscribe((consultations) => {
            this.approvedConsultationsWithReminders = consultations;
            this.scheduleReminders();
          });
      }
    });
  }

  generateHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  async setReminder(consultation: any) {
    const alert = await this.alertController.create({
      header: 'Set Reminder',
      inputs: [
        {
          name: 'reminderTime',
          type: 'datetime-local',
          min: new Date().toISOString(),
          max: consultation.consultationDate,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Set',
          handler: (data) => {
            const reminderTime = new Date(data.reminderTime);
            this.consultationService
              .setReminderTime(consultation.id, reminderTime)
              .then(() => {
                this.showAlert('Success', 'Reminder set successfully!');
                this.scheduleLocalReminderNotification(
                  consultation,
                  reminderTime
                );
              })
              .catch((error) => {
                this.showAlert('Error', 'Failed to set reminder.');
                console.error('Error setting reminder:', error);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async scheduleReminders() {
    for (const consultation of this.approvedConsultationsWithReminders) {
      if (consultation.reminderTime) {
        const reminderTime = consultation.reminderTime.toDate();
        if (reminderTime > new Date()) {
          await this.scheduleLocalReminderNotification(
            consultation,
            reminderTime
          );
        }
      }
    }
  }

  async scheduleLocalReminderNotification(
    consultation: any,
    reminderTime: Date
  ) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `Consultation Reminder`,
            body: `Your appointment with Dr. ${consultation.vetDoctorName} is coming up soon.`,
            id: this.generateHashCode(consultation.id),
            schedule: { at: reminderTime },
            extra: { consultationId: consultation.id },
          },
        ],
      });
      console.log('Reminder notification scheduled');
    } catch (error) {
      console.error('Error scheduling reminder notification:', error);
    }
  }

  isReminderExpired(reminderTime: any): boolean {
    if (!reminderTime) {
      return false;
    }

    const currentTime = new Date().getTime();
    const reminderDateTime = reminderTime.toDate().getTime();

    return reminderDateTime < currentTime;
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
}
