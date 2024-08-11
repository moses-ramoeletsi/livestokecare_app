import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  userLogin = {
    email: '',
    password: '',
  };

  constructor(
    public fireServices: UserDetailsService,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Z0-9@_\-!]+/),
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.fireServices
        .loginWithEmail(userLogin)
        .then((userDetails) => {
          const user = userDetails.user;
  
          this.fireServices.getUserDetails(user).subscribe((userData: any) => {
            if (userData && Object.keys(userData).length !== 0) { 
              if (userData.userType === 'veterinarian') {
                this.router.navigate(['/vet-dashboard']); 
              } else {
                this.router.navigate(['/farmers-dashboard']);
              }
            } 
          });
        })
        .catch((error) => {
          this.showAlert('User Not Found', 'The user does not exist.');
        });
    } else {
      this.showAlert('Form Error', 'Please check the form fields.');
    }
  }

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
