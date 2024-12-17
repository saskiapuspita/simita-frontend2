import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestApiService {

  apiUrl = 'https://api.simitafapetub.site';
  // 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getInterests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interests`);
  }

  getInterestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/interests/${id}`);
  }

  addInterest(interestData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/interests`, interestData);
  }

  updateInterest(uuid: string, interestData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/interests/${uuid}`, interestData);
  }

  deleteInterest(uuid: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/interests/${uuid}`);
  }
}
