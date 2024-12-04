import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser :any;

  setUser (user: any): void {
    this.currentUser  = user;
  }

  getUser (): any | null {
    return this.currentUser ;
  }

  clearUser (): void {
    this.currentUser  = null;
  }
  
}
