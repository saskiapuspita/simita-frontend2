import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { Ruangan } from '../interfaces/ruangan';

@Injectable({
  providedIn: 'root'
})
export class RuanganService {
  private url = 
  'https://api.simitafapetub.site/ruangan';
  // 'http://localhost:4000/ruangan';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Ruangan[]> {
    return this.http
      .get<Ruangan[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Ruangan[]>('fetchAll', [])
        )
      );
  }

  fetchById(id: Pick<Ruangan, 'id'>): Observable<{}> {
    return this.http
      .get<Ruangan>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Ruangan>('fetchById')
        )
      );
  }

  create(
    formData: Partial<Ruangan>
  ): Observable<Ruangan> {
    console.log('nama ruang:' + formData.namaRuang);

    return this.http
      .post<Ruangan>(
        this.url,
        {
          namaRuang: formData.namaRuang
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Ruangan>('create')
        )
      );
  }

  delete(id: Pick<Ruangan, 'id'>): Observable<{}> {
    return this.http
      .delete<Ruangan>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Ruangan>('delete')
        )
      );
  }

  update(
    formData: Partial<Ruangan>,
    id: Pick<Ruangan, 'id'>
  ): Observable<Ruangan> {
    return this.http
      .patch<Ruangan>(
        `${this.url}/${id}`,
        {
          namaRuang: formData.namaRuang,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Ruangan>('update')
        )
      );
  }
}
