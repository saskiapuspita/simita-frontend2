import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { LokasiPkl } from '../interfaces/lokasi-pkl';

@Injectable({
  providedIn: 'root',
})
export class LokasiPklService {
  private url = 
  'https://api.simitafapetub.com/lokasiPkl';
  // 'http://localhost:4000/lokasiPkl';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<LokasiPkl[]> {
    return this.http
      .get<LokasiPkl[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<LokasiPkl[]>('fetchAll', []))
      );
  }

  fetchById(id: Pick<LokasiPkl, 'id'>): Observable<{}> {
    return this.http
      .get<LokasiPkl>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<LokasiPkl>('fetchById'))
      );
  }

  create(formData: Partial<LokasiPkl>, idUser: Pick<User, 'id'>): Observable<LokasiPkl> {
    console.log("nama lokasi:" + formData.namaLokasi);
    
    return this.http
      .post<LokasiPkl>(
        this.url,
        {
          namaLokasi: formData.namaLokasi,
          user: idUser,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<LokasiPkl>('create'))
      );
  }

  delete(id: Pick<LokasiPkl, 'id'>): Observable<{}> {
    return this.http
      .delete<LokasiPkl>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<LokasiPkl>('delete'))
      );
  }

  update(
    formData: Partial<LokasiPkl>,
    id: Pick<LokasiPkl, 'id'>
  ): Observable<LokasiPkl> {
    return this.http
      .patch<LokasiPkl>(
        `${this.url}/${id}`,
        {
          name: formData.namaLokasi,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<LokasiPkl>('update'))
      );
  }
}
