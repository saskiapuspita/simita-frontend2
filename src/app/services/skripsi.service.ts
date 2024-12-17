import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { Skripsi } from '../interfaces/skripsi';

@Injectable({
  providedIn: 'root',
})
export class SkripsiService {
  private url = 'https://api.simitafapetub.site/skripsi';
  // 'http://localhost:4000/skripsi';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAllPengajuanSkripsi(): Observable<Skripsi[]> {
    return this.http
      .get<Skripsi[]>(`${this.url}/pengajuanSkripsi`, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Skripsi[]>(
            'fetchAllPengajuanSkripsi',
            []
          )
        )
      );
  }

  fetchAllApprovedSkripsi(): Observable<Skripsi[]> {
    return this.http
      .get<Skripsi[]>(`${this.url}/approvedSkripsi`, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Skripsi[]>(
            'fetchAllApprovedSkripsi',
            []
          )
        )
      );
  }

  fetchById(idSkripsi: Pick<Skripsi, 'id'>): Observable<{}> {
    return this.http
      .get<Skripsi>(`${this.url}/${idSkripsi}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Skripsi>('fetchById'))
      );
  }

  create(
    formData: Partial<Skripsi>,
    userId: Pick<User, 'id'>
  ): Observable<Skripsi> {
    return this.http
      .post<Skripsi>(
        this.url,
        {
          idUser: userId,
          judulSkripsi: formData.judulSkripsi,
          idLokasi: formData.idLokasi,
          idDosen: formData.idDosen,
          persentaseNilaiD: formData.persentaseNilaiD,
          persentaseNilaiE: formData.persentaseNilaiE,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Skripsi>('create'))
      );
  }

  delete(idSkripsi: Pick<Skripsi, 'id'>): Observable<{}> {
    return this.http
      .delete<Skripsi>(`${this.url}/${idSkripsi}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Skripsi>('delete'))
      );
  }

  update(
    formData: Partial<Skripsi>,
    idSkripsi: Pick<Skripsi, 'id'>
  ): Observable<Skripsi> {
    return this.http
      .patch<Skripsi>(
        `${this.url}/${idSkripsi}`,
        {
          judulSkripsi: formData.judulSkripsi,
          idLokasi: formData.idLokasi,
          idDosen: formData.idDosen,
          persentaseNilaiD: formData.persentaseNilaiD,
          persentaseNilaiE: formData.persentaseNilaiE,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Skripsi>('update'))
      );
  }

  updateStatusPengajuanJudulSkripsi(
    idPengajuanSkripsi: Pick<Skripsi, 'id'>
  ): Observable<Skripsi> {
    return this.http
      .patch<Skripsi>(
        `${this.url}/updateStatus/${idPengajuanSkripsi}`,
        {
          id: idPengajuanSkripsi,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Skripsi>(
            'updateStatusPengajuanJudulSkripsi'
          )
        )
      );
  }
}
