import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][\w\s!@#$%^&*()*-+//\.]{3,}$/)]),
  })

  handleLogin(form: FormGroup): void {

    this.isLoading = true
    if (form.valid) {
      this._AuthService.login(form.value).subscribe({
        next: (Response) => {
          this.isLoading = false
          if (Response.msg == 'done') {
            sessionStorage.setItem('token', Response.token)
            this._AuthService.decodeToken()
            this._Router.navigate(['/home'])

          }

        }, error: (err) => {
          if (err.error.msg == 'invalid password') {
            this.isLoading = false
            const pass = form.get('password')
            pass?.setErrors({ invalidPass: true })
          } else if (err.error.msg == 'email not exist') {
            this.isLoading = false
            const email = form.get('email')
            email?.setErrors({ invalidEmail: true })
          }

        }
      })
    }
  }
}
