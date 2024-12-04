import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    db = getFirestore();

    //GET COMPUTERS
    async getComputers(){
    const colRef = collection(this.db, 'computers');
    let computers : any[] = [];

     getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) =>{
        computers.push({...doc.data(), id: doc.id});
  
      })
     })
    return computers;
  }
  
  //GET PARTS
  async getParts(){
    const db = getFirestore();
    const colRef = collection(db, 'parts');
    let parts : any[] = [];

     getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) =>{
        parts.push({...doc.data(), id: doc.id});
  
      })
     })
    return parts;
  }
}
