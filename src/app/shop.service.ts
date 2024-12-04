import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './user/auth.service';
import { update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable(); 
  
  constructor(private authService:AuthService) {  this.loadCart();  }

  addToCart(component:any) {
    const currentCart = this.cartSubject.value;
    currentCart.push(component);
    this.cartSubject.next(currentCart); 
    this.saveCart(currentCart); 
  }
  removeFromCart(comp: any) {
    const currentCart = this.cartSubject.value;
    const index = currentCart.findIndex((el: any) => el.id === comp.id);
  if (index !== -1) {
    currentCart.splice(index, 1);
    this.cartSubject.next(currentCart); 
    this.saveCart(currentCart); 
  }
  }

  private saveCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }

  private loadCart(): any[] {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const cart = JSON.parse(cartData);
      this.cartSubject.next(cart); // Emit the loaded cart value
      return cart; // Return the cart
    }
    return []; // Return an empty array if no cart is found
  }

   async order(cart:any, totalPrice: number){
    const currentUser = this.authService.getProfile();
    const uid = currentUser?.uid;
    const db = getFirestore();
    const docRef = doc(db, "orders", uid);
    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, { uid: uid, order: cart, price: totalPrice });
    
    //TODO : make cart$ be empty after order. show my orders 
  }
}


  

