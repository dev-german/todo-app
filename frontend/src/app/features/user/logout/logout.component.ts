import {Component, inject} from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    AvatarModule,
    RippleModule,
    MenuModule
  ],
  providers: [ConfirmationService],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  confirmationService = inject(ConfirmationService);
  usuario: string = localStorage.getItem("usuario")!.toString()

  items: Array<MenuItem> = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      separator: true
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.confirmLogOut()
      }
    }
  ]

  constructor(private authService: AuthService, private router: Router) {}

  async onLogout() {
    await this.authService.logout();
    localStorage.clear();
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
