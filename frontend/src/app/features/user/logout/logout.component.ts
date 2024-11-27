import { Component } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async onLogout() {
    await this.authService.logout();
    localStorage.removeItem('token'); // Elimina el token almacenado
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}
