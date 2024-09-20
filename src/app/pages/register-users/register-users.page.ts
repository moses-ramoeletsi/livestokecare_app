import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.page.html',
  styleUrls: ['./register-users.page.scss'],
})
export class RegisterUsersPage implements OnInit {

  registerationType: string = 'register-user';
  
  registerForm!: FormGroup;
  userData = {
    name: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    uid: '',
    userType:'farmer'
  };

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

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
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

    this.updateFormControls();
  }

  updateFormControls() {
    if (this.registerationType === 'register-user') {
      this.registerForm.addControl('lastName', new FormControl('', Validators.required));
      this.registerForm.addControl('address', new FormControl('', Validators.required));
      this.registerForm.removeControl('vetLicenseNumber');
      this.registerForm.removeControl('consultationHours');
    } else if (this.registerationType === 'register-admin') {
      this.registerForm.addControl('vetLicenseNumber', new FormControl('', Validators.required));
      this.registerForm.addControl('consultationHours', new FormControl('', Validators.required));
      this.registerForm.removeControl('lastName');
      this.registerForm.removeControl('address');
    }
  }

  onRegistrationTypeChange() {
    this.updateFormControls();
  }

  registerUser() {
    if(this.registerForm.valid) {
      console.log('Form is valid:', this.registerForm.value);
      if (this.registerationType === 'register-user') {
        this.createUserAccount();
      } else if (this.registerationType === 'register-admin') {
        this.createVeterinarianAccount();
      }
    } else {
      console.log('Form is invalid:', this.registerForm.errors);
      this.showAlert('Form Error', 'Please check the form fields.');
    }
  }
  
  createUserAccount() {
    if (this.registerForm.valid) {
      const userData = { ...this.userData, ...this.registerForm.value };
      this.fireserviceStore
        .signupWithEmail(userData)
        .then((userDetails) => {
          const user = userDetails.user;
          userData.uid = user?.uid as string;
          this.fireserviceStore.saveUserDetails(userData).then(() => {
            this.showAlert(
              'Registration Successful',
              'You are now registered!'
            );
            this.registerForm.reset();
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

  createVeterinarianAccount() {
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
            this.registerForm.reset();
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
