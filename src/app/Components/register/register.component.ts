import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showPass: boolean = false;
  isLoading: boolean = false;
  apiError: string = ''
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][\w\s!@#$%^&*()*-+//\.]{3,}$/)]),
    age: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|100)$/)]),
    phone: new FormControl('', Validators.required)
  })

  handleForm(form: FormGroup): void {
    this.isLoading = true
    if (form.valid) {
      this._AuthService.register(form.value).subscribe({
        next: (Response) => {
          if (Response.msg == 'done') {
            this.isLoading = false
            this._Router.navigate(['/login'])

          }

        }, error: (err) => {
          this.isLoading = false
          if (err.error.statusCode = 401) {
            const email = form.get('email')
            email?.setErrors({ emailExist: true })
          }
        }
      })
    }
  }
}
