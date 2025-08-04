import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { first, Observable } from 'rxjs';
import { MataKuliah } from 'src/app/interfaces/mata-kuliah';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { PeminatanMahasiswa } from 'src/app/interfaces/peminatan-mahasiswa';
import { RekapitulasiPeminatan } from 'src/app/interfaces/rekapitulasi-peminatan';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMataKuliahService } from 'src/app/services/master-mata-kuliah.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';
import { NilaiMataKuliahService } from 'src/app/services/nilai-mata-kuliah.service';
import { PengajuanPeminatanService } from 'src/app/services/pengajuan-peminatan.service';
import { RekapitulasiPeminatanService } from 'src/app/services/rekapitulasi-peminatan.service';

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
  statusPengajuanPeminatan$!: any;
  formUploadFileSuratRekomendasi!: FormGroup;
  formUploadFileKhs!: FormGroup;
  sourcePath: string =
    'https://drive.google.com/file/d/1WfAUpvS4OIGsx6wMteuYZzNsHor3VNlR/view?usp=sharing';
  fileName = 'suratrekomendasi.pdf';
  listNilaiMataKuliah!: any;
  nilaiMataKuliah: any;
  //ascending
  listpeminatanSortAsc: any;

  constructor(
    private authService: AuthService,
    private pengajuanPeminatanService: PengajuanPeminatanService,
    private masterPeminatanService: MasterPeminatanService,
    private masterMataKuliahService: MasterMataKuliahService,
    private rekapitulasiPeminatanService: RekapitulasiPeminatanService,
    private nilaiMataKuliahService: NilaiMataKuliahService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    // this.namaAnggota$ = this.fetchStudentNotAsAnggotaAtauKetua();
    this.formPengajuanPeminatan = this.createPengajuanPeminatanFormGroup();
    this.loadDataStatusPengajuanPeminatan();
    this.peminatan$ = this.loadPeminatan();
    this.mataKuliah$ = this.loadMataKuliah();
    this.loadNilaiMataKuliah();
    this.loadApprovedPeminatanById();
    this.formUploadFileSuratRekomendasi =
      this.createUploadFilePeminatanFormGroup();
    this.formUploadFileKhs = this.createUploadFileKhsFormGroup();
  }

  createUploadFilePeminatanFormGroup(): FormGroup {
    return new FormGroup({
      buktiSuratRekomendasi: new FormControl(null),
    });
  }

  createUploadFileKhsFormGroup(): FormGroup {
    return new FormGroup({
      buktiKhs: new FormControl(null),
    });
  }

  onSubmitUploadFileSuratRekomendasi(
    formUploadFileSuratRekomendasi: Pick<
      PeminatanMahasiswa,
      'buktiSuratRekomendasi'
    >
  ): void {
    if (formUploadFileSuratRekomendasi.buktiSuratRekomendasi != null) {
      this.pengajuanPeminatanService
        .uploadFileSuratRekomendasi(formUploadFileSuratRekomendasi)
        .pipe(first())
        .subscribe(() => {
          alert('Upload Berhasil!');
        });
    } else {
      alert('Upload gagal, format file tidak didukung!');
    }
  }

  onSubmitUploadFileKhs(
    formUploadFileKhs: Pick<PeminatanMahasiswa, 'buktiKhs'>
  ): void {
    console.log(formUploadFileKhs.buktiKhs);

    if (formUploadFileKhs.buktiKhs != null) {
      this.pengajuanPeminatanService
        .uploadFileKhs(formUploadFileKhs)
        .pipe(first())
        .subscribe(() => {
          alert('Upload Berhasil!');
        });
    } else {
      alert('Upload gagal, format file tidak didukung!');
    }
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0]; // Here we use only the first file (single file)
    console.log('file type : ' + file?.type);
    if (file?.type == 'application/pdf') {
      this.formUploadFileSuratRekomendasi.patchValue({
        buktiSuratRekomendasi: file,
      });
    } else {
      alert('Format file tidak didukung!');
    }
  }

  onImagePicked2(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0]; // Here we use only the first file (single file)
    console.log('file type : ' + file?.type);
    if (file?.type == 'application/pdf') {
      this.formUploadFileKhs.patchValue({
        buktiKhs: file,
      });
    } else {
      alert('Format file tidak didukung!');
    }
  }

  onSelectionChange($event: any): void {
    this.nilaiMataKuliah = this.listNilaiMataKuliah.filter(
      (c: { mataKuliah: any }) => c.mataKuliah === $event
    );
    let item = this.nilaiMataKuliah[0];
    console.log('item.id' + item.id);

    this.formPengajuanPeminatan.controls['nilaiMatkulMinat1'].setValue(item.id);
    console.log($event);
  }

  // mata kuliah
  loadMataKuliah(): Observable<MataKuliah[]> {
    return this.masterMataKuliahService.fetchNamaPeminatanBasedOnIdMinat();
  }

  // nilai mata kuliah
  loadNilaiMataKuliah() {
      this.nilaiMataKuliahService
      .fetchByIdUser(this.decodedToken.userId)
      .subscribe((res) => {
        this.listNilaiMataKuliah = res;
      });
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
        this.listpeminatanSortAsc = this.listPeminatan.sort(
          (a: any, b: any) => a.urutanMinat - b.urutanMinat
        );
      });
  }

  // approved pengajuan peminatan by id
  loadApprovedPeminatanById() {
    this.rekapitulasiPeminatanService
      .fetchApprovedById(this.decodedToken.userId)
      .subscribe((res) => {
        this.statusPengajuanPeminatan$ = res.data;
      });
  }

  submitFormPeminatan() {
    this.onSubmitAddPeminatan(this.formPengajuanPeminatan.value);
  }

  onSubmitAddPeminatan(
    formPengajuanPeminatan: Pick<
      PeminatanMahasiswa,
      | 'urutanMinat'
      | 'pilihanMinat'
      // | 'haveRecommendation'
      // | 'judulProyek'
      // | 'sumberPendanaan'
      // | 'tahunPendanaanProyek'
      // | 'statusProyek'
    >
  ): void {
    // console.log(
    //   'idMatkulMinat4:' +
    //     this.formPengajuanPeminatan.get('idMatkulMinat4')!.value
    // );
    // console.log(
    //   'idMatkulMinat5:' +
    //     this.formPengajuanPeminatan.get('idMatkulMinat5')!.value
    // );
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

  createPengajuanPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      urutanMinat: new FormControl('', [Validators.required]),
      pilihanMinat: new FormControl('', [Validators.required]),
      // idMatkulMinat1: new FormControl('', [Validators.required]),
      // nilaiMatkulMinat1: new FormControl('', [Validators.required]),
      // idMatkulMinat2: new FormControl('', [Validators.required]),
      // nilaiMatkulMinat2: new FormControl('', [Validators.required]),
      // idMatkulMinat3: new FormControl('', [Validators.required]),
      // nilaiMatkulMinat3: new FormControl('', [Validators.required]),
      // idMatkulMinat4: new FormControl(null),
      // nilaiMatkulMinat4: new FormControl(null),
      // idMatkulMinat5: new FormControl(null),
      // nilaiMatkulMinat5: new FormControl(null),

      // haveRecommendation: new FormControl(null),
      // judulProyek: new FormControl(null),
      // sumberPendanaan: new FormControl(null),
      // tahunPendanaanProyek: new FormControl(null),
      // statusProyek: new FormControl(null),
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

  goToLink(url: string) {
    window.open(url, '_blank');
  }
  // TODO CHANGE MATA KULIAH BASED ON SELECTED MINAT
}
