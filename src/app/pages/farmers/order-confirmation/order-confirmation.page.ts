import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  orderId: string = '';
  total: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.orderId = navigation.extras.state['orderId'];
      this.total = navigation.extras.state['total'];
    }
  }

  ngOnInit() {
    // If the state is not available, you might want to redirect back to the medication page
    if (!this.orderId || !this.total) {
      this.router.navigate(['/medication']);
    }
  }
}
