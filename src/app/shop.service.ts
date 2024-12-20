import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './user/auth.service';
import { update } from 'firebase/database';
import { window } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable(); 
  
  constructor(private authService:AuthService) {    }
  // this.loadCart();

  addToCart(component:any) {
    const currentCart = this.cartSubject.value;
    currentCart.push(component);
    this.cartSubject.next(currentCart); 
    // this.saveCart(currentCart); 
  }
  removeFromCart(comp: any) {
    const currentCart = this.cartSubject.value;
    const index = currentCart.findIndex((el: any) => el.id === comp.id);
  if (index !== -1) {
    currentCart.splice(index, 1);
    this.cartSubject.next(currentCart); 
  }
  }


   async order(cart:any, totalPrice: number){
    const currentUser = this.authService.getProfile();
    const uid = currentUser?.uid;
    const db = getFirestore();
    const docRef = doc(db, "orders", uid);
    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, { uid: uid, order: cart, price: totalPrice });
    
  }

  clearCart() {
    this.cartSubject.next([]); 
  }
}


  

