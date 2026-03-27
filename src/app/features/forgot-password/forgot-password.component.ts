import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initForms();
  }

  stepNumber: WritableSignal<number> = signal(1);
  errorMsg: WritableSignal<string> = signal('');
  successMsg: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  forgotPasswordForm!: FormGroup;
  verifyResetCodeForm!: FormGroup;
  ResetPasswordForm!: FormGroup;

  initForms() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyResetCodeForm = this.fb.group({
      resetCode: [null, Validators.required], 
    });
    this.ResetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z]).{8,}$/)]],
    });
  }

  private clearMessages() {
    this.errorMsg.set('');
    this.successMsg.set('');
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) return;
    this.clearMessages();
    this.isLoading.set(true);

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMsg.set(res.message || 'Reset code sent to your email');
        setTimeout(() => {
          this.stepNumber.set(2);
          this.clearMessages();
        }, 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message || 'Something went wrong');
      },
    });
  }

  verifyResetCode() {
    if (this.verifyResetCodeForm.invalid) return;
    this.clearMessages();
    this.isLoading.set(true);

    this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMsg.set(res.message || 'Code verified successfully');
        setTimeout(() => {
          this.stepNumber.set(3);  
          this.clearMessages();
        }, 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message || 'Invalid reset code');
      },
    });
  }

  ResetPassword() {
    if (this.ResetPasswordForm.invalid) return;
    this.clearMessages();
    this.isLoading.set(true);

    this.authService.resetPassword(this.ResetPasswordForm.value).subscribe({  
      next: (res) => {
        this.isLoading.set(false);
        this.successMsg.set(res.message || 'Password reset successfully');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message || 'Failed to reset password');
      },
    });
  }
}