import { Component,inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ButtonModule,InputTextModule,ToastModule],
  providers:[
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  messageService = inject(MessageService);
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const result = await this.authService.login(email, password);
        if(result != null && result.state){
          localStorage.setItem('usuario', email || '');
          localStorage.setItem('token', result?.token || '');
          // Redirige o realiza acciones adicionales después del inicio de sesión
          this.router.navigate(['/todo']);
        }else{
          this.mensaje('error','Error al iniciar sesión',result.error?.toString());
        }
      } catch (error) {
        this.mensaje('error','Error al iniciar sesión','Ocurrio un error al iniciar sesión');
      }
    }
  }

  gotoSignin(){
    this.router.navigate(['/signup']);
  }

  mensaje(severity: string, summary:string, detail:string){
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: `${detail}`,
    });
  }
}
