import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, mergeMap, tap } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, Unsubscribe } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  OnDestroy{
  private user$$ = new BehaviorSubject<any>(undefined);
  public user$ = this.user$$.asObservable();
  private unsubscribe!: Unsubscribe;

  user: User | undefined;
  USER_KEY = '[user]';


  
  get isLogged(): boolean {
    return this.user$$.value !== undefined;
  } 


  constructor(private afa: AngularFireAuth) { }

  signUp(email:string, password:string){
    return this.afa.createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string, password:string){
    return this.afa.signInWithEmailAndPassword(email, password)
    
  }

  loginUser = async (email: string, password: string) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        
        // You can store user info in your application state or context
        this.user$$.next(user);
        this.unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            
            console.log("User  is signed in:");
            this.user$$.next(user);
               // Update the BehaviorSubject with the user
          } else {
            console.log("No user is signed in.");
            this.user$$.next(undefined); // Clear the user
          }
        });
        // Optionally, you can set user details in local storage or your state management
        localStorage.setItem('user', JSON.stringify(user));
        
        
        return user; // Return user for further use if needed
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Handle the error as needed
    }
};


  signOut(){
    this.afa.signOut().then(() => {
      this.user$$.next(undefined);
      localStorage.removeItem('user');
      });
  }


  ngOnDestroy(): void {
    this.user$$.next(undefined); // Clear the user
    
  // Clear the user

  }
}
