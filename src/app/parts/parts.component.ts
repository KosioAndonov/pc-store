import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Part } from '../types/part';
import { ShopService } from '../shop.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.css'
})
export class PartsComponent {
  parts: Part[] = [];
  constructor(private apiService : ApiService, private shopService : ShopService, private authService: AuthService){ }

  buyParts(part:any){
    let isLogged = this.authService.isLogged;
    if(isLogged){
      this.shopService.addToCart(part);
    }else{
      alert("You must be logged in to buy parts");
      }
    
  }
  
   ngOnInit(): void {
    this.apiService.getParts().then(  
      (response) => {
        this.parts = response;
        },
        (error) => {
          console.error(error);
          }
    );
    
    
   }

}
