import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalProfileService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }
  addAnimalProfile(consultation: any) {
    return this.firestore.collection('animal_profile').add(consultation);
  }

  getAnimalProfiles(farmerUid: string): Observable<any[]> {
    return this.firestore.collection('animal_profile', ref => ref.where('farmerUid', '==', farmerUid)).valueChanges();
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
}
