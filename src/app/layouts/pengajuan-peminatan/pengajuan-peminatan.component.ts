import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MataKuliah } from 'src/app/interfaces/mata-kuliah';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { PeminatanMahasiswa } from 'src/app/interfaces/peminatan-mahasiswa';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMataKuliahService } from 'src/app/services/master-mata-kuliah.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';
import { PengajuanPeminatanService } from 'src/app/services/pengajuan-peminatan.service';

@Component({
  selector: 'app-pengajuan-peminatan',
  templateUrl: './pengajuan-peminatan.component.html',
  styleUrls: ['./pengajuan-peminatan.component.scss'],
})
export class PengajuanPeminatanComponent {
  decodedToken: any;
  isOpen = false;
  formPengajuanPeminatan!: FormGroup;
  selectedStudent: any;
  filteredStudentBasedOnId: any;
  listPeminatan!: any;
  isVisible: boolean = false;
  alertMessage: string = '';
  peminatan$!: Observable<Peminatan[]>;
  mataKuliah$!: any;
  //ascending
  listpeminatanSortAsc: any;

  constructor(
    private authService: AuthService,
    private pengajuanPeminatanService: PengajuanPeminatanService,
    private masterPeminatanService: MasterPeminatanService,
    private masterMataKuliahService: MasterMataKuliahService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    // this.namaAnggota$ = this.fetchStudentNotAsAnggotaAtauKetua();
    this.formPengajuanPeminatan = this.createPengajuanPklFormGroup();
    this.loadDataStatusPengajuanPeminatan();
    this.peminatan$ = this.loadPeminatan();
    this.mataKuliah$ = this.loadMataKuliah();
  }

  // mata kuliah
  loadMataKuliah(): Observable<MataKuliah[]> {
    return this.masterMataKuliahService.fetchNamaPeminatanBasedOnIdMinat();
  }

  // peminatan
  loadPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  // anggota pkl
  loadDataStatusPengajuanPeminatan() {
    this.pengajuanPeminatanService
      .fetchById(this.decodedToken.userId)
      .subscribe((res) => {
        this.listPeminatan = res;
        this.listpeminatanSortAsc = this.listPeminatan.sort((a: any, b: any) => a.urutanMinat - b.urutanMinat);
      });
  }

  submitFormPeminatan() {
    console.log("masuk ke sini.");
    
    this.onSubmitAddPeminatan(this.formPengajuanPeminatan.value);
  }

  onSubmitAddPeminatan(
    formPengajuanPeminatan: Pick<
      PeminatanMahasiswa,
      | 'urutanMinat'
      | 'pilihanMinat'
      | 'idMatkulMinat1'
      | 'nilaiMatkulMinat1'
      | 'idMatkulMinat2'
      | 'nilaiMatkulMinat2'
      | 'idMatkulMinat3'
      | 'nilaiMatkulMinat3'
      | 'idMatkulMinat4'
      | 'nilaiMatkulMinat4'
      | 'idMatkulMinat5'
      | 'nilaiMatkulMinat5'
      | 'haveRecommendation'
    >
  ): void {
    this.pengajuanPeminatanService
      .create(formPengajuanPeminatan, this.decodedToken.userId)
      .subscribe(() => {
        this.formPengajuanPeminatan.reset();
        this.showAlert('add');
        this.loadDataStatusPengajuanPeminatan();
      });
  }

  // fetchStudentNotAsAnggotaAtauKetua(): Observable<User[]> {
  //   return this.pengajuanPeminatanService.fetchStudentNotAsAnggotaAtauKetua();
  // }

  createPengajuanPklFormGroup(): FormGroup {
    return new FormGroup({
      urutanMinat: new FormControl('', [Validators.required]),
      pilihanMinat: new FormControl('', [Validators.required]),
      idMatkulMinat1: new FormControl('', [Validators.required]),
      nilaiMatkulMinat1: new FormControl('', [Validators.required]),
      idMatkulMinat2: new FormControl('', [Validators.required]),
      nilaiMatkulMinat2: new FormControl('', [Validators.required]),
      idMatkulMinat3: new FormControl('', [Validators.required]),
      nilaiMatkulMinat3: new FormControl('', [Validators.required]),
      idMatkulMinat4: new FormControl('', [Validators.required]),
      nilaiMatkulMinat4: new FormControl('', [Validators.required]),
      idMatkulMinat5: new FormControl('', [Validators.required]),
      nilaiMatkulMinat5: new FormControl('', [Validators.required]),
      haveRecommendation: new FormControl('', [Validators.required]),
    });
  }

  delete(id: any): void {
    this.pengajuanPeminatanService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataStatusPengajuanPeminatan();
    });
  }

  // alert
  showAlert(action: string): void {
    console.log(action);

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

  // TODO CHANGE MATA KULIAH BASED ON SELECTED MINAT
}