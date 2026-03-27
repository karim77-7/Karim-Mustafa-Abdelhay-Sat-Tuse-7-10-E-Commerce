import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink , ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fB = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isHidden : WritableSignal<boolean> = signal(true)
  isHiddenConfirmPassword : WritableSignal<boolean> = signal(true)

  errorMsg : WritableSignal <string> = signal('')
  successMsg : WritableSignal <string> = signal('')

  ngOnInit(): void {
    this.formInit(  )
  }
  registerForm! : FormGroup ;

  formInit() {
    this.registerForm = this.fB.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z]).{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { 
      validators: [this.confirmPassword] 
    });
  }
  
  register(){
    if(this.registerForm.valid){
      this.authService.signUp(this.registerForm.value).subscribe({
        next : (res)=>{
          console.log(res);
          this.errorMsg.set('')
          this.successMsg.set(`${res.message}, Account created successfully`)
setTimeout(() => {
  this.router.navigate(['/login'])
}, 2000);        },
        error : (err)=>{
          console.log(err);
          this.successMsg.set('')

          this.errorMsg.set(err.error.message)
        }
      })
    }    
  }

  confirmPassword(gp:AbstractControl){
    let password = gp.get('password')?.value

    let rePassword = gp.get('rePassword')?.value

    if(password === rePassword){
      return null
    }
    else{
      return {mismatch : true}
    }
      
  }
}
