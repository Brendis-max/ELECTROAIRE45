import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CitasService } from '../services/citas.service'; // Adjust path as needed

@Component({
  selector: 'app-cita',
  templateUrl: './cita.page.html',
  styleUrls: ['./cita.page.scss'],
  standalone: false
})
export class CitaPage implements OnInit {
  constructor(
    private router: Router,
    private citasService: CitasService,
    private toastController: ToastController
  ) {
    console.log('CitasService injected:', this.citasService); // Debug
  }

  date: string = '';
  time: string = '';
  address: string = '';
  service: string = '';
  notes: string = '';

  mostrarFecha: boolean = false;
  mostrarHora: boolean = false;

  servicios: string[] = [
    'Mantenimiento preventivo',
    'Instalación',
    'Reparación correctiva'
  ];

  ngOnInit() {}

  async agendarCita() {
    if (!this.date || !this.time || !this.address || !this.service) {
      await this.presentToast('Por favor, completa todos los campos requeridos', 'danger');
      return;
    }

    const cita = {
      date: this.date,
      time: this.time,
      address: this.address,
      service: this.service,
      notes: this.notes,
      estado: 'pendiente',
      fechaCreacion: new Date()
    };

    try {
      await this.citasService.crearCita(cita);
      console.log('✅ Cita enviada a Firebase');
      await this.presentToast('✅ Cita registrada con éxito', 'success');
      this.router.navigate(['/miscitas']);
    } catch (error) {
      console.error('❌ Error al guardar cita:', error);
      await this.presentToast('Ocurrió un error al guardar la cita', 'danger');
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'top',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  regresar() {
    this.router.navigate(['/tabs/tab2']);
  }

  abrirFecha() {
    this.mostrarFecha = true;
  }

  cerrarFecha() {
    this.mostrarFecha = false;
  }

  abrirHora() {
    this.mostrarHora = true;
  }

  cerrarHora() {
    this.mostrarHora = false;
  }
}