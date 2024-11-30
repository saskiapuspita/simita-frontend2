import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthService);
    const token = localStorage.getItem('token');
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(clonedRequest).pipe(
        catchError(err => {
          // onError
          console.log(err);
          if (err instanceof HttpErrorResponse) {
              // console.log("status: " + err.status);
              // console.log("statusText: " + err.statusText);
              if (err.status === 401) {
                  authService.logout();
              }
          }
          return throwError(err);
      })
    );
    } else {
      return next.handle(req);
    }
  }
}
