import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { User } from '../interfaces/user';
import { PeminatanMahasiswa } from '../interfaces/peminatan-mahasiswa';

@Injectable({
  providedIn: 'root',
})
export class PengajuanPeminatanService {
  private url =
    'https://api.simitafapetub.site/peminatanmhs';
    // 'http://localhost:4000/peminatanmhs';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<PeminatanMahasiswa[]> {
    return this.http
      .get<PeminatanMahasiswa[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<PeminatanMahasiswa[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  fetchById(userId: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .get<PeminatanMahasiswa>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<PeminatanMahasiswa>('fetchById')
        )
      );
  }

  create(
    formData: Partial<PeminatanMahasiswa>,
    idUser: Pick<User, 'id'>
  ): Observable<PeminatanMahasiswa> {
    if (formData.idMatkulMinat4 == null) {
      formData.idMatkulMinat4 = 0
    }
    if (formData.nilaiMatkulMinat4 == null) {
      formData.nilaiMatkulMinat4 = '-'
    }

    if (formData.idMatkulMinat5 == null) {
      formData.idMatkulMinat5 = 0
    }
    if (formData.nilaiMatkulMinat5 == null) {
      formData.nilaiMatkulMinat5 = '-'
    }

    return this.http
      .post<PeminatanMahasiswa>(
        this.url,
        {
          urutanMinat: formData.urutanMinat,
          pilihanMinat: formData.pilihanMinat,
          idMatkulMinat1: formData.idMatkulMinat1,
          nilaiMatkulMinat1: formData.nilaiMatkulMinat1,
          idMatkulMinat2: formData.idMatkulMinat2,
          nilaiMatkulMinat2: formData.nilaiMatkulMinat2,
          idMatkulMinat3: formData.idMatkulMinat3,
          nilaiMatkulMinat3: formData.nilaiMatkulMinat3,
          idMatkulMinat4: formData.idMatkulMinat4,
          nilaiMatkulMinat4: formData.nilaiMatkulMinat4,
          idMatkulMinat5: formData.idMatkulMinat5,
          nilaiMatkulMinat5: formData.nilaiMatkulMinat5,
          haveRecommendation: formData.haveRecommendation,
          judulProyek: formData.judulProyek,
          sumberPendanaan: formData.sumberPendanaan,
          tahunPendanaanProyek: formData.tahunPendanaanProyek,
          statusProyek: formData.statusProyek,
          idUser: idUser,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<PeminatanMahasiswa>('create')
        )
      );
  }

  delete(idPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'id'>): Observable<{}> {
    return this.http
      .delete<PeminatanMahasiswa>(
        `${this.url}/${idPeminatanMahasiswa}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<PeminatanMahasiswa>('delete')
        )
      );
  }

  uploadFileSuratRekomendasi(formData: Partial<PeminatanMahasiswa>) {
    let fd = new FormData();
    if(formData.buktiSuratRekomendasi) {
      fd.append('buktiSuratRekomendasi', formData.buktiSuratRekomendasi, formData.buktiSuratRekomendasi.name);
    }
    return this.http.post(`https://api.simitafapetub.site/datapeminatanmahasiswa/upload`, fd);
    // return this.http.post(`http://localhost:4000/datapeminatanmahasiswa/upload`, fd);
  }

  uploadFileKhs(formData: Partial<PeminatanMahasiswa>) {
    let fd = new FormData();
    if(formData.buktiKhs) {
      fd.append('buktiKhs', formData.buktiKhs, formData.buktiKhs.name);
    }
    return this.http.post(`https://api.simitafapetub.site/datapeminatanmahasiswa/uploadKhs`, fd);
    // return this.http.post(`http://localhost:4000/datapeminatanmahasiswa/uploadKhs`, fd);
  }


  // updateIsFinalSubmit(
  //   formData: Partial<PeminatanMahasiswa>,
  //   idPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'id'>
  // ): Observable<PeminatanMahasiswa> {
  //   var intFinalSubmit = formData.isFinalSubmit ? 1 : 0;
  //   return this.http
  //     .patch<PeminatanMahasiswa>(
  //       `${this.url}/${idPeminatanMahasiswa}`,
  //       {
  //         isFinalSubmit: intFinalSubmit,
  //       },
  //       this.httpOptions
  //     )
  //     .pipe(
  //       catchError(
  //         this.errorHandlerService.handleError<PeminatanMahasiswa>(
  //           'updateIsFinalSubmit'
  //         )
  //       )
  //     );
  // }
}
