import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private notificationService: NotificationsService) { }

  getConsultationsByStatus(uid: string, status: string): Observable<any[]> {
    return this.firestore.collection('consultations', ref =>
      ref.where('farmerUid', '==', uid).where('status', '==', status)
    ).valueChanges().pipe(
      map(consultations => {
        return consultations;
      })
    );
  }


  addConsultation(consultation: any) {
    return this.firestore.collection('consultations').add(consultation);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
  getAllConsultations(): Observable<any[]> {
    return this.firestore.collection('consultations').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Record<string, any>;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateConsultationStatus(consultationId: string, newStatus: string) {
    return this.firestore.collection('consultations').doc(consultationId).update({ status: newStatus });
  }
  // updateConsultationStatus(consultationId: string, newStatus: string) {
  //   return this.firestore.collection('consultations').doc(consultationId).update({
  //     status: newStatus
  //   }).then(() => {
  //     // After updating the status, get the consultation document
  //     return this.firestore.collection('consultations').doc(consultationId).get().toPromise();
  //   }).then((doc: DocumentSnapshot<unknown> | undefined) => {
  //     if (doc && doc.exists) {
  //       const consultation = doc.data() as { userId: string } | undefined;
  //       if (consultation && consultation.userId) {
  //         const userId = consultation.userId;
  //         const title = 'Consultation Status Update';
  //         const body = `Your consultation status has been updated to ${newStatus}`;
  //         return this.notificationService.sendNotification(userId, title, body);
  //       } else {
  //         console.warn('Consultation data or userId is missing');
  //         return Promise.resolve();
  //       }
  //     } else {
  //       console.warn('Consultation document not found or undefined');
  //       return Promise.resolve();
  //     }
  //   });
  // }
}
