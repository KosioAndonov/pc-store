import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  cart:any = [];
  totalPrice:number = 0;
  user:any;
  shippingAddress:any;

  constructor(private shopService: ShopService,private authService: AuthService){}

  async ngOnInit() {
    await  this.authService.getUserDetails().then(details =>{
      this.shippingAddress = details.address;
   })

    this.shopService.cart$.subscribe(cart => {
      this.cart = cart; 
      this.calculateTotalPrice(); 
    });
    
    
    
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum: number, el: any) => sum + Number(el.price), 0);
  }
  removeComp(comp: any) {
    this.shopService.removeFromCart(comp); 
  }
  async makeOrder(cart:any, totalPrice: number){
    await this.shopService.order(cart, totalPrice).then(
      (res) => {
        this.shopService.clearCart();
        this.cart = [];
        this.totalPrice = 0;
        alert(
          `Order has been placed successfully.`
        )
      }
    );
  }
} 
