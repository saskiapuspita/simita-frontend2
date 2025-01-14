import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Dosen } from '../interfaces/dosen';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  fetchAvailableDosenPembimbingPeminatan(): Observable<Dosen[]> {
    return this.http
      .get<Dosen[]>(`https://api.simitafapetub.site/middlewarekuotadosenpeminatan`, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen[]>('fetchAvailableDosenPembimbingPeminatan', []))
      );
  }
}
