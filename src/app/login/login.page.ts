import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.showToast('Completa todos los campos', 'danger');
      return;
    }

    try {
      await this.authService.loginWithEmail(this.email, this.password);
      this.showToast('Inicio de sesión exitoso', 'success');
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } catch (error: any) {
      const errorMessages: { [key: string]: string } = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/invalid-email': 'Correo inválido',
        'auth/user-disabled': 'Usuario deshabilitado',
        'auth/invalid-credential': 'Credenciales incorrectas',
        'auth/network-request-failed': 'Sin conexión',
      };
      const msg = errorMessages[error.code] || 'Error al iniciar sesión';
      this.showToast(msg, 'danger');
    }
  }

  async signInWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.showToast('Inicio de sesión con Google exitoso', 'success');
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } catch (error: any) {
      this.showToast('Error con Google', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
