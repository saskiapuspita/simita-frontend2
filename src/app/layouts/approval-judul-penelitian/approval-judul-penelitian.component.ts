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
  selector: 'app-approval-judul-penelitian',
  templateUrl: './approval-judul-penelitian.component.html',
  styleUrls: ['./approval-judul-penelitian.component.scss']
})
export class ApprovalJudulPenelitianComponent {
  UserRole: any;
  isVisible: boolean = false;
  listPengajuanSkripsi!: Skripsi[];
  decodedToken: any;
  alertMessage: string = '';
  searchText: string = '';
  
  constructor(
    private authService: AuthService,
    private skripsiService: SkripsiService,
  ) {}

  ngOnInit() {
    this.UserRole = localStorage.getItem('userrole');
    this.decodedToken = this.authService.decodeToken();
    this.loadDataPengajuanSkripsi();
  }

  loadDataPengajuanSkripsi() {
    this.skripsiService.fetchAllPengajuanSkripsi().subscribe((res) => {
      this.listPengajuanSkripsi = res;
    });
  }

  approvePengajuanJudulPenelitian(id: any): void {
    console.log("idSkripsi: " + id);
    
    this.skripsiService.updateStatusPengajuanJudulSkripsi(id).subscribe(() => {
      this.loadDataPengajuanSkripsi();
      // window.location.reload();
    });
  }

  // alert
  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.alertMessage = 'Pengajuan judul penelitian disetujui!';
    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 2500);
  }

}
