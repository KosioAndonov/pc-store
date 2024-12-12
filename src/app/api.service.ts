import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  db: any;

  constructor() {
    this.db = getFirestore();
  }

    //GET COMPUTERS
    async getComputers(){
    const colRef = collection(this.db, 'computers');
    let computers : any[] = [];

     await getDocs(colRef).then((snapshot) => {

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

    await getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) =>{
        parts.push({...doc.data(), id: doc.id});
  
      })
     })
    return parts;
  }

  //Get My-Orders
  async getCurrentUserOrders(uid:any){
    const colRef = collection(this.db, 'orders');
    const q = query(colRef, where('uid', '==', uid));
    let orders:any = [];
     await getDocs(q).then(snapshot => {
       orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }).catch(error => {
      console.error("Error fetching orders: ", error);
      return [];
  });

  return orders;
  }

  //Delete order
  async deleteOrder(id:any){
    const docRef = doc(this.db, 'orders', id);

    try {
        await deleteDoc(docRef); // Delete the document
        console.log(`Order with ID ${id} has been deleted.`);
    } catch (error) {
        console.error("Error deleting order: ", error);
    }
  }
}
