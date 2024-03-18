import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('token') != null) {
      const myToken: any = {
        token: '3b8ny__' + sessionStorage.getItem('token')
      }
      request = request.clone({
        setHeaders: myToken

      })

    }
    return next.handle(request);
  }
}
