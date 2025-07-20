import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LokasiSkripsi } from 'src/app/interfaces/lokasi-skripsi';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { Skripsi } from 'src/app/interfaces/skripsi';
import { AuthService } from 'src/app/services/auth.service';
import { KuotaDosenService } from 'src/app/services/kuota-dosen.service';
import { MasterLokasiSkripsiService } from 'src/app/services/master-lokasi-skripsi.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';
import { RekapitulasiPeminatanService } from 'src/app/services/rekapitulasi-peminatan.service';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-pengajuan-judul-penelitian',
  templateUrl: './pengajuan-judul-penelitian.component.html',
  styleUrls: ['./pengajuan-judul-penelitian.component.scss'],
})
export class PengajuanJudulPenelitianComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formSkripsi!: FormGroup;
  alertMessage: string = '';
  lokasiSkripsi$!: Observable<LokasiSkripsi[]>;
  namaDosen$!: any;
  peminatanMahasiswa: any;
  peminatan$!: Observable<Peminatan[]>;

  constructor(
    private authService: AuthService,
    private skripsiService: SkripsiService,
    private masterLokasiSkripsiService: MasterLokasiSkripsiService,
    private rekapPeminatanMahasiswaService: RekapitulasiPeminatanService,
    private kuotaDosenService: KuotaDosenService,
    private masterPeminatanService: MasterPeminatanService,
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formSkripsi = this.addSkripsiFormGroup();
    this.peminatanMahasiswa = this.loadPeminatanMahasiswa();
    this.lokasiSkripsi$ = this.fetchAllLokasiSkripsi();
    this.peminatan$ = this.loadPeminatan();
    
  }

  // peminatan
  loadPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  // dosen
  fetchDosenByDepartemen(idPeminatan: any) {
    this.kuotaDosenService
      .fetchDosenByDepartemen(idPeminatan)
      .subscribe((res) => {
        this.namaDosen$ = res;
        console.log(this.namaDosen$);
      });
  }

  // lokasi skripsi
  fetchAllLokasiSkripsi(): Observable<LokasiSkripsi[]> {
    return this.masterLokasiSkripsiService.fetchAll();
  }

  // fetch peminatan mahasiswa
  loadPeminatanMahasiswa() {
    this.rekapPeminatanMahasiswaService
      .fetchPeminatanByUserId(this.decodedToken.userId)
      .subscribe((res) => {
        this.peminatanMahasiswa = res.data;
        // this.formSkripsi.get('idPeminatan')?.disable();
        // this.formSkripsi.get('idPeminatan')?.patchValue(this.peminatanMahasiswa[0].idPeminatan);
        this.formSkripsi.patchValue({
          idPeminatan: this.peminatanMahasiswa[0].idPeminatan,
        });

        this.fetchDosenByDepartemen(this.peminatanMahasiswa[0].idPeminatan);
      });
  }

  addSkripsiFormGroup(): FormGroup {
    return new FormGroup({
      idPeminatan: new FormControl('', [Validators.required]),
      judulSkripsi: new FormControl('', [Validators.required]),
      idLokasi: new FormControl('', [Validators.required]),
      idDosen: new FormControl('', [Validators.required]),
    });
  }

  submitFormSkripsi() {
    this.onSubmitAddSkripsi(this.formSkripsi.value);
  }

  onSubmitAddSkripsi(formSkripsi: Pick<Skripsi, 'idPeminatan' | 'judulSkripsi' | 'idLokasi' | 'idDosen'>): void {
    console.log(this.formSkripsi.value);
    
    this.skripsiService
      .create(formSkripsi, this.decodedToken.userId)
      .subscribe(() => {
        this.formSkripsi.reset();
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
}
