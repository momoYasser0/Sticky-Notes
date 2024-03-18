import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isLogin: boolean = false

  ngOnInit(): void {
    this._AuthService.isLogin.subscribe({
      next: (Response) => {
        this.isLogin = Response
      }
    })
    Closenav()

  }


  logOut(): void {
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login'])
    this.isLogin = false
  }

}
function Closenav(): void {
  document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', function () {
    document.getElementById('navbar')?.setAttribute('aria-expanded', 'false')
    document.getElementById('navbar')?.classList.add('collapsed')
    document.getElementById('navbarNav')?.classList.remove('show')
  }))
}
