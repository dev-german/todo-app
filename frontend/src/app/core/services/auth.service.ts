import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  async login(email: string, password: string): Promise<string | undefined | null>{
    const userCredentials = await this.afAuth.signInWithEmailAndPassword(email,password);
    const token = await userCredentials.user?.getIdToken();
    return token;
  }

  async logout(){
    return await this.afAuth.signOut();
  }
}
