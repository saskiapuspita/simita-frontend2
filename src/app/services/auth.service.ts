import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { TokenAndId } from '../interfaces/token-and-id';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url =
    // 'https://api.simitafapetub.site/auth';
    'http://localhost:4000/auth';

  loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username')!);
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userrole')!);
  userId!: Pick<User, 'id'>;
  name!: Pick<User, 'id'>;
  email!: Pick<User, 'id'>;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  login(input: string): Observable<TokenAndId> {
    return this.http
      .post<TokenAndId>(`${this.url}/login`, input, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: TokenAndId) => {
          this.userId = tokenObject.userId;
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('token', tokenObject.token);
          localStorage.setItem('username', tokenObject.name);
          localStorage.setItem('userrole', tokenObject.role);
          this.router.navigate(['dashboard']);
          // if (tokenObject.role == "mahasiswa") {
          //   this.router.navigate(['peminatanmahasiswa']);
          // } else {
          //   this.router.navigate(['userprofile']);
          // }
        }),
        catchError(this.errorHandlerService.handleError<TokenAndId>('login'))
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken;
  }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie == '1') {
      return true;
    }
    return false;
  }

  logout() {
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log('Logged Out Successfully');
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
