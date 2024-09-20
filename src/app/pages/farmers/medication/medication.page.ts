import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from 'src/app/services/medication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  medicine = {
    medicine_name: '',
    price: '',
    animal_type: '',
    description: '',
    imageUrl: '',
    id: '',
  };
  userId: string | null = null;
  medication: any[] = [];
  cart: any[] = [];
  total: number = 0;
  constructor(
    private fireStore: MedicationService,
    private fireService: UserDetailsService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getMedication();
    this.getCurrentUserId();
  }
  getCurrentUserId() {
    this.fireService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  getMedication() {
    this.fireStore.fetchPostedMedication().subscribe((medication) => {
      this.medication = medication;
    });
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  addToCart(medicine: any) {
    const cartItem = {
      ...medicine,
      quantity: 1,
      cartItemId: Date.now().toString(),
    };
    this.cart.push(cartItem);
    this.calculateTotal();
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotal();
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      if (item.quantity === 0) {
        this.cart = this.cart.filter((cartItem) => cartItem.uid !== item.uid);
      }
      this.calculateTotal();
    }
  }
  calculateTotal() {
    this.total = this.cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }
  removeFromCart(item: any) {
    const index = this.cart.findIndex(
      (cartItem) => cartItem.cartItemId === item.cartItemId
    );
    if (index > -1) {
      this.cart.splice(index, 1);
      this.calculateTotal();
    }
  }
  checkout() {
    if (!this.userId) {
      console.error('User not logged in');
      this.router.navigate(['/login']);
      return;
    }

    this.fireService
      .getCurrentUserDetails(this.userId)
      .subscribe((userDetails) => {
        if (!userDetails) {
          console.error('User details not found');
          return;
        }

        const orderItems = this.cart.map((item) => {
          if (
            !item.id ||
            !item.medicine_name ||
            !item.price ||
            !item.quantity
          ) {
            throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
          }
          return {
            medicineId: item.id,
            medicineName: item.medicine_name,
            quantity: item.quantity,
            price: item.price,
          };
        });

        const order = {
          userId: this.userId,
          clientName: userDetails.name,
          clientAddress: userDetails.address,
          items: orderItems,
          total: this.total,
          timestamp: new Date(),
        };

        this.fireStore
          .createOrder(order)
          .then((docRef) => {
            this.presentToast('Order successfully placed');
            const orderId = docRef.id;
            this.router.navigate(['/order-confirmation'], {
              state: {
                orderId: orderId,
                total: this.total,
              },
            });
            this.cart = [];
            this.total = 0;
          })
          .catch((error) => {
            this.presentToast('Error placing order: ' + error.message);
            console.error('Error placing order:', error);
          });
      });
  }
}
