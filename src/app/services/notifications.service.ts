import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  getUserNotifications(): Observable<any[]> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('notifications', (ref) =>
              ref.where('farmerUid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return of([]);
        }
      })
    );
  }
}
