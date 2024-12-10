import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Dosen } from 'src/app/interfaces/dosen';
import { KelompokPkl } from 'src/app/interfaces/kelompok-pkl';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { RekapitulasiPeminatan } from 'src/app/interfaces/rekapitulasi-peminatan';
import { Skripsi } from 'src/app/interfaces/skripsi';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDosenService } from 'src/app/services/master-dosen.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';
import { PengajuanPklService } from 'src/app/services/pengajuan-pkl.service';
import { RekapitulasiPeminatanService } from 'src/app/services/rekapitulasi-peminatan.service';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent {
  UserRole: any;
  isVisible: boolean = false;
  listPengajuanPkl!: any;
  listPengajuanPeminatan!: any;
  listApprovedPengajuanPeminatan: any;
  listPengajuanSkripsi!: Skripsi[];
  formGenerateRekapitulasiPeminatan!: FormGroup;
  formAssignDosenPembimbing!: FormGroup;
  peminatan$!: Observable<Peminatan[]>;
  decodedToken: any;
  namaDosen$!: Observable<Dosen[]>;
  detailRekapitulasiPeminatan: any;
  
  constructor(
    private authService: AuthService,
    private pengajuanPklService: PengajuanPklService,
    private rekapitulasiPeminatanService: RekapitulasiPeminatanService,
    private masterPeminatanService: MasterPeminatanService,
    private masterDosenService: MasterDosenService,
    private skripsiService: SkripsiService
  ) {}

  ngOnInit() {
    this.UserRole = localStorage.getItem('userrole');
    this.decodedToken = this.authService.decodeToken();
    this.peminatan$ = this.loadPeminatan();
    this.loadDataAnggotaPkl();
    this.loadDataPengajuanPeminatan();
    this.loadDataApprovedRekapitulasiPeminatan();
    this.loadDataPengajuanSkripsi();
    this.formGenerateRekapitulasiPeminatan =
    this.generatePengajuanPeminatanFormGroup();
    this.namaDosen$ = this.fetchAllDosen();
    this.formAssignDosenPembimbing = this.assignDosenPembimbingFromGroup();
  }

  // dosen
  fetchAllDosen(): Observable<Dosen[]> {
    return this.masterDosenService.fetchAll();
  }

  loadDataAnggotaPkl() {
    this.pengajuanPklService
      .fetchById(this.decodedToken.userId)
      .subscribe((res) => {
        this.listPengajuanPkl = res;
        console.log("this.listPengajuanPkl: "+ this.listPengajuanPkl)
      });
  }

  loadDataPengajuanPeminatan() {
    this.rekapitulasiPeminatanService.fetchAll().subscribe((res) => {
      this.listPengajuanPeminatan = res;
    });
  }

  loadDataApprovedRekapitulasiPeminatan() {
    this.rekapitulasiPeminatanService.fetchApproved().subscribe((res) => {
      this.listApprovedPengajuanPeminatan = res;
    });
  }

  loadDataPengajuanSkripsi() {
    this.skripsiService.fetchAllPengajuanSkripsi().subscribe((res) => {
      this.listPengajuanSkripsi = res;
    });
  }

  approvePengajuanPkl(id: any): void {
    this.pengajuanPklService.updateStatusPengajuanPkl(id).subscribe(() => {
      this.loadDataAnggotaPkl();
    });
  }

  approvePengajuanPeminatan(id: any): void {
    this.rekapitulasiPeminatanService
      .updateStatusPengajuanPeminatan(id)
      .subscribe(() => {
        this.loadDataPengajuanPeminatan();
      });
  }

  approvePengajuanJudulPenelitian(id: any): void {
    console.log("idSkripsi: " + id);
    
    this.skripsiService.updateStatusPengajuanJudulSkripsi(id).subscribe(() => {
      this.loadDataPengajuanSkripsi();
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

  submitFormGenerateRekapitulasiPeminatan() {
    this.onSubmitGenerateRekapitulasiPeminatan(
      this.formGenerateRekapitulasiPeminatan.value
    );
  }

  onSubmitGenerateRekapitulasiPeminatan(
    formGenerateRekapitulasiPeminatan: Pick<
      RekapitulasiPeminatan,
      'idPeminatan'
    >
  ): void {
    this.rekapitulasiPeminatanService
      .generateRekapitulasiPeminatan(formGenerateRekapitulasiPeminatan)
      .subscribe(() => {
        this.formGenerateRekapitulasiPeminatan.reset();
        this.showAlert();
        this.loadDataPengajuanPeminatan();
      });
  }

  // peminatan
  loadPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  generatePengajuanPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      idPeminatan: new FormControl('', [Validators.required]),
    });
  }

  assignDosenPembimbingFromGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      idDosen: new FormControl(''),
    });
  }

  submitAssignDosenPembimbing() {
    console.log('id: ' + this.formAssignDosenPembimbing.get('id')!.value);

    let idRekapitulasiPeminatan = this.formAssignDosenPembimbing.get('id')!.value
    
    this.onSubmitAssignDosbing(this.formAssignDosenPembimbing.value, idRekapitulasiPeminatan);
  }

  onSubmitAssignDosbing(
    formAssignDosenPembimbing: Pick<RekapitulasiPeminatan, 'idDosen'>,
    idRekapitulasiPeminatan: Pick<RekapitulasiPeminatan, 'id'>
  ): void {
    this.rekapitulasiPeminatanService
      .updateDosenPembimbingPeminatan(formAssignDosenPembimbing, idRekapitulasiPeminatan)
      .subscribe(() => {
        this.formAssignDosenPembimbing.reset();
        // this.showAlert('update');
        this.loadDataApprovedRekapitulasiPeminatan();
      });
  }

  update(idRekapitulasiPeminatan: any) {
    this.rekapitulasiPeminatanService.fetchById(idRekapitulasiPeminatan).subscribe((res: any) => {
      this.detailRekapitulasiPeminatan = res.data;
      
      this.formAssignDosenPembimbing.setValue({
        id: this.detailRekapitulasiPeminatan[0].id,
        idDosen: this.detailRekapitulasiPeminatan[0].idDosen
      });
    });
  }
}
