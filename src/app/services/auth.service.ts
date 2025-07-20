// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigateByUrl('/tabs/tab1');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
      this.router.navigateByUrl('/tabs/tab1');
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
