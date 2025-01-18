import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MasterMahasiswaService {
  private url =
    // 'https://api.simitafapetub.site/user';
    'http://localhost:4000/user';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<User[]>('fetchAll', []))
      );
  }

  fetchById(userId: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .get<User>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('getUserById'))
      );
  }

  create(formData: Partial<User>): Observable<User> {
    return this.http
      .post<User>(
        this.url,
        {
          name: formData.name,
          email: formData.email,
          nim: formData.nim,
          ipk: formData.ipk,
          sks: formData.sks,
          noTelp: formData.noTelp,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<User>('createUser'))
      );
  }

  delete(userId: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .delete<User>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('deleteUser'))
      );
  }

  update(
    formData: Partial<User>,
    userId: Pick<User, 'id'>
  ): Observable<User> {
    return this.http
      .patch<User>(
        `${this.url}/${userId}`,
        {
          name: formData.name,
          email: formData.email,
          nim: formData.nim,
          ipk: formData.ipk,
          sks: formData.sks,
          noTelp: formData.noTelp,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<User>('update'))
      );
  }

  updatePassword(password: string, userId: Pick<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(
        `${this.url}/setStudentPassword/${userId}`,
        {
          password: password,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<User>('updatePassword'))
      );
  }
}
