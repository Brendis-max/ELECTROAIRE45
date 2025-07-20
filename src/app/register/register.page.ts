import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
  
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }
async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    await toast.present();
  }

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.presentToast('Por favor, completa todos los campos');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }
    if (this.password.length < 6) {
      this.presentToast('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await this.presentToast('Registro exitoso', 'success');
      this.router.navigateByUrl('/login'); // O la ruta que tengas para login
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      const errors: { [key: string]: string } = {
        'auth/email-already-in-use': 'Este correo ya está registrado',
        'auth/invalid-email': 'Correo inválido',
        'auth/weak-password': 'Contraseña débil',
        'auth/operation-not-allowed': 'Registro no permitido',
        'auth/network-request-failed': 'Error de red',
      };
      this.presentToast(errors[firebaseError.code] || 'Error en el registro');
    }
  }

  async signUpWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.additionalUserInfo?.isNewUser) {
        await this.presentToast('Registro con Google exitoso', 'success');
        this.router.navigateByUrl('/home');
      } else {
        await this.presentToast('Este correo ya existe. Inicia sesión.');
        await this.afAuth.signOut();
        this.router.navigateByUrl('/login');
      }
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      const messages: { [key: string]: string } = {
        'auth/popup-closed-by-user': 'El popup fue cerrado',
        'auth/network-request-failed': 'Fallo de red',
        'auth/popup-blocked': 'El navegador bloqueó el popup',
      };
      this.presentToast(messages[firebaseError.code] || 'Error con Google');
    }
  }
  // login(){
  //   this.router.navigate(['/login']);
  // }
}
