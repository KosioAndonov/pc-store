import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  signUp(email:string, password:string){
    return this.afa.createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string, password:string){
    return this.afa.signInWithEmailAndPassword(email, password);
  }
}
