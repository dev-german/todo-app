import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  async login(email: string, password: string): Promise<any | undefined | null> {
    try {
      const userCredentials = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token = await userCredentials.user?.getIdToken();
      console.log(userCredentials)
      return {"state": true, "token": token};
    } catch (error) {
      return {"state": false, "error": error?.toString()};
    }
  }

  async logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    return await this.afAuth.signOut();
  }

  async signUp(email: string, password: string): Promise<string | undefined | null> {
    try {
      const userCredentials = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredentials != null ? "" : "Ocurrio un error inesperado";
    } catch (error) {
      return error?.toString();
    }
  }
}
