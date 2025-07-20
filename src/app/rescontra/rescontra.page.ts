import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  standalone:false,
  selector: 'app-rescontra',
  templateUrl: './rescontra.page.html',
  styleUrls: ['./rescontra.page.scss'],
})
export class RescontraPage {
  email: string = ''; // Bound to the form input via ngModel
  loading: boolean = false; // Controls the loading spinner

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  async resetPassword() {
    if (!this.email) {
      this.showToast('Por favor, ingresa un correo electrónico.', 'danger');
      return;
    }

    this.loading = true; // Show spinner
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.showToast(
        'Se ha enviado un enlace de restablecimiento a tu correo.',
        'success'
      );
      this.email = ''; // Clear the input
    } catch (error: any) {
      let errorMessage = 'Error al enviar el correo de restablecimiento.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico no es válido.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No existe un usuario con este correo.';
      }
      this.showToast(errorMessage, 'danger');
    } finally {
      this.loading = false; // Hide spinner
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }
}