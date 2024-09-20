import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { NotificationsService } from './notifications.service';

interface ConsultationData {
  farmerUid: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
  ) {}

  getConsultationsByStatus(uid: string, status: string): Observable<any[]> {
    return this.firestore
      .collection('consultations', (ref) =>
        ref.where('farmerUid', '==', uid).where('status', '==', status)
      )
      .valueChanges()
      .pipe(
        map((consultations) => {
          return consultations;
        })
      );
  }

  addConsultation(consultation: any) {
    const docRef = this.firestore.collection('consultations').doc();
    const id = docRef.ref.id;
    consultation.id = id;
    return docRef.set(consultation);
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }

  updateConsultationStatus(
    consultationId: string,
    status: string
  ): Promise<void> {
    return this.firestore
      .collection('consultations')
      .doc(consultationId)
      .update({ status });
  }
  addNotification(notificationData: any) {
    return this.firestore.collection('notifications').add(notificationData);
  }
  getAllConsultationsForFarmer(farmerId: string): Observable<any[]> {
    return this.firestore
      .collection('consultations', (ref) =>
        ref.where('farmerId', '==', farmerId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  getAllConsultationsForVet(vetDoctorId: string): Observable<any[]> {
    return this.firestore
      .collection('consultations', (ref) =>
        ref.where('vetDoctorId', '==', vetDoctorId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
