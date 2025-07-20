import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { LokasiSkripsi } from '../interfaces/lokasi-skripsi';

@Injectable({
  providedIn: 'root',
})
export class MasterLokasiSkripsiService {
  private url = 
  // 'https://api.simitafapetub.site/lokasiSkripsi';
  'http://localhost:4000/lokasiSkripsi';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<LokasiSkripsi[]> {
    return this.http
      .get<LokasiSkripsi[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<LokasiSkripsi[]>('fetchAll', [])
        )
      );
  }

  fetchById(id: Pick<LokasiSkripsi, 'id'>): Observable<{}> {
    return this.http
      .get<LokasiSkripsi>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<LokasiSkripsi>('fetchById')
        )
      );
  }

  create(
    formData: Partial<LokasiSkripsi>,
    idUser: Pick<User, 'id'>
  ): Observable<LokasiSkripsi> {
    console.log('nama lokasi:' + formData.namaLokasi);

    return this.http
      .post<LokasiSkripsi>(
        this.url,
        {
          namaLokasi: formData.namaLokasi,
          idUser: idUser,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<LokasiSkripsi>('create')
        )
      );
  }

  delete(id: Pick<LokasiSkripsi, 'id'>): Observable<{}> {
    return this.http
      .delete<LokasiSkripsi>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<LokasiSkripsi>('delete')
        )
      );
  }

  update(
    formData: Partial<LokasiSkripsi>,
    id: Pick<LokasiSkripsi, 'id'>
  ): Observable<LokasiSkripsi> {
    return this.http
      .patch<LokasiSkripsi>(
        `${this.url}/${id}`,
        {
          namaLokasi: formData.namaLokasi,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<LokasiSkripsi>('update')
        )
      );
  }
}
