import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-vet-events',
  templateUrl: './vet-events.page.html',
  styleUrls: ['./vet-events.page.scss'],
})
export class VetEventsPage implements OnInit {

  event= {
    event_title: '',
    description: '',
    date_and_time: '',
    location: '',
    host: '',
    authorId: '',
    authorName: '', 
  };
  userId: string | null = null;
  name: any;
  events: any[] = [];
  constructor(
    public fireStore: EventsService ,
    public alertController: AlertController,
    public userAuth: AngularFireAuth,
    public router: Router,
  ) { }

  ngOnInit() {
    this.userAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log ('current user:', this.userId);
        this.fetchVetData(this.userId);
        this.getEvents();
      }
    });
  }
  fetchVetData(userId: string) {
    this.fireStore.getCurrentUserById(userId).then((userData) => {
    this.name = userData.name
    console.log('Facility Name:', this.name);
  }).catch(error => {
    console.error('Error fetching user data:', error);
  });
}


async addEvent() {
  try {
    const authorData = await this.fireStore.getCurrentUserById(this.userId || '');
    const authorName = authorData.name || 'Unknown'; 

    this.event.authorId = this.userId || ''; 
    this.event.authorName = authorName;      


    await this.fireStore.postEvent(this.event);

    this.showAlert('Success', 'Event posted successfully!');
  
  } catch (error) {
    this.showAlert('Error', 'Error posting event!');
   
  }
}


getEvents() {
  this.fireStore.fetchPostedEvents().subscribe((events) => {
    this.events = events;
  });
}
getFormattedDateTime(dateTimeStr: string): { date: string; time: string } {
  const dateTime = new Date(dateTimeStr);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; 
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const formattedDate = `${year}-${month}-${date}`;
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return { date: formattedDate, time: formattedTime };
}
async editEvent(event: any) {
  // Implement edit functionality
  // You can open a modal or navigate to an edit page with event details
  console.log('Editing event:', event);
  // Example: this.router.navigate(['/edit-event', event.id]);
}
async deleteEvent(event: any) {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete the event "${event.event_title}"?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          try {
            await this.fireStore.deleteEvent(event.id); // Make sure 'event.id' is correct
            this.showAlert('Success', 'Event deleted successfully!');
            this.getEvents(); // Refresh the list of events after deletion
          } catch (error) {
            this.showAlert('Error', 'Error deleting event.');
            console.error('Error deleting event:', error);
          }
        },
      },
    ],
  });

  await alert.present();
}

// Helper method to show alerts
showAlert(title: string, message: string) {
  this.alertController
    .create({
      header: title,
      message: message,
      buttons: ['OK'],
    })
    .then((alert) => alert.present());
}


}
