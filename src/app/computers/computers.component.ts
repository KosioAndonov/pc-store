import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Computer } from '../types/computer';
import { ShopService } from '../shop.service';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [];
  isAdmin: boolean = false;
  
  constructor(private apiService: ApiService, private shopService: ShopService, private authService: AuthService, private router: Router) {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
   }



  ngOnInit() {
    this.initializeComputers();
    
  }

  private initializeComputers() {
    this.apiService.getComputers().then(
      (response) => {
        this.computers = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  buyComputer(computer: any) {
    let isLogged = this.authService.isLogged;
    if (isLogged) {
      this.shopService.addToCart(computer);
    } else {
      alert("You must be logged in to buy a computer");
    }
  }

  deleteComponent(id:any){
    this.apiService.deleteComponent('computers', id).then(
      () => {
          // Reload the computers after successful deletion
          this.initializeComputers();
          // Show a success message to the user
          alert("Computer has been deleted successfully.");
      },
      (error) => {
          console.error(error);
          // Show an error message to the user
          alert("An error occurred while deleting the computer.");
      })
  }

  editComponent(id:any){
   this.router.navigate(['/admin/add-new', id])
  }

}
