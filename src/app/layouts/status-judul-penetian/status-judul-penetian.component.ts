import { Component } from '@angular/core';
import { Skripsi } from 'src/app/interfaces/skripsi';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-status-judul-penetian',
  templateUrl: './status-judul-penetian.component.html',
  styleUrls: ['./status-judul-penetian.component.scss']
})
export class StatusJudulPenetianComponent {
  listPengajuanSkripsi!: Skripsi[];
  isVisible: boolean = false;
  alertMessage: string = '';
  constructor(
    private skripsiService: SkripsiService
  ) {}

  ngOnInit() {
    this.loadDataPengajuanSkripsi();
  }

  loadDataPengajuanSkripsi() {
    this.skripsiService.fetchAllPengajuanSkripsi().subscribe((res) => {
      this.listPengajuanSkripsi = res;
    });
  }


  delete(id: any) {
    this.skripsiService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataPengajuanSkripsi();
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
