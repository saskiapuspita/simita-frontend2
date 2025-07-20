import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorHandlerService } from './error-handler.service';
import { SeminarHasil } from '../interfaces/seminar-hasil';

@Injectable({
  providedIn: 'root',
})
export class SeminarHasilService {
  combinedDateTimeMulaiSeminarString: any;
  combinedDateTimeBerakhirSeminarString: any;
  private url =
    // 'https://api.simitafapetub.site/seminarhasil';
    'http://localhost:4000/seminarhasil';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<SeminarHasil[]> {
    return this.http
      .get<SeminarHasil[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<SeminarHasil[]>('fetchAll', [])
        )
      );
  }

  fetchById(id: Pick<SeminarHasil, 'id'>): Observable<{}> {
    return this.http
      .get<SeminarHasil>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<SeminarHasil>('fetchById')
        )
      );
  }

  create(
    formData: Partial<SeminarHasil>,
    userId: Pick<User, 'id'>
  ): Observable<SeminarHasil> {
    this.combineWaktuMulaiSeminarDateTime(
      formData.tanggalSeminar,
      this.convertTime(formData.waktuMulai)
    );
    this.combineWaktuBerakhirSeminarDateTime(
      formData.tanggalSeminar,
      this.convertTime(formData.waktuBerakhir)
    );
    return this.http
      .post<SeminarHasil>(
        this.url,
        {
          idUser: userId,
          idSkripsi: formData.idSkripsi,
          idRuang: formData.idRuang,
          judulSkripsi: formData.judulSkripsi,
          tanggalSeminar: formData.tanggalSeminar,
          waktuMulai: this.combinedDateTimeMulaiSeminarString,
          waktuBerakhir: this.combinedDateTimeBerakhirSeminarString,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<SeminarHasil>('create'))
      );
  }

  convertTime(obj: { hour: number; minute: number; second: number }): string {
    const hours = obj.hour.toString().padStart(2, '0');
    const minutes = obj.minute.toString().padStart(2, '0');
    const seconds = obj.second.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  combineWaktuMulaiSeminarDateTime(
    selectedTanggaSeminar: any,
    selectedWaktuMulaiSeminar: any
  ) {
    if (selectedTanggaSeminar && selectedWaktuMulaiSeminar) {
      console.log('selectedWaktuMulaiSeminar: ' + selectedWaktuMulaiSeminar);

      const [hours, minutes] = selectedWaktuMulaiSeminar.split(':').map(Number);

      // Buat objek tanggal baru berdasarkan datepicker dan atur jam & menit dari timepicker
      var combinedDateTimeMulaiSeminar = new Date(selectedTanggaSeminar);
      combinedDateTimeMulaiSeminar.setHours(hours, minutes, 0);

      console.log(
        'combinedDateTimeMulaiSeminar: ' + combinedDateTimeMulaiSeminar
      );

      this.combinedDateTimeMulaiSeminarString =
        combinedDateTimeMulaiSeminar.getFullYear() +
        '-' +
        (combinedDateTimeMulaiSeminar.getMonth() + 1) +
        '-' +
        combinedDateTimeMulaiSeminar.getDate() +
        ' ' +
        combinedDateTimeMulaiSeminar.getHours() +
        ':' +
        combinedDateTimeMulaiSeminar.getMinutes() +
        ':' +
        combinedDateTimeMulaiSeminar.getSeconds();

      console.log(
        'combinedDateTimeMulaiSeminarString: ' +
          this.combinedDateTimeMulaiSeminarString
      );
    }
  }

  combineWaktuBerakhirSeminarDateTime(
    selectedTanggaSeminar: any,
    selectedWaktuBerakhirSeminar: any
  ) {
    if (selectedTanggaSeminar && selectedWaktuBerakhirSeminar) {
      console.log(
        'selectedWaktuBerakhirSeminar: ' + selectedWaktuBerakhirSeminar
      );

      const [hours, minutes] = selectedWaktuBerakhirSeminar
        .split(':')
        .map(Number);

      // Buat objek tanggal baru berdasarkan datepicker dan atur jam & menit dari timepicker
      var combinedDateTimeBerakhirSeminar = new Date(selectedTanggaSeminar);
      combinedDateTimeBerakhirSeminar.setHours(hours, minutes, 0);

      console.log(
        'combinedDateTimeBerakhirSeminar: ' + combinedDateTimeBerakhirSeminar
      );

      this.combinedDateTimeBerakhirSeminarString =
        combinedDateTimeBerakhirSeminar.getFullYear() +
        '-' +
        (combinedDateTimeBerakhirSeminar.getMonth() + 1) +
        '-' +
        combinedDateTimeBerakhirSeminar.getDate() +
        ' ' +
        combinedDateTimeBerakhirSeminar.getHours() +
        ':' +
        combinedDateTimeBerakhirSeminar.getMinutes() +
        ':' +
        combinedDateTimeBerakhirSeminar.getSeconds();

      console.log(
        'combinedDateTimeBerakhirSeminarString: ' +
          this.combinedDateTimeBerakhirSeminarString
      );
    }
  }

  delete(id: Pick<SeminarHasil, 'id'>): Observable<{}> {
    return this.http
      .delete<SeminarHasil>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<SeminarHasil>('delete'))
      );
  }

  cekKetersediaanRuangan(
    formData: Partial<SeminarHasil>
  ): Observable<SeminarHasil> {
    console.log("masuk sini: " + formData.tanggalSeminar);
    
    this.combineWaktuMulaiSeminarDateTime(
      formData.tanggalSeminar,
      this.convertTime(formData.waktuMulai)
    );
    this.combineWaktuBerakhirSeminarDateTime(
      formData.tanggalSeminar,
      this.convertTime(formData.waktuBerakhir)
    );
    return this.http
      .post<SeminarHasil>(
        `http://localhost:4000/ruanganseminar`,
        {
          waktuMulai: this.combinedDateTimeMulaiSeminarString,
          waktuBerakhir: this.combinedDateTimeBerakhirSeminarString,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<SeminarHasil>(
            'cekKetersediaanRuangan'
          )
        )
      );
  }
}
