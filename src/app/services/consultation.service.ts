import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { VeterinarianDetails, UserDetails } from '../shared/user-details';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

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

}
