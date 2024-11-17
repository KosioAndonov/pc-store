import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

   login(form: NgForm): void{
    if (form.invalid) {
      return;
  }

  const { email, password } = form.value;
   
      this.authService.loginUser(email, password).then(() =>{
      this.router.navigate(['/']);
      })
    
}
}
