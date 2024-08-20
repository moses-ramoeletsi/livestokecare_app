import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { MedicationService } from 'src/app/services/medication.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.page.html',
  styleUrls: ['./add-medication.page.scss'],
})
export class AddMedicationPage implements OnInit {

  medicine= {
    medicine_name: '',
    price:'',
    animal_type:'',
    description: '',
    imageUrl: '',
    uid:''
  };
  userId: string | null = null;
  medication: any[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  constructor(
    private userAuth:  AngularFireAuth, 
    private fireStore: MedicationService,
    private alertController: AlertController,
 
  
  ) { }

  ngOnInit() {
    this.userAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log ('current user:', this.userId);
        this.getMedication();
      }
    });
  }
  
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


async addMedication() {
  try {
    if (this.imageFile) {
      const imageUrl = await this.fireStore.uploadImage(this.imageFile);
      this.medicine.imageUrl = imageUrl;
    }

    await this.fireStore.postMedication(this.medicine);
    this.showAlert('Success', 'Medication posted successfully!');
    this.resetForm();
  } catch (error) {
    this.showAlert('Error', 'Error posting medication!');
  }
}

resetForm() {
  this.medicine = {
    medicine_name: '',
    price: '',
    animal_type: '',
    description: '',
    uid: '',
    imageUrl: ''
  };
  this.selectedImage = null;
  this.imageFile = null;
}

getMedication() {
  this.fireStore.fetchPostedMedication().subscribe((medication) => {
    this.medication = medication;
  });
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
