import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Firestore, collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  phoneNumber:any;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.user = this.authService.getProfile(); 
    this.authService.getUserDetails().then(userDetails =>{
      console.log(userDetails);
      
    });
    
    
  }
}
