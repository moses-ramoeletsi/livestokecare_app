import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalProfileService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}
  addAnimalProfile(animalProfile: any) {
    const docRef = this.firestore.collection('animalProfiles').doc();
    const id = docRef.ref.id;
    animalProfile.id = id;
    return docRef.set(animalProfile);
  }

  getAnimalProfiles(farmerUid: string): Observable<any[]> {
    return this.firestore
      .collection('animalProfiles', (ref) =>
        ref.where('farmerUid', '==', farmerUid)
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

  getCurrentUser() {
    return this.auth.currentUser;
  }
  updateAnimalProfile(animalProfile: any) {
    return this.firestore
      .collection('animalProfiles')
      .doc(animalProfile.id)
      .update(animalProfile);
  }

  deleteAnimalProfile(animalProfile: any) {
    return this.firestore
      .collection('animalProfiles')
      .doc(animalProfile.id)
      .delete();
  }
}
