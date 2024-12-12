import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';


 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  constructor(private authService: AuthService, private router: Router) {}

  get isLogged(): boolean{
    return this.authService.isLogged;
  }

   logOut(): void{
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}

   
