import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { VeterinarianDetails } from '../shared/user-details';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(  public firebaseStore: AngularFirestore,
    public userAuth: AngularFireAuth) { }

    signupWithEmail(data: { email: string; password: string }) {
      return this.userAuth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
    }
     saveUserDetails(data: any) {
    return this.firebaseStore.collection('users').doc(data.uid).set(data);
  }

  loginWithEmail(data: { email: string; password: string }) {
    return this.userAuth.signInWithEmailAndPassword(data.email, data.password);
  }
  getUserDetails(data: any) {
    return this.firebaseStore.collection('users').doc(data.uid).valueChanges();
  }

  getVeterinarianDetails(uid: string): Observable<VeterinarianDetails | null> {
    return this.firebaseStore.collection('users', ref => ref.where('uid', '==', uid).where('userType', '==', 'veterinarian'))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(vetArray => (vetArray.length > 0 ? vetArray[0] : null))
      ) as Observable<VeterinarianDetails | null>;
  }
  
  

  // saveUserDetails(uid: string, userDetails: any): Promise<void> {
  //   const userDocRef = this.firebaseStore.collection('users').doc(uid);
  //   return userDocRef.set(userDetails);
  // }
  
}

