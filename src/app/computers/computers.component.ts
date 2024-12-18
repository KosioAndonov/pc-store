import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { log } from 'console';
import { Computer } from '../types/computer';
import { ShopService } from '../shop.service';
import { AuthService } from '../user/auth.service';
@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [];
  constructor(private apiService: ApiService, private shopService: ShopService, private authService: AuthService) { }



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

}
