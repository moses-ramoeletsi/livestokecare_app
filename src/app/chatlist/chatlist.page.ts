import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage implements OnInit {

   users: any[] = [];
  currentUserEmail?: string;
  currentUserType?: string;

  constructor(private authService: UserDetailsService, private router: Router) {}


    ngOnInit() {
      this.authService.getCurrentUser().subscribe(currentUser => {
      
        if (currentUser) {
          this.currentUserEmail = currentUser.email;
          this.currentUserType = currentUser.userType;

          this.authService.getUsers().subscribe(users => {
            this.users = users.filter(user => 
              user.email !== this.currentUserEmail && 
              (
                (this.currentUserType === 'veterinarian' && user.userType === 'farmer') ||
                (this.currentUserType !== 'veterinarian' && user.userType === 'veterinarian')
              )
            );
          });
        }
      });
    }
    


  startChat(user: any) {
    this.router.navigate(['/chat', user.uid]);
  }
}
