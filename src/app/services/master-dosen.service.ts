import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Dosen } from '../interfaces/dosen';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDosenService {
  private url = 
  'https://api.simitafapetub.site/dosen';
  // 'http://localhost:4000/dosen';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  fetchAll(): Observable<Dosen[]> {
    return this.http
      .get<Dosen[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen[]>('fetchAll', []))
      );
  }

  fetchById(idDosen: Pick<Dosen, 'id'>): Observable<{}> {
    return this.http
      .get<Dosen>(`${this.url}/${idDosen}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Dosen>('fetchById'))
      );
  }

  create(formData: Partial<Dosen>): Observable<Dosen> {
    return this.http
      .post<Dosen>(
        this.url,
        {
          name: formData.name,
          email: formData.email,
          nidn: formData.nidn
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen>('create'))
      );
  }

  delete(idDosen: Pick<Dosen, 'id'>): Observable<{}> {
    return this.http
      .delete<Dosen>(`${this.url}/${idDosen}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Dosen>('delete'))
      );
  }

  update(
    formData: Partial<Dosen>,
    idDosen: Pick<Dosen, 'id'>
  ): Observable<Dosen> {
    return this.http
      .patch<Dosen>(
        `${this.url}/${idDosen}`,
        {
          name: formData.name,
          email: formData.email,
          nidn: formData.nidn
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen>('update'))
      );
  }
}
