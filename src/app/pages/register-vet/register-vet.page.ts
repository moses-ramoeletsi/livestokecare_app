import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-register-vet',
  templateUrl: './register-vet.page.html',
  styleUrls: ['./register-vet.page.scss'],
})
export class RegisterVetPage implements OnInit {

  registerForm!: FormGroup;
  veterinariaData = {
    name: '',
    email: '',
    vetLicenseNumber: '',
    consultationHours: '',
    phoneNumber: '',
    password: '',
    uid: '',
    userType: 'veterinarian',
  };

  constructor(
    public fireserviceStore: UserDetailsService,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
    
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      vetLicenseNumber: new FormControl('', Validators.required),
      consultationHours: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[5-6]\d{7,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Z0-9@_\-!]+/),
      ]),
    });
  }

  signup() {
    if (this.registerForm.valid) {
      const veterinariaData = { ...this.veterinariaData, ...this.registerForm.value };
      this.fireserviceStore
        .signupWithEmail(veterinariaData)
        .then((userDetails) => {
          const user = userDetails.user;
          veterinariaData.uid = user?.uid as string;
          this.fireserviceStore.saveUserDetails(veterinariaData).then(() => {
            this.showAlert(
              'Registration Successful',
              'You are now registered!'
            );
            this.router.navigate(['/login']);
          });
        })
        .catch((error) => {
          this.showAlert(
            'Registration Error',
            'An error occurred during registration.'
          );
        });
    } else {
      this.showAlert('Form Error', 'Please check the form fields.');
    }
  }
  consultationTime(value: string) {
    this.registerForm.get('consultationHours')?.setValue(value);
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

