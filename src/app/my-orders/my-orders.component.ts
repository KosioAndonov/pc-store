import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  uid!: string | null;
  orders!: any[];
  currentUser: any;

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.uid = null;
    this.orders = [];
  }

  async reloadOrderList(): Promise<void> {
    try {
      const orders = await this.apiService.getCurrentUserOrders(this.uid);
      this.orders = orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  async cancelOrder(id: any): Promise<void> {
    try {
      await this.apiService.deleteOrder(id);
      await this.reloadOrderList();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.authService.getProfile();
    this.uid = this.currentUser?.uid;

    if (this.uid) {
      await this.getOrders();
    }
  }

  async getOrders() {
    try {
      const orders = await this.apiService.getCurrentUserOrders(this.uid);
      this.orders = orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
}

