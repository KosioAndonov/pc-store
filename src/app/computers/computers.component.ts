import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { log } from 'console';
import { Computer } from '../types/computer';
import { ShopService } from '../shop.service';
@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [];
  constructor(private apiService : ApiService, private shopService : ShopService){ }

  

   ngOnInit(): void {
    this.apiService.getComputers().then(  
      (response) => {
        this.computers = response;
        },
        (error) => {
          console.error(error);
          }
    );

   }

   buyComputer(computer: any){
    this.shopService.addToCart(computer);
  }
   
}
