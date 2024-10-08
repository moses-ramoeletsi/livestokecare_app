import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap, catchError } from 'rxjs';
import { VeterinarianDetails } from '../shared/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(
    public firebaseStore: AngularFirestore,
    public userAuth: AngularFireAuth
  ) { }

  signupWithEmail(data: { email: string; password: string }) {
    return this.userAuth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveUserDetails(data: any) {
    return this.firebaseStore.collection('users').doc(data.uid).set(data);
  }

  loginWithEmail(data: { email: string; password: string }) {
    return this.userAuth.signInWithEmailAndPassword(data.email, data.password);
  }

  getUserDetails(user: any): Observable<any> {
    return this.firebaseStore.collection('users').doc(user.uid).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return of(null);
      })
    );
  }

  getVeterinarianDetails(uid: string): Observable<VeterinarianDetails | null> {
    return this.firebaseStore.collection('users', ref => ref.where('uid', '==', uid).where('userType', '==', 'veterinarian'))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(vetArray => (vetArray.length > 0 ? vetArray[0] : null)),
        catchError(error => {
          console.error('Error fetching veterinarian details:', error);
          return of(null);
        })
      ) as Observable<VeterinarianDetails | null>;
  }

  getUsers(): Observable<any[]> {
    return this.firebaseStore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Record<string, any>;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.userAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebaseStore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error getting current user:', error);
        return of(null);
      })
    );
  }

  getCurrentUserDetails(uid: string): Observable<any> {
    return this.firebaseStore.collection('users').doc(uid).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching current user details:', error);
        return of(null);
      })
    );
  }

  getAuth() {
    return this.userAuth;
  }
}