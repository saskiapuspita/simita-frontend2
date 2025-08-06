import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { MonitoringTugasAkhir } from '../interfaces/monitoring-tugas-akhir';

@Injectable({
  providedIn: 'root'
})
export class MonitoringTugasAkhirService {
  private url =
    'https://api.simitafapetub.com/monitoringskripsi';
    // 'http://localhost:4000/monitoringskripsi';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<MonitoringTugasAkhir[]> {
    return this.http
      .get<MonitoringTugasAkhir[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MonitoringTugasAkhir[]>('fetchAll', [])
        )
      );
  }

  fetchByUserId(id: Pick<MonitoringTugasAkhir, 'id'>): Observable<{}> {
    return this.http
      .get<MonitoringTugasAkhir>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MonitoringTugasAkhir>('fetchByUserId')
        )
      );
  }

  create(
    formData: Partial<MonitoringTugasAkhir>,
    userId: Pick<User, 'id'>
  ): Observable<MonitoringTugasAkhir> {
    return this.http
      .post<MonitoringTugasAkhir>(
        this.url,
        {
          idUser: userId,
          idDosenPembimbing1: formData.idDosenPembimbing1,
          idDosenPembimbing2: formData.idDosenPembimbing2,
          judulSkripsi: formData.judulSkripsi
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<MonitoringTugasAkhir>('create'))
      );
  }

  delete(id: Pick<MonitoringTugasAkhir, 'id'>): Observable<{}> {
    return this.http
      .delete<MonitoringTugasAkhir>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<MonitoringTugasAkhir>('delete'))
      );
  }
}
