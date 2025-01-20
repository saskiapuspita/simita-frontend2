import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  apiUrl = 
  'https://api.simitafapetub.site';
  // 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }
}
