import { Component } from '@angular/core'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  userName: string = 'Usuario';
  userEmail: string = 'correo@desconocido.com';
  cartItems: any[] = [];
  userPhotoURL: string = 'assets/usuario.png';


  constructor(private afAuth: AngularFireAuth, private router: Router,private storage: AngularFireStorage,) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email || 'correo@desconocido.com';
        const extractedName = user.email?.split('@')[0] || '';
        this.userName = this.capitalize(extractedName);
        
      }
    });
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  goToCitas() {
    this.router.navigate(['/miscitas']);
  }

  goToCompras() {
     this.router.navigate(['/miscompras']);
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
    this.router.navigate(['/login']);
    });
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
