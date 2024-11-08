import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from '../../shared/validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit  {
  form:any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      passGroup: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          rePassword: ['', [Validators.required]],
        },
        {
          validators: [matchPasswordsValidator('password', 'rePassword')],
        }
    )
      });
  }


register(): void{
  if (this.form.invalid) {
    console.log("invalid");
    return;
  }

  const {
    email,
    mobile,
    passGroup: { password },
  } = this.form.value;
  
  this.authService.signUp(email,password).then(() =>{
    this.router.navigate(['/auth/login']);
  });
  
}

}
