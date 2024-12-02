import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Firestore, collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  phoneNumber:any;
  address: any;
  isEditMode: boolean = false;
  form:any;
 
  constructor(private authService: AuthService, private fb: FormBuilder){
    this.form = this.fb.group({
      email: ['',[ Validators.email]],
      phoneNumber: ['', [Validators.minLength(10)]],
      address: ['',[Validators.minLength(10)]],
    
    }); 
  }

  ngOnInit(): void {
    
    this.user = this.authService.getProfile(); 
    this.authService.getUserDetails().then(details =>{
      this.phoneNumber = details.phoneNumber;
      this.address = details.address;
    
      
    })
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateUser():void{

  
    this.authService.updateProfile(this.form.value).then(()=>{

      this.authService.getUserDetails().then(details =>{
        this.phoneNumber = details.phoneNumber;
        this.address = details.address;
      })

      this.isEditMode = false;

    }).catch((error)=>{
      throw new Error(error.message);
    })
    // TODO: PUT form value and update user
  }
}
