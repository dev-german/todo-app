import {Component, inject} from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  confirmationService = inject(ConfirmationService);

  constructor(private authService: AuthService, private router: Router) {}

  async onLogout() {
    await this.authService.logout();
    localStorage.removeItem('token'); // Elimina el token almacenado
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

  confirmLogOut() {
    this.confirmationService.confirm({
      header: 'Cerrar Sesión',
      message: `Are you sure you want to logout?`,
      accept: () => {
        this.onLogout();
      }
    });
  }
}
