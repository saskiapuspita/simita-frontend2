import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { SeminarProposal } from '../interfaces/seminar-proposal';

@Injectable({
  providedIn: 'root'
})
export class SeminarProposalService {
  private url = 'https://api.simitafapetub.site/seminarproposal';
  // 'http://localhost:4000/seminarproposal';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<SeminarProposal[]> {
    return this.http
      .get<SeminarProposal[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<SeminarProposal[]>('fetchAll', [])
        )
      );
  }

  fetchById(id: Pick<SeminarProposal, 'id'>): Observable<{}> {
    return this.http
      .get<SeminarProposal>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<SeminarProposal>('fetchById')
        )
      );
  }

  create(
    formData: Partial<SeminarProposal>,
    userId: Pick<User, 'id'>
  ): Observable<SeminarProposal> {
    return this.http
      .post<SeminarProposal>(
        this.url,
        {
          idUser: userId,
          judulSkripsi: formData.judulSkripsi,
          idRuang: formData.idRuang,
          tanggalSeminar: formData.tanggalSeminar,
          waktuSeminar: formData.waktuSeminar
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<SeminarProposal>('create')
        )
      );
  }

  delete(id: Pick<SeminarProposal, 'id'>): Observable<{}> {
    return this.http
      .delete<SeminarProposal>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<SeminarProposal>('delete')
        )
      );
  }
}
