import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit{
  orders:any = [];
  userDetails:any ='';

  constructor(private apiService: ApiService, private authService: AuthService){

  }

  ngOnInit(): void {
    this.reloadOrders();
  }

  viewAddress(uid:any){
    this.apiService.getUserDetails(uid).then(res =>{
      this.userDetails = res;
    });
  }

  deleteOrder(id:any){
    this.apiService.deleteOrder(id).then(() => {
      this.reloadOrders(); 
  }).catch(error => {
      console.error("Error deleting order:", error); 
  });

  }

  reloadOrders() {
    this.apiService.getOrders().then(data => {
      this.orders = data; 
  }).catch(error => {
      console.error("Error reloading orders:", error);}) 

}
}
