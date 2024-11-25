import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = !!localStorage.getItem('token'); // Lógica de autenticación

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }else if(localStorage.getItem("token")){
      const token = localStorage.getItem("token")
      /*
      if(!this.authService.checkTokenValidity(token?.toString()){
        this.authService.logout();
        this.router.navigate(['/login']);
      }*/
    }
    return true;
  }

}

