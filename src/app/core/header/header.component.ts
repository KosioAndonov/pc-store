import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { User } from 'firebase/auth';
import { UserService } from '../../user.service';


 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  //TODO: make logout functionality
  constructor(private authService: AuthService) {}

  get isLogged(): boolean{
    return this.authService.isLogged;
  }

   logOut(): void{
    this.authService.signOut();
  }
}

   
