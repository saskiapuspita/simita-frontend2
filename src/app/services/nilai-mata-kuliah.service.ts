import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { NilaiMataKuliah } from '../interfaces/nilai-mata-kuliah';

@Injectable({
  providedIn: 'root',
})
export class NilaiMataKuliahService {
  private url =
    'https://api.simitafapetub.site/nilaimatakuliah';
    // 'http://localhost:4000/nilaimatakuliah';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<NilaiMataKuliah[]> {
    return this.http
      .get<NilaiMataKuliah[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  fetchById(id: Pick<NilaiMataKuliah, 'id'>): Observable<{}> {
    return this.http
      .get<NilaiMataKuliah>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>('fetchById')
        )
      );
  }

  create(
    formData: Partial<NilaiMataKuliah>
  ): Observable<NilaiMataKuliah> {
    console.log("formData.nilai "+ formData.nilai);
    console.log("formData.mataKuliah "+ formData.mataKuliah);
    console.log("formData.user "+ formData.user);
    
    return this.http
      .post<NilaiMataKuliah>(
        this.url,
        {
          nilai: formData.nilai,
          mataKuliah: formData.mataKuliah,
          user: formData.user,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>('create')
        )
      );
  }

  delete(id: Pick<NilaiMataKuliah, 'id'>): Observable<{}> {
    return this.http
      .delete<NilaiMataKuliah>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>('delete')
        )
      );
  }

  update(
    formData: Partial<NilaiMataKuliah>,
    id: Pick<NilaiMataKuliah, 'id'>
  ): Observable<NilaiMataKuliah> {
    return this.http
      .patch<NilaiMataKuliah>(
        `${this.url}/${id}`,
        {
          nilai: formData.nilai,
          mataKuliah: formData.mataKuliah,
          user: formData.user
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>('update')
        )
      );
  }

  fetchByIdUser(id: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .get<NilaiMataKuliah>(`https://api.simitafapetub.site/middlewarenilaimatakuliah/${id}`, this.httpOptions)
      // .get<NilaiMataKuliah>(`http://localhost:4000/middlewarenilaimatakuliah/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>('fetchByIdUser')
        )
      );
  }
}
