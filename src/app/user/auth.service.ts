import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, mergeMap, tap } from 'rxjs';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';


  
  get isLogged(): boolean {
    return !!this.user;
  } 

  subscription: Subscription;

  constructor(private afa: AngularFireAuth) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
   }

  signUp(email:string, password:string){
    return this.afa.createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string, password:string){
    return this.afa.signInWithEmailAndPassword(email, password)
    .then();
    
  }

  loginUser = async (email: string, password: string) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        
        // You can store user info in your application state or context
        console.log("User  logged in:", user);
        
        // Optionally, you can set user details in local storage or your state management
        localStorage.setItem('user', JSON.stringify(user));
        
        return user; // Return user for further use if needed
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Handle the error as needed
    }
};

  ngOnDestroy(): void {
    this.user$$.unsubscribe();
  }
}
