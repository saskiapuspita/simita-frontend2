import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { KelompokPkl } from '../interfaces/kelompok-pkl';
import { User } from '../interfaces/user';
import { PeminatanMahasiswa } from '../interfaces/peminatan-mahasiswa';
import { RekapitulasiPeminatan } from '../interfaces/rekapitulasi-peminatan';

@Injectable({
  providedIn: 'root',
})
export class RekapitulasiPeminatanService {
  private url = 'http://localhost:4000/rekappengajuanpeminatan';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  fetchById(
    idRekapitulasiPeminatan: Pick<RekapitulasiPeminatan, 'id'>
  ): Observable<{}> {
    return this.http
      .get<RekapitulasiPeminatan>(
        `${this.url}/${idRekapitulasiPeminatan}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan>(
            'fetchById'
          )
        )
      );
  }

  fetchApproved(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `http://localhost:4000/middlewarerekappengajuanpeminatan`,
        {
          responseType: 'json',
        }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchApproved',
            []
          )
        )
      );
  }

  generateRekapitulasiPeminatan(
    formData: Partial<RekapitulasiPeminatan>
  ): Observable<RekapitulasiPeminatan> {
    return this.http
      .post<RekapitulasiPeminatan>(
        `${this.url}/fetchRekapitulasiPeminatan`,
        {
          idPeminatan: formData.idPeminatan,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan>(
            'generaterekapitulasiPeminatan'
          )
        )
      );
  }

  updateStatusPengajuanPeminatan(
    idPengajuanPeminatan: Pick<RekapitulasiPeminatan, 'id'>
  ): Observable<RekapitulasiPeminatan> {
    return this.http
      .patch<RekapitulasiPeminatan>(
        `${this.url}/updateStatus/${idPengajuanPeminatan}`,
        {
          id: idPengajuanPeminatan,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan>(
            'updateStatusPengajuanPeminatan'
          )
        )
      );
  }

  updateDosenPembimbingPeminatan(
    formData: Partial<RekapitulasiPeminatan>,
    idRekapitulasiPeminatan: Pick<RekapitulasiPeminatan, 'id'>
  ): Observable<RekapitulasiPeminatan> {
    return this.http
      .patch<RekapitulasiPeminatan>(
        `${this.url}/updateDosenPembimbing/${idRekapitulasiPeminatan}`,
        {
          idDosen: formData.idDosen,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan>(
            'updateDosenPembimbingPeminatan'
          )
        )
      );
  }
}
