import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private firestore: Firestore) {}

  async crearCita(cita: any) {
    const citasRef = collection(this.firestore, 'citas');
    await addDoc(citasRef, cita);
  }
}
