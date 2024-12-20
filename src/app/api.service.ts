import { Injectable } from '@angular/core';
import {  collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
 
constructor(){
}


  //GET COMPUTERS
  async getComputers() {
    const db = getFirestore();
    const colRef = collection(db, 'computers' );
    let computers: any[] = [];

    await getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        computers.push({ ...doc.data(), id: doc.id });

      })
    })

    return computers;
  }
 
  // Get Component by ID
async getComponentById(id: string) {
  const db = getFirestore();
  const  docRefComputer = doc(db, 'computers', id);
  let component: any = null;

  try {
    const docSnap = await getDoc(docRefComputer);

    if (docSnap.exists()) {
      component = { id: docSnap.id, ...docSnap.data(),type:'computer' };
    } else {
      const docRefPart = doc(db, 'parts', id);
      const docSnap = await getDoc(docRefPart);
      component = { id: docSnap.id, ...docSnap.data(), type:'part' };
      
    }
  } catch (error) {
    console.error("Error fetching computer: ", error);
  }

  return component;
}

  //GET PARTS
  async getParts() {
    const db = getFirestore();
    const colRef = collection(db, 'parts');
    let parts: any[] = [];

    await getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        parts.push({ ...doc.data(), id: doc.id });

      })
    })
    return parts;
  }

  //Get My-Orders
  async getCurrentUserOrders(uid: any) {
    const db = getFirestore();

    const colRef = collection(db, 'orders');
    const q = query(colRef, where('uid', '==', uid));
    let orders: any = [];
    await getDocs(q).then(snapshot => {
      orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }).catch(error => {
      console.error("Error fetching orders: ", error);
      return [];
    });

    return orders;
  }

  //Delete order
  async deleteOrder(id: any) {
    const db = getFirestore();

    const docRef = doc(db, 'orders', id);

    try {
      await deleteDoc(docRef); // Delete the document
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  }

  async addComponent(selectedValue: string, form: any) {
    const db = getFirestore();

    if (selectedValue == "computer") {

      const docData = {
        price: form.price,
        img: form.img,
        memory: form.memory,
        ram: form.ram,
        videoCard: form.videoCard,
        processor: form.processor,
      };

      
      await setDoc(doc(db, 'computers', form.id), docData);

    }

    if (selectedValue == "part") {
      const docData = {
        price: form.price,
        img: form.img,
        info: form.info,
        type: form.type,
      };

      
      await setDoc(doc(db, 'parts', form.id), docData);

    }
    }

    async deleteComponent(collection:any , id:any){
      const db = getFirestore();
      const docRef = doc(db, collection, id);
      try {
        await deleteDoc(docRef); // Delete the document
        } catch (error) {
          console.error("Error deleting order: ", error);
          }
    }

    //Get orders
    async getOrders() {
      const db = getFirestore();
      const colRef = collection(db, 'orders');
      let orders: any[] = [];
  
      await getDocs(colRef).then((snapshot) => {
  
        snapshot.docs.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
  
        })
      })
      return orders;
    }


    async getUserDetails(uid:any) {
     
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
  }

