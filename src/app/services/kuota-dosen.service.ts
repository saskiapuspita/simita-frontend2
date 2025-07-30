import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { KuotaDosen } from '../interfaces/kuota-dosen';

@Injectable({
  providedIn: 'root'
})
export class KuotaDosenService {
  private url = 
  'https://api.simitafapetub.com/kuotadosen';
  // 'http://localhost:4000/kuotadosen';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<KuotaDosen[]> {
    return this.http
      .get<KuotaDosen[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<KuotaDosen[]>('fetchAll', []))
      );
  }

  fetchById(id: Pick<KuotaDosen, 'id'>): Observable<{}> {
    return this.http
      .get<KuotaDosen>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<KuotaDosen>('fetchById'))
      );
  }

  create(formData: Partial<KuotaDosen>): Observable<KuotaDosen> {
    return this.http
      .post<KuotaDosen>(
        this.url,
        {
          idDosen: formData.idDosen,
          kuotaDosenUntukPeminatan: formData.kuotaDosenUntukPeminatan,
          kuotaDosenUntukSkripsi: formData.kuotaDosenUntukSkripsi,
          kuotaDosenUntukTesis: formData.kuotaDosenUntukTesis,
          kuotaDosenUntukDisertasi: formData.kuotaDosenUntukDisertasi
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<KuotaDosen>('create'))
      );
  }

  delete(id: Pick<KuotaDosen, 'id'>): Observable<{}> {
    return this.http
      .delete<KuotaDosen>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<KuotaDosen>('delete'))
      );
  }

  update(
    formData: Partial<KuotaDosen>,
    id: Pick<KuotaDosen, 'id'>
  ): Observable<KuotaDosen> {
    return this.http
      .patch<KuotaDosen>(
        `${this.url}/${id}`,
        {
          kuotaDosenUntukPeminatan: formData.kuotaDosenUntukPeminatan,
          kuotaDosenUntukSkripsi: formData.kuotaDosenUntukSkripsi,
          kuotaDosenUntukTesis: formData.kuotaDosenUntukTesis,
          kuotaDosenUntukDisertasi: formData.kuotaDosenUntukDisertasi
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<KuotaDosen>('update'))
      );
  }

  assignDepartemenDosen(
    formData: Partial<KuotaDosen>,
    id: Pick<KuotaDosen, 'id'>
  ): Observable<KuotaDosen> {
    console.log("formData.departemenDosen: " + formData.departemenDosen);
    
    return this.http
      .patch<KuotaDosen>(
        `http://localhost:4000/middlewaredepartemendosen/${id}`,
        {
          departemenDosen: formData.departemenDosen,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<KuotaDosen>('assignDepartemenDosen'))
      );
  }

  fetchDosenByDepartemen(idPeminatan: number): Observable<{}> {
    return this.http
      .get<KuotaDosen>(`http://localhost:4000/middlewaredepartemendosen/${idPeminatan}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<KuotaDosen>('fetchDosenByDepartemen'))
      );
  }
}
