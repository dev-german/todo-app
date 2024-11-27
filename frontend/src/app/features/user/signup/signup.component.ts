import { Component ,inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  messageService = inject(MessageService);

  signupForm: FormGroup;
  errorMessage: string | null | undefined= null;
  successMessage: string | null | undefined = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      const message = await this.authService.signUp(email, password);
      if (message?.toString() == "") {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro correcto',
          detail: `Se registró correctamente el usuario. Redirigiendo...`,
        });
        // Redirigir al login después de 3 segundos
        setTimeout(() => { this.router.navigate(['/login']); }, 3000);
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${message?.toString()}`,
        });
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
