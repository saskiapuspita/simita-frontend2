import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dosen } from 'src/app/interfaces/dosen';
import { LokasiSkripsi } from 'src/app/interfaces/lokasi-skripsi';
import { Skripsi } from 'src/app/interfaces/skripsi';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDosenService } from 'src/app/services/master-dosen.service';
import { MasterLokasiSkripsiService } from 'src/app/services/master-lokasi-skripsi.service';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-pengajuan-judul-penelitian',
  templateUrl: './pengajuan-judul-penelitian.component.html',
  styleUrls: ['./pengajuan-judul-penelitian.component.scss']
})
export class PengajuanJudulPenelitianComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formSkripsi!: FormGroup;
  listPengajuanSkripsi!: Skripsi[];
  detailSkripsi: any;
  alertMessage: string = '';
  lokasiSkripsi$!: Observable<LokasiSkripsi[]>;
  namaDosen$!: Observable<Dosen[]>;

  constructor(
    private authService: AuthService,
    private skripsiService: SkripsiService,
    private masterDosenService: MasterDosenService,
    private masterLokasiSkripsiService: MasterLokasiSkripsiService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formSkripsi = this.addSkripsiFormGroup();
    this.loadDataPengajuanSkripsi();
    this.namaDosen$ = this.fetchAllDosen();
    this.lokasiSkripsi$ = this.fetchAllLokasiSkripsi();
  }

  // dosen
  fetchAllDosen(): Observable<Dosen[]> {
    return this.masterDosenService.fetchAll();
  }

  // lokasi skripsi
  fetchAllLokasiSkripsi(): Observable<LokasiSkripsi[]> {
    return this.masterLokasiSkripsiService.fetchAll();
  }

  loadDataPengajuanSkripsi() {
    this.skripsiService.fetchAllPengajuanSkripsi().subscribe((res) => {
      this.listPengajuanSkripsi = res;
    });
  }

  addSkripsiFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      judulSkripsi: new FormControl('', [Validators.required]),
      idLokasi: new FormControl('', [Validators.required]),
      idDosen: new FormControl('', [Validators.required]),
      persentaseNilaiD: new FormControl('', [Validators.required]),
      persentaseNilaiE: new FormControl('', [Validators.required])
    });
  }

  submitFormSkripsi() {
    console.log('id: ' + this.formSkripsi.controls['id'].value);
    this.formSkripsi.controls['id'].value;
    if (this.formSkripsi.controls['id'].value == null || this.formSkripsi.controls['id'].value == '') {
      this.onSubmitAddSkripsi(this.formSkripsi.value);
    } else if (this.formSkripsi.controls['id'].value != null || this.formSkripsi.controls['id'].value != '') {
      this.onSubmitUpdateSkripsi(
        this.formSkripsi.value,
        this.formSkripsi.controls['id'].value
      );
    }
  }

  onSubmitAddSkripsi(formSkripsi: Pick<Skripsi, 'id'>): void {
    this.skripsiService.create(formSkripsi, this.decodedToken.userId).subscribe(() => {
      this.formSkripsi.reset();
      this.loadDataPengajuanSkripsi();
      this.showAlert('add');
    });
  }

  showAlert(action: string): void {
    if (this.isVisible) {
      return;
    }

    if (action == 'add') {
      this.alertMessage = 'Data berhasil ditambahkan!';
    } else if (action == 'update') {
      this.alertMessage = 'Data berhasil diperbarui!';
    } else if (action == 'delete') {
      this.alertMessage = 'Data berhasil dihapus!';
    }

    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 2500);
  }

  update(idSkripsi: any) {
    this.skripsiService.fetchById(idSkripsi).subscribe((res: any) => {
      this.detailSkripsi = res.data;
      
      this.formSkripsi.setValue({
        id: this.detailSkripsi[0].id,
        judulSkripsi: this.detailSkripsi[0].judulSkripsi,
        idLokasi: this.detailSkripsi[0].idLokasi,
        idDosen: this.detailSkripsi[0].idDosen,
        persentaseNilaiD: this.detailSkripsi[0].persentaseNilaiD,
        persentaseNilaiE: this.detailSkripsi[0].persentaseNilaiE
      });
    });
  }

  onSubmitUpdateSkripsi(
    formSkripsi: Pick<Skripsi, 'judulSkripsi' | 'idLokasi' | 'idDosen' | 'persentaseNilaiD' | 'persentaseNilaiE'>,
    idSkripsi: Pick<Skripsi, 'id'>
  ): void {
    this.skripsiService.update(formSkripsi, idSkripsi).subscribe(() => {
      this.formSkripsi.reset();
      this.showAlert('update');
      this.loadDataPengajuanSkripsi();
    });
  }

  delete(id: any) {
    this.skripsiService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataPengajuanSkripsi();
    });
  }
}
