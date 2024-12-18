import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor() {
    initializeApp(environment.firebaseConfig);
  }

  //GET COMPUTERS
  async getComputers() {
    const db = getFirestore();
    const colRef = collection(db, 'computers');
    let computers: any[] = [];

    await getDocs(colRef).then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        computers.push({ ...doc.data(), id: doc.id });

      })
    })

    return computers;
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
      console.log(`Order with ID ${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  }

  async addComponent(selectedValue: string, form: any) {
    console.log(selectedValue, form);
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

      console.log(form);
      
      await setDoc(doc(db, 'computers', form.id), docData);

    }

    if (selectedValue == "part") {
      const docData = {
        price: form.price,
        img: form.img,
        info: form.info,
        type: form.type,
      };

      console.log(form);
      
      await setDoc(doc(db, 'parts', form.id), docData);

    }
    }
  }

