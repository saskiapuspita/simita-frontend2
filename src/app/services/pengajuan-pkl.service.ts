import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { KelompokPkl } from '../interfaces/kelompok-pkl';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PengajuanPklService {
  // private apiUrlKelompokPkl = 'https://api.simitafapetub.site/kelompokPkl';
  // private apiUrlPengajuanPkl = 'https://api.simitafapetub.site/pengajuanPkl';

  private apiUrlKelompokPkl = 'http://localhost:4000/kelompokPkl';
  private apiUrlPengajuanPkl = 'http://localhost:4000/pengajuanPkl';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<KelompokPkl[]> {
    return this.http
      .get<KelompokPkl[]>(`${this.apiUrlPengajuanPkl}`, {
        responseType: 'json',
      })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<KelompokPkl[]>('fetchAll', [])
        )
      );
  }

  fetchById(idUser: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .get<User>(`${this.apiUrlPengajuanPkl}/${idUser}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('fetchById'))
      );
  }

  fetchStudentNotAsAnggotaAtauKetua(): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${this.apiUrlKelompokPkl}/fetchStudentNotAsAnggotaAtauKetua`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<User[]>(
            'fetchStudentNotAsAnggotaAtauKetua',
            []
          )
        )
      );
  }

  fetchDetailStudentNotInGroup(
    idAnggota: Pick<KelompokPkl, 'id'>
  ): Observable<{}> {
    return this.http
      .get<KelompokPkl>(
        `${this.apiUrlKelompokPkl}/studentNotInGroup/${idAnggota}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<KelompokPkl>(
            'fetchDetailStudentNotInGroup'
          )
        )
      );
  }

  create(
    formData: Partial<KelompokPkl>,
    idUser: Pick<User, 'id'>
  ): Observable<KelompokPkl> {
    return this.http
      .post<KelompokPkl>(
        `${this.apiUrlPengajuanPkl}`,
        {
          idKetua: formData.idKetua,
          idAnggota1: formData.idAnggota1,
          idAnggota2: formData.idAnggota2,
          idAnggota3: formData.idAnggota3,
          idAnggota4: formData.idAnggota4,
          idAnggota5: formData.idAnggota5,
          idLokasiPkl: formData.idLokasiPkl,
          idDosenPembimbing: formData.idDosenPembimbing,
          user: idUser,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<KelompokPkl>('create'))
      );
  }

  delete(userId: Pick<KelompokPkl, 'id'>): Observable<{}> {
    return this.http
      .delete<User>(`${this.apiUrlPengajuanPkl}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<KelompokPkl>('delete'))
      );
  }

  updateStatusPengajuanPkl(
    idPengajuanPkl: Pick<KelompokPkl, 'id'>
  ): Observable<KelompokPkl> {
    return this.http
      .patch<KelompokPkl>(
        `${this.apiUrlPengajuanPkl}/updateStatus/${idPengajuanPkl}`,
        {
          idPengajuanPkl: idPengajuanPkl
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<KelompokPkl>(
            'updateStatusPengajuanPkl'
          )
        )
      );
  }

  //ketua pkl
  fetchAllKetuaKelompokPkl(): Observable<KelompokPkl[]> {
    return this.http
      .get<KelompokPkl[]>(`${this.apiUrlKelompokPkl}/fetchAllKetuaPkl`, {
        responseType: 'json',
      })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<KelompokPkl[]>(
            'fetchAllKetuaKelompokPkl',
            []
          )
        )
      );
  }

  addKetuaKelompokPkl(
    formData: Partial<KelompokPkl>,
    idUser: Pick<User, 'id'>
  ): Observable<KelompokPkl> {
    return this.http
      .post<KelompokPkl>(
        `${this.apiUrlKelompokPkl}/addKetuaPkl`,
        {
          idKetua: formData.idKetua,
          user: idUser,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<KelompokPkl>(
            'addKetuaKelompokPkl'
          )
        )
      );
  }

  deleteKetuaKelompokPkl(id: Pick<KelompokPkl, 'id'>): Observable<{}> {
    return this.http
      .delete<User>(
        `${this.apiUrlKelompokPkl}/deleteKetuaPkl/${id}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('deleteUser'))
      );
  }
}
