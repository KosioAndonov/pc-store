import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Part } from '../types/part';
import { ShopService } from '../shop.service';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.css'
})
export class PartsComponent {
  parts: Part[] = [];
  isAdmin: boolean = false;
  
  constructor(private apiService : ApiService, private shopService : ShopService,
     private authService: AuthService,
     private router: Router){
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
   }

  buyParts(part:any){
    let isLogged = this.authService.isLogged;
    if(isLogged){
      this.shopService.addToCart(part);
    }else{
      alert("You must be logged in to buy parts");
      }
    
  }
  
  ngOnInit() {
    this.initializeParts();
    
  }

  private initializeParts() {
    this.apiService.getParts().then(
      (response) => {
        this.parts = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
   deleteComponent(id:any){
    this.apiService.deleteComponent('parts', id).then(
      () => {
          this.initializeParts();
          alert("Part has been deleted successfully.");
      },
      (error) => {
          console.error(error);
          // Show an error message to the user
          alert("An error occurred while deleting the Part.");
      })
  
  }

  editComponent(id:any){
    this.router.navigate(['/admin/add-new', id])
   }

}
