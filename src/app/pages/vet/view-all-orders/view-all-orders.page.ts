import { Component, OnInit } from '@angular/core';
import { MedicationService } from 'src/app/services/medication.service';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.page.html',
  styleUrls: ['./view-all-orders.page.scss'],
})
export class ViewAllOrdersPage implements OnInit {

  orders: any[] = [];
  userId: string | null = null;
  lastVisible: any = null;
  pageSize: number = 20;

  constructor(
    private medicationService: MedicationService,
  ) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders(){

      this.medicationService.fetchAllOrders().subscribe((orders) => {
        this.orders = orders;
      });
    
  }
}
