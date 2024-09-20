import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
      }
    });
    this.getVeterinarians();
  }
  loadConsultations() {
    console.log('Farmer UID:', this.consultation.farmerUid);

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Pending')
      .subscribe((data) => {
        this.pendingConsultations = data;
      });

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Approved')
      .subscribe((data) => {
        this.approvedConsultations = data;
      });

    this.consultationService
      .getConsultationsByStatus(this.consultation.farmerUid, 'Completed')
      .subscribe((data) => {
        this.completedConsultations = data;
      });
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
      this.consultation.vetDoctorName = selectedVet.name; // Store the veterinarian's name
    }
  }

  toggleShowSchedule() {
    this.showSchedule = !this.showSchedule;
  }

  async submitConsultation() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        this.consultation.farmerUid = user.uid;
      }
      await this.consultationService.addConsultation(this.consultation);
      this.showAlert('Success', 'Consultation Schedule send successfully!');
    } catch (error) {
      this.showAlert('Error', 'Error sending consultation schedule!');
    }
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
