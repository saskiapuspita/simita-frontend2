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
export class DetailMonitoringTugasAkhirService {
private url =
    'https://api.simitafapetub.com/detailmonitoringskripsi';
    // 'http://localhost:4000/detailmonitoringskripsi';

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

  fetchByIdMonitoring(id: Pick<MonitoringTugasAkhir, 'id'>): Observable<{}> {
    return this.http
      .get<MonitoringTugasAkhir>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MonitoringTugasAkhir>('fetchByIdMonitoring')
        )
      );
  }

  create(
    formData: Partial<MonitoringTugasAkhir>
  ): Observable<MonitoringTugasAkhir> {
    return this.http
      .post<MonitoringTugasAkhir>(
        this.url,
        {
          idMonitoringSkripsi: formData.idMonitoringSkripsi,
          tanggalMonitoring: formData.tanggalMonitoring,
          uraianKegiatan: formData.uraianKegiatan
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
