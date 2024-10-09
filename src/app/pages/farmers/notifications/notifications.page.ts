import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationsService } from 'src/app/services/notifications.service';

interface NotificationData {
  id?: string;
  consultationId: string;
  farmerId: string;
  status: string;
  timestamp: Date;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationsService.getUserNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications.map((notification) => {
          if (notification.timestamp && notification.timestamp.toDate) {
            notification.timestamp = notification.timestamp.toDate();
          }
          return notification;
        });
      },
      (error) => {
        console.error('Error loading notifications:', error);
      }
    );
  }
  
}