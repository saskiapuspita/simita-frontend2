import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { MataKuliah } from '../interfaces/mata-kuliah';
import { Peminatan } from '../interfaces/peminatan';

@Injectable({
  providedIn: 'root',
})
export class MasterMataKuliahService {
  private url =
    'https://api.simitafapetub.com/matakuliah';
    // 'http://localhost:4000/matakuliah';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<MataKuliah[]> {
    return this.http
      .get<MataKuliah[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MataKuliah[]>('fetchAll', [])
        )
      );
  }

  fetchById(mataKuliahId: Pick<MataKuliah, 'id'>): Observable<{}> {
    return this.http
      .get<MataKuliah>(`${this.url}/${mataKuliahId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('getMataKuliahById')
        )
      );
  }

  fetchMatkulBasedOnIdPeminatan(
    idPeminatan: number
  ): Observable<any> {
    return this.http
      .get<MataKuliah>(
        `${this.url}/getSpecificMatkulByIdPeminatan/${idPeminatan}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('fetchMatkulBasedOnIdPeminatan')
        )
      );
  }

  fetchNamaPeminatanBasedOnIdMinat(): Observable<any[]> {
    return this.http
      .get<any[]>(
        `https://api.simitafapetub.com/middlewarematakuliah`,
        // `http://localhost:4000/middlewarematakuliah`,
        {
          responseType: 'json',
        }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<any[]>(
            'fetchNamaPeminatanBasedOnIdMinat',
            []
          )
        )
      );
  }

  create(
    formData: Partial<MataKuliah>,
    userId: Pick<User, 'id'>
  ): Observable<MataKuliah> {
    return this.http
      .post<MataKuliah>(
        this.url,
        {
          nama: formData.nama,
          sks: formData.sks,
          minat: formData.minat,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('create')
        )
      );
  }

  delete(mataKuliahId: Pick<MataKuliah, 'id'>): Observable<{}> {
    return this.http
      .delete<MataKuliah>(`${this.url}/${mataKuliahId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('deleteMataKuliah')
        )
      );
  }

  update(
    formData: Partial<MataKuliah>,
    userId: Pick<User, 'id'>,
    mataKuliahId: Pick<MataKuliah, 'id'>
  ): Observable<MataKuliah> {
    return this.http
      .patch<MataKuliah>(
        `${this.url}/${mataKuliahId}`,
        {
          nama: formData.nama,
          sks: formData.sks,
          minat: formData.minat,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('updateMataKuliah')
        )
      );
  }
}
