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
import { MiddlewareService } from 'src/app/services/middleware.service';
import { PengajuanPklService } from 'src/app/services/pengajuan-pkl.service';
import { RekapitulasiPeminatanService } from 'src/app/services/rekapitulasi-peminatan.service';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-rekapitulasi-peminatan',
  templateUrl: './rekapitulasi-peminatan.component.html',
  styleUrls: ['./rekapitulasi-peminatan.component.scss']
})
export class RekapitulasiPeminatanComponent {
  UserRole: any;
  isVisible: boolean = false;
  listPengajuanPeminatanProter!: any;
  listPengajuanPeminatanNMT!: any;
  listPengajuanPeminatanSosek!: any;
  listPengajuanPeminatanTHT!: any;
  listPengajuanPeminatanRPT!: any;
  listApprovedPengajuanPeminatan: any;
  decodedToken: any;
  searchText: string = '';
  
  constructor(
    private authService: AuthService,
    private rekapitulasiPeminatanService: RekapitulasiPeminatanService,
  ) {}

  ngOnInit() {
    this.UserRole = localStorage.getItem('userrole');
    this.decodedToken = this.authService.decodeToken();
    this.loadDataPengajuanPeminatanProter();
    this.loadDataPengajuanPeminatanNMT();
    this.loadDataPengajuanPeminatanSosek();
    this.loadDataPengajuanPeminatanTHT();
    this.loadDataPengajuanPeminatanRPT();
    this.loadDataApprovedRekapitulasiPeminatan();
  }

  loadDataPengajuanPeminatanProter() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanProter().subscribe((res) => {
      this.listPengajuanPeminatanProter = res;
    });
  }

  loadDataPengajuanPeminatanNMT() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanNMT().subscribe((res) => {
      this.listPengajuanPeminatanNMT = res;
    });
  }

  loadDataPengajuanPeminatanSosek() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanSosek().subscribe((res) => {
      this.listPengajuanPeminatanSosek = res;
    });
  }

  loadDataPengajuanPeminatanTHT() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanTHT().subscribe((res) => {
      this.listPengajuanPeminatanTHT = res;
    });
  }

  loadDataPengajuanPeminatanRPT() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanRPT().subscribe((res) => {
      this.listPengajuanPeminatanRPT = res;
    });
  }

  loadDataApprovedRekapitulasiPeminatan() {
    this.rekapitulasiPeminatanService.fetchApproved().subscribe((res) => {
      this.listApprovedPengajuanPeminatan = res;
      console.log(this.listApprovedPengajuanPeminatan);
    });
  }

  submitFormGenerateRekapitulasiPeminatan() {
    this.onSubmitGenerateRekapitulasiPeminatan();
  }

  onSubmitGenerateRekapitulasiPeminatan(): void {
    this.rekapitulasiPeminatanService
      .generateRekapitulasiPeminatan()
      .subscribe(() => {
        this.loadDataPengajuanPeminatanProter();
        this.loadDataPengajuanPeminatanNMT();
        this.loadDataPengajuanPeminatanSosek();
        this.loadDataPengajuanPeminatanTHT();
        this.loadDataPengajuanPeminatanRPT();
        window.location.reload();
      });
  }

  approvePengajuanPeminatan(id: any): void {
    this.rekapitulasiPeminatanService
      .updateStatusPengajuanPeminatan(id)
      .subscribe(() => {
        this.loadDataPengajuanPeminatanProter();
        this.loadDataPengajuanPeminatanNMT();
        this.loadDataPengajuanPeminatanSosek();
        this.loadDataPengajuanPeminatanTHT();
        this.loadDataPengajuanPeminatanRPT();
        window.location.reload();
      });
  }
}
