import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  cart:any = [];
  totalPrice:number = 0;

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
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
} 
