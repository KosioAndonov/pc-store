import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ShopService } from '../shop.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  component: any;

  constructor(private route: ActivatedRoute, private router: Router,
     private apiService : ApiService, private shopService: ShopService,
     private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.apiService.getComponentById(id).then(data => {
          this.component = data;
        });
      }
    }) 
  }
    
  buyComponent(component: any) {
    let isLogged = this.authService.isLogged;
    if (isLogged) {
      this.shopService.addToCart(component);
    } else {
      alert("You must be logged in to buy a computer");
    }

  }

   goBack() {
     this.router.navigate(['/']); 
   }
}