import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, mergeMap, tap } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, Unsubscribe, updateProfile, updatePhoneNumber, updateEmail } from "firebase/auth";
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database'
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<any>(undefined);
  public user$ = this.user$$.asObservable();
  private unsubscribe!: Unsubscribe;


  isEditMode: boolean = false;
  user: User | undefined;

  USER_KEY = '[user]';



  get isLogged(): boolean {
    
    return  this.user$$.value !== undefined;

  }

 


  constructor(private afa: AngularFireAuth) { 
    // this.subscription = this.user$.subscribe((user) => {
    //   this.user = user;
    // });
  }
  

  signUp(email: string, password: string, mobile: string) {
    const db = getFirestore();

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", mobile));

    return getDocs(q).then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        // Phone number already registered

        throw new Error("This phone number is already registered.");
      } else {
        this.afa.createUserWithEmailAndPassword(email, password).then(async params => {
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




  signIn(email: string, password: string) {
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
      localStorage.setItem('user', JSON.stringify(user));


      return user; // Return user for further use if needed
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Handle the error as needed
    }
  };


  signOut() {
    this.afa.signOut().then(() => {
      this.user$$.next(undefined);
      localStorage.clear();
    });
  }


  getProfile() {
    return this.user$$.value;
  }

  async getUserDetails() {
    const user = this.user$$.value;
    const uid = user.uid;
    const db = getFirestore();
    const docRef = doc(db, "users", uid);

    let phoneNumber = "";
    let address = "";

    await getDoc(docRef).then((snapshot) => {
      const userData = snapshot.data();
      const userPhoneNumber = userData?.['phoneNumber'];
      const userAddress = userData?.['address'];
      phoneNumber = userPhoneNumber;
      address = userAddress;
     
    })
    return { phoneNumber, address };

  }


  async updateProfile(user: any) {
    if (user.email) {
      const auth = getAuth();
      updateEmail(auth.currentUser!, user.email).then(() => {
        window.alert("Email changed!")
      }).catch((error) => {
        throw new Error(error)
      });
    }

    if (user.phoneNumber || user.address) {
      const currentUser = this.user$$.value;
      const uid = currentUser.uid;

      const db = getFirestore();
      const userRef = doc(db, "users", uid);

      if (user.phoneNumber) {
        await updateDoc(userRef, {
          phoneNumber: user.phoneNumber,
        }).then(() => {
          window.alert("Phone number updated!")
        })
      }

      if (user.address) {
        await updateDoc(userRef, {
          address: user.address,
        }).then(() => {
          window.alert("Shipping address updated!")
        })
      }

    }

  }

  ngOnDestroy(): void {
    this.user$$.next(undefined); // Clear the user
  }
}
