import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private afMessaging: AngularFireMessaging) { }
  requestPermission() {
    return this.afMessaging.requestPermission;
  }

  getToken() {
    return this.afMessaging.getToken;
  }

  sendNotification(userId: string, title: string, body: string) {
    // Implement the logic to send a notification to a specific user
    // This might involve calling a backend API that handles FCM
    // For example:
    // return this.http.post('your-api-endpoint/send-notification', { userId, title, body });
  }
}
