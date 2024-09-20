import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';
import { ConsultationService } from 'src/app/services/consultation.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-view-consulatation-schedule',
  templateUrl: './view-consulatation-schedule.page.html',
  styleUrls: ['./view-consulatation-schedule.page.scss'],
})
export class ViewConsulatationSchedulePage implements OnInit {

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
    farmerUid: ''
  };

  consultations: any[] = [];
  uid: string = '';

  constructor(
    private userAuth: AngularFireAuth,
    private consultationService: ConsultationService, 
    private toastController: ToastController,
  ) { }
  
    ngOnInit() {
      this.userAuth.authState.subscribe((user) => {
        if (user) {
          this.uid = user.uid;
          this.loadConsultations();
        }
      });
    }
  
    loadConsultations() {
      this.consultationService.getAllConsultationsForVet(this.uid).subscribe((consultations) => {
        this.consultations = consultations;
      });
    }
  
    async updateStatus(consultationId: string, status: string, consultation: any) {    
      this.consultationService.updateConsultationStatus(consultationId, status)
        .then(async () => {
          await this.addNotificationToFirestore(consultationId, consultation.vetDoctorName, consultation.farmerName, consultation.farmerUid, consultation.purpose, status);
            await this.scheduleLocalNotification(consultationId, consultation.vetDoctorName, consultation.farmerName, status);
    
          this.showSuccessToast('Consultation status updated successfully');
        })
        .catch((error) => {
          this.showErrorToast('Error updating consltation status');
          console.error('Error updating consultation status:', error);
        });
    }
    
    async addNotificationToFirestore(consultationId: string, vetDoctorName: string, farmerName: string, farmerUid: string, purpose: string, status: string) {
      const notificationData = {
        consultationId,
        vetDoctorName,
        farmerName,
        farmerUid,
        purpose,
        status,
        timestamp: new Date(),
      };
    
      return this.consultationService.addNotification(notificationData);
    }

    async scheduleLocalNotification(appointmentId: string, vetDoctorName: string, farmerName: string, status: string) {
      try{
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `Consultation Status Changed`,
              body: `Your appointment with Dr. ${vetDoctorName} has been ${status}.`,
              id: Math.floor(Math.random() * 100000), 
              schedule: { at: new Date(Date.now() + 1000) },
              extra: { appointmentId, vetDoctorName, farmerName, status },
             },
           ],
         });
         console.log('Local notification scheduled');
       } catch (error) {
         console.error('Error creating notification:', error);
         try {
           await LocalNotifications.schedule({
             notifications: [
               {
                 title: `Consultation Status Changed`,
                 body: `Your appointment with Dr. ${vetDoctorName} has been ${status}.`,
                 id: Math.floor(Math.random() * 100000),
                 extra: { appointmentId, vetDoctorName, farmerName, status },
               }
             ]
           });
           console.log('Local notification scheduled without custom scheduling');
         } catch (retryError) {
           console.error('Error scheduling notification on retry:', retryError);
         }
       }
     }
   
     async showSuccessToast(message: string) {
       const toast = await this.toastController.create({
         message: message,
         color: 'success',
         duration: 2000,
       });
       toast.present();
     }
   
     async showErrorToast(message: string) {
       const toast = await this.toastController.create({
         message: message,
         color: 'danger',
         duration: 2000,
       });
       toast.present();
     }
   
}


