import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  apiUrl = 
  'https://api.simitafapetub.site';
  // 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getInfoMe(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me`);
  }

  login(loginData: any): Observable<any> {
    console.log("loginData " + loginData.email);
    console.log("loginData " + loginData.password);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData);
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/logout`);
  }
}
