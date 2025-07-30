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
  private url = 'https://api.simitafapetub.com/rekappengajuanpeminatan';
  // private url = 'http://localhost:4000/rekappengajuanpeminatan';

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
        `https://api.simitafapetub.com/middlewarerekappengajuanpeminatan`,
        // `http://localhost:4000/middlewarerekappengajuanpeminatan`,
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

  fetchApprovedById(idUser: Pick<User, 'id'>): Observable<any> {
    return this.http
      .get<RekapitulasiPeminatan>(
        `https://api.simitafapetub.com/middlewarerekappengajuanpeminatan/${idUser}`,
        // `http://localhost:4000/middlewarerekappengajuanpeminatan/${idUser}`,
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

  generateRekapitulasiPeminatan(): Observable<RekapitulasiPeminatan> {
    return this.http
      .post<RekapitulasiPeminatan>(
        `${this.url}/fetchRekapitulasiPeminatan`,
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

  fetchPeminatanByUserId(idUser: Pick<User, 'id'>): Observable<any> {
    return this.http
      .get<RekapitulasiPeminatan>(
        `https://api.simitafapetub.com/middlewarerekappeminatanmhs/${idUser}`,
        // `http://localhost:4000/middlewarerekappeminatanmhs/${idUser}`,
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

  fetchRekapitulasiPeminatanProter(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `https://api.simitafapetub.com/middlewaregetrekappeminatanproter`,
        // `http://localhost:4000/middlewaregetrekappeminatanproter`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchRekapitulasiPeminatanProter',
            []
          )
        )
      );
  }

  fetchRekapitulasiPeminatanNMT(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `https://api.simitafapetub.com/middlewaregetrekappeminatannmt`,
        // `http://localhost:4000/middlewaregetrekappeminatannmt`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchRekapitulasiPeminatanNMT',
            []
          )
        )
      );
  }

  fetchRekapitulasiPeminatanSosek(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `https://api.simitafapetub.com/middlewaregetrekappeminatansosek`,
        // `http://localhost:4000/middlewaregetrekappeminatansosek`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchRekapitulasiPeminatanSosek',
            []
          )
        )
      );
  }

  fetchRekapitulasiPeminatanTHT(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `https://api.simitafapetub.com/middlewaregetrekappeminatantht`,
        // `http://localhost:4000/middlewaregetrekappeminatantht`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchRekapitulasiPeminatanTHT',
            []
          )
        )
      );
  }

  fetchRekapitulasiPeminatanRPT(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(
        `https://api.simitafapetub.com/middlewaregetrekappeminatanrpt`,
        // `http://localhost:4000/middlewaregetrekappeminatanrpt`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<RekapitulasiPeminatan[]>(
            'fetchRekapitulasiPeminatanRPT',
            []
          )
        )
      );
  }
}
