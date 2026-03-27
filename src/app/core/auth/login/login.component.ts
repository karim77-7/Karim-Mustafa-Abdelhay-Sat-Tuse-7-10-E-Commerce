import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fB = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isHidden : WritableSignal<boolean> = signal(true)
  errorMsg: WritableSignal<string> = signal('');
  successMsg: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.formInit();
  }
  loginForm!: FormGroup;

  formInit() {
    this.loginForm = this.fB.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z]).{8,}$/)]],
      },
 
    );
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // save token
          localStorage.setItem('token' , res.token)
          // hide error msg
          this.errorMsg.set('');
          // show success msg
          this.successMsg.set(`${res.message}, Logged in successfully`);
          // navigate to home
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);

          this.authService.isLoggedIn.set(true)
        },
        error: (err) => {
          console.log(err);
          this.successMsg.set('');

          this.errorMsg.set(err.error.message);
        },
      });
    }
  }


}
