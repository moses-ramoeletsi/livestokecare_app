import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from 'src/app/services/medication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class ViewOrdersPage implements OnInit {
  orders: any[] = [];
  userId: string | null = null;
  lastVisible: any = null;
  pageSize: number = 10;

  constructor(
    private medicationService: MedicationService,
    private userService: UserDetailsService,

  ) { }

  ngOnInit() {
    this.getCurrentUserId();
  }
  getCurrentUserId() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.fetchUserOrders();
      }
    });
  }

  fetchUserOrders() {
    if (this.userId) {
      this.medicationService.fetchUserOrders(this.userId).subscribe((orders) => {
        this.orders = orders;
      });
    }
  }

}
