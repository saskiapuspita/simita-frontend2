import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { KelompokPkl } from 'src/app/interfaces/kelompok-pkl';
import { LokasiPkl } from 'src/app/interfaces/lokasi-pkl';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LokasiPklService } from 'src/app/services/lokasi-pkl.service';
import { PengajuanPklService } from 'src/app/services/pengajuan-pkl.service';

@Component({
  selector: 'app-pengajuan-pkl',
  templateUrl: './pengajuan-pkl.component.html',
  styleUrls: ['./pengajuan-pkl.component.scss'],
})
export class PengajuanPklComponent {
  decodedToken: any;
  isOpen = false;
  formPengajuanAnggotaPkl!: FormGroup;
  formAddKetuaKelompokPkl!: FormGroup;
  formAddLokasiPkl!: FormGroup;
  namaAnggota$!: Observable<User[]>;
  namaMahasiswa$!: Observable<User[]>;
  namaKetua$!: Observable<KelompokPkl[]>;
  namaLokasi$!: Observable<LokasiPkl[]>;
  selectedStudent: any;
  filteredStudentBasedOnId: any;
  listAnggotaPkl!: KelompokPkl[];
  isVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private pengajuanPklService: PengajuanPklService,
    private lokasiPklService: LokasiPklService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.namaAnggota$ = this.fetchStudentNotAsAnggotaAtauKetua();
    this.namaKetua$ = this.fetchAllKetuaKelompokPkl();
    this.namaLokasi$ = this.fetchAllLokasiPkl();
    this.formPengajuanAnggotaPkl = this.createPengajuanPklFormGroup();
    this.formAddKetuaKelompokPkl = this.AddKetuaKelompokPklFormGroup();
    this.formAddLokasiPkl = this.AddLokasiPklFormGroup();
    this.loadDataAnggotaPkl();
  }

  // anggota pkl
  loadDataAnggotaPkl() {
    this.pengajuanPklService.fetchAll().subscribe((res) => {
      this.listAnggotaPkl = res;
    });
  }

  submitFormAnggotaPkl() {
    this.onSubmitAddAnggotaPkl(this.formPengajuanAnggotaPkl.value);
  }

  onSubmitAddAnggotaPkl(
    formPengajuanAnggotaPkl: Pick<
      KelompokPkl,
      | 'idKetua'
      | 'idAnggota1'
      | 'idAnggota2'
      | 'idAnggota3'
      | 'idAnggota4'
      | 'idAnggota5'
      | 'idLokasiPkl'
    >
  ): void {
    this.pengajuanPklService
      .create(formPengajuanAnggotaPkl, this.decodedToken.userId)
      .subscribe(() => {
        // this.closePopUp();
      });
  }

  fetchStudentNotAsAnggotaAtauKetua(): Observable<User[]> {
    return this.pengajuanPklService.fetchStudentNotAsAnggotaAtauKetua();
  }

  createPengajuanPklFormGroup(): FormGroup {
    return new FormGroup({
      idKetua: new FormControl('', [Validators.required]),
      idAnggota1: new FormControl('', [Validators.required]),
      idAnggota2: new FormControl('', [Validators.required]),
      idAnggota3: new FormControl('', [Validators.required]),
      idAnggota4: new FormControl('', [Validators.required]),
      idAnggota5: new FormControl('', [Validators.required]),
      idLokasiPkl: new FormControl('', [Validators.required]),
    });
  }

  onStudentSelect(selectedStudentId: any) {
    this.pengajuanPklService
      .fetchDetailStudentNotInGroup(selectedStudentId)
      .subscribe((item) => {
        this.filteredStudentBasedOnId = item;
        console.log(
          'filteredStudentBasedOnId: ' + this.filteredStudentBasedOnId
        );
        this.formPengajuanAnggotaPkl.setValue({
          nimAnggota: this.filteredStudentBasedOnId[0].nim,
          sksLulusAnggota: this.filteredStudentBasedOnId[0].sks,
          noTelpAnggota: this.filteredStudentBasedOnId[0].noTelp,
        });
      });
  }

  deleteAnggotaPkl(id: any): void {
    console.log('id: ' + id);

    this.pengajuanPklService.delete(id).subscribe(() => {
      this.loadDataAnggotaPkl();
    });
  }

  // ketua pkl
  fetchAllKetuaKelompokPkl(): Observable<KelompokPkl[]> {
    return this.pengajuanPklService.fetchAllKetuaKelompokPkl();
  }

  submitFormKetuaKelompokPkl() {
    this.onSubmitAddKetuaKelompokPkl(this.formAddKetuaKelompokPkl.value);
  }

  onSubmitAddKetuaKelompokPkl(
    formAddKetuaKelompokPkl: Pick<KelompokPkl, 'idKetua'>
  ): void {
    this.pengajuanPklService
      .addKetuaKelompokPkl(formAddKetuaKelompokPkl, this.decodedToken.userId)
      .subscribe(() => {
        window.location.reload();
      });
  }

  AddKetuaKelompokPklFormGroup(): FormGroup {
    return new FormGroup({
      idKetua: new FormControl('', [Validators.required]),
    });
  }

  // lokasi pkl
  fetchAllLokasiPkl(): Observable<LokasiPkl[]> {
    return this.lokasiPklService.fetchAll();
  }

  AddLokasiPklFormGroup(): FormGroup {
    return new FormGroup({
      namaLokasi: new FormControl('', [Validators.required]),
    });
  }

  submitFormLokasiPkl() {
    this.onSubmitAddLokasiPkl(this.formAddLokasiPkl.value);
  }

  onSubmitAddLokasiPkl(formAddLokasiPkl: Pick<LokasiPkl, 'namaLokasi'>): void {
    this.lokasiPklService
      .create(formAddLokasiPkl, this.decodedToken.userId)
      .subscribe(() => {
        this.formAddLokasiPkl.reset();
        this.showAlert();
        // window.location.reload();
      });
  }

  // alert
  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 2500);
  }

  // TO DO add disable selected option
}
