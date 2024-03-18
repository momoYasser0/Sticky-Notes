import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/Environments/base-url';
import { Userdata } from '../Interfaces/userdata';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false)
  userToken = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.decodeToken()
  }



  register(userData: Userdata): Observable<any> {
    return this._HttpClient.post(environment.baseURl + 'signUp', userData)
  }
  login(userData: Userdata): Observable<any> {
    return this._HttpClient.post(environment.baseURl + 'signIn', userData)
  }

  decodeToken(): any {
    const token = sessionStorage.getItem('token')
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userToken.next(decoded);
        this.isLogin.next(true)

      } catch (error: any) {
        if (error.message.includes('Invalid token')) {
          sessionStorage.removeItem('token');
          this._Router.navigate(['/login']);
        }
      }
    }
  }
}
