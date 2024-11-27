import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, mergeMap, tap } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, Unsubscribe, updateProfile, updatePhoneNumber } from "firebase/auth";
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import {getDatabase, ref, set} from 'firebase/database'
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

  signUp(email:string, password:string, mobile: string){
    const db = getFirestore();

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", mobile));
    
    return getDocs(q).then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        // Phone number already registered
        
        throw new Error("This phone number is already registered.");
      }else{
        this.afa.createUserWithEmailAndPassword(email,password).then( async params =>{
          const uid = params.user?.uid
          
          
          await setDoc(doc(db, "users", uid!), {
            phoneNumber: mobile
          }).catch(
            (error) => {
              throw error;
              }
          );
    }).catch(
      (error) => {
        throw error;
        }
    );
      }
    })
    
  };

  
  

  signIn(email:string, password:string){
    return this.afa.signInWithEmailAndPassword(email, password).catch(
      (error) => {
        throw error;
        }
    );;
    
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


  getProfile(){
    return this.user$$.value;
  }

  async getUserDetails(){
    const user = this.user$$.value;
    const uid = user.uid;
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    
   await getDoc(docRef).then((snapshot) => {
    const userData = snapshot.data();
    const phoneNumber =  userData?.['phoneNumber'];

     return phoneNumber;
    //TODO send phone number to profile Comp
    })
   
    
  }

  ngOnDestroy(): void {
    this.user$$.next(undefined); // Clear the user
    
  // Clear the user

  }
}
