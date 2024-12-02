import { Component } from '@angular/core';
import { KelompokPkl } from 'src/app/interfaces/kelompok-pkl';
import { AuthService } from 'src/app/services/auth.service';
import { PengajuanPklService } from 'src/app/services/pengajuan-pkl.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent {
  isVisible: boolean = false;
  listPengajuanPkl!: any;
  decodedToken: any;

  constructor(
    private authService: AuthService,
    private pengajuanPklService: PengajuanPklService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.loadDataAnggotaPkl();
  }

  loadDataAnggotaPkl() {
    this.pengajuanPklService.fetchById(this.decodedToken.userId).subscribe((res) => {
      this.listPengajuanPkl = res;
    });
  }

  approvePengajuan(id: any): void {
    console.log('idPengajuanPkl: ' + id);

    this.pengajuanPklService.updateStatusPengajuanPkl(id).subscribe(() => {
      this.loadDataAnggotaPkl();
    });
  }
}
