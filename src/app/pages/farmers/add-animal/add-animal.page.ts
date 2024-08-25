import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, IonModal } from '@ionic/angular';
import { filter, map, Observable, switchMap } from 'rxjs';
import { AnimalProfileService } from 'src/app/services/animal-profile.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/shared/user-details';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
})
export class AddAnimalPage implements OnInit {
 

  isDetailsView: boolean = true; 
  animalProfile = {
    id: '', 
    farmerUid: '',
    farmerName: '',
    animal_species: '',
    animal_age: '',
    last_vaccine: '',
    past_illness: '',
    current_medication: ''
  };
  
  userName: string ='';
  user: Observable<UserDetails | null>;
  animals: any[] = [];
  farmerUid: string = '';
  constructor(
    private animalProfileServices: AnimalProfileService,
    private userAuth:  AngularFireAuth, 
    private fireServices: UserDetailsService,
    private alertController: AlertController
  ) {
    this.user = this.userAuth.authState.pipe(
      filter(user => user !== null),
      switchMap(user =>{
        return this.fireServices.getUserDetails(user);
      }),
      map(userDetails => userDetails as UserDetails)
    )
    this.user.subscribe((userDetails) => {
      if (userDetails) {
        this.userName = userDetails.name;
        this.animalProfile.farmerName = this.userName;
        this.loadAnimalProfiles(userDetails.uid);
      }
    });

   }
  loadAnimalProfiles(uid: string) {
    this.animalProfileServices.getAnimalProfiles(this.animalProfile.farmerUid).subscribe(animals => {
      this.animals = animals;
    });
  }

  ngOnInit() {
    this.userAuth.user.subscribe(user => {
      if(user){
        this.animalProfile.farmerUid = user.uid;
        
        this.animalProfile.farmerName = this.userName;
      }
    })
  }

  toggleView() {
    this.isDetailsView = !this.isDetailsView; 
  }


  async submitAnimalProfile(modal: IonModal) {
    try {
      const user = await this.userAuth.currentUser;
      if (user) {
        this.animalProfile.farmerUid = user.uid;
        this.animalProfile.farmerName = this.userName;
      }
  
      if (this.animalProfile.id) {
        await this.animalProfileServices.updateAnimalProfile(this.animalProfile);
        this.showAlert('Success', 'Animal profile updated successfully!');
      } else {
        const docRef = await this.animalProfileServices.addAnimalProfile(this.animalProfile);
        this.showAlert('Success', 'Animal profile submitted successfully!');
      }
  
      this.loadAnimalProfiles(user!.uid);
      this.resetForm(modal);
      
    } catch (error) {
      this.showAlert('Error', 'Error submitting animal profile!');
    }
  }
  resetForm(modal: IonModal) {
    this.animalProfile = {
      id: '', 
      farmerUid: '',
      farmerName: '',
      animal_species: '',
      animal_age: '',
      last_vaccine: '',
      past_illness: '',
      current_medication: ''
    };
    modal.dismiss();
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
  async editAnimal(animal: any, modal: IonModal) {
    this.resetForm(modal);
    this.animalProfile = {
      id: animal.id, 
      farmerUid: animal.farmerUid,
      farmerName: animal.farmerName,
      animal_species: animal.animal_species,
      animal_age: animal.animal_age,
      last_vaccine: animal.last_vaccine,
      past_illness: animal.past_illness,
      current_medication: animal.current_medication
    };
  
    await modal.present();
  }
  
  
  async deleteAnimal(animal: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the profile for ${animal.animal_species}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.animalProfileServices.deleteAnimalProfile(animal);
              this.showAlert('Success', 'Animal profile deleted successfully!');
              this.loadAnimalProfiles(this.animalProfile.farmerUid);
            } catch (error) {
              this.showAlert('Error', 'Error deleting animal profile!');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  


}
