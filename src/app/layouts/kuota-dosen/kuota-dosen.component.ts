import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Dosen } from 'src/app/interfaces/dosen';
import { KuotaDosen } from 'src/app/interfaces/kuota-dosen';
import { AuthService } from 'src/app/services/auth.service';
import { KuotaDosenService } from 'src/app/services/kuota-dosen.service';
import { MasterDosenService } from 'src/app/services/master-dosen.service';

@Component({
  selector: 'app-kuota-dosen',
  templateUrl: './kuota-dosen.component.html',
  styleUrls: ['./kuota-dosen.component.scss'],
})
export class KuotaDosenComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formKuotaDosen!: FormGroup;
  listKuotaDosen!: KuotaDosen[];
  detailKuotaDosen: any;
  alertMessage: string = '';
  namaDosen$: any;

  constructor(
    private authService: AuthService,
    private kuotaDosenService: KuotaDosenService,
    private masterDosenService: MasterDosenService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formKuotaDosen = this.addKuotaDosenFormGroup();
    this.loadDataKuotaDosen();
    this.namaDosen$ = this.fetchAllDosen();
  }

  loadDataKuotaDosen() {
    this.kuotaDosenService.fetchAll().subscribe((res) => {
      this.listKuotaDosen = res;
    });
  }

  // dosen
  fetchAllDosen(): Observable<Dosen[]> {
    return this.masterDosenService.fetchAll();
  }

  addKuotaDosenFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      idDosen: new FormControl('', [Validators.required]),
      kuotaDosenUntukPeminatan: new FormControl('', [Validators.required]),
      kuotaDosenUntukSkripsi: new FormControl('', [Validators.required]),
      kuotaDosenUntukTesis: new FormControl('', [Validators.required]),
      kuotaDosenUntukDisertasi: new FormControl('', [Validators.required]),
    });
  }

  submitFormKuotaDosen() {
    this.formKuotaDosen.controls['id'].value;
    if (
      this.formKuotaDosen.controls['id'].value == null ||
      this.formKuotaDosen.controls['id'].value == ''
    ) {
      this.onSubmitAddKuotaDosen(this.formKuotaDosen.value);
    } else if (
      this.formKuotaDosen.controls['id'].value != null ||
      this.formKuotaDosen.controls['id'].value != ''
    ) {
      this.onSubmitUpdateKuotaDosen(
        this.formKuotaDosen.value,
        this.formKuotaDosen.controls['id'].value
      );
    }
  }

  onSubmitAddKuotaDosen(
    formKuotaDosen: Pick<
      KuotaDosen,
      | 'idDosen'
      | 'kuotaDosenUntukPeminatan'
      | 'kuotaDosenUntukSkripsi'
      | 'kuotaDosenUntukTesis'
      | 'kuotaDosenUntukDisertasi'
    >
  ): void {
    this.kuotaDosenService.create(formKuotaDosen).subscribe(() => {
      this.formKuotaDosen.reset();
      this.loadDataKuotaDosen();
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

  update(id: any) {
    this.kuotaDosenService.fetchById(id).subscribe((res: any) => {
      this.detailKuotaDosen = res;

      this.formKuotaDosen.setValue({
        id: this.detailKuotaDosen[0].id,
        idDosen: this.detailKuotaDosen[0].idDosen,
        kuotaDosenUntukPeminatan: this.detailKuotaDosen[0].kuotaDosenUntukPeminatan,
        kuotaDosenUntukSkripsi: this.detailKuotaDosen[0].kuotaDosenUntukSkripsi,
        kuotaDosenUntukTesis: this.detailKuotaDosen[0].kuotaDosenUntukTesis,
        kuotaDosenUntukDisertasi: this.detailKuotaDosen[0].kuotaDosenUntukDisertasi
      });
    });
  }

  onSubmitUpdateKuotaDosen(
    formKuotaDosen: Pick<
      KuotaDosen,
      | 'kuotaDosenUntukPeminatan'
      | 'kuotaDosenUntukSkripsi'
      | 'kuotaDosenUntukTesis'
      | 'kuotaDosenUntukDisertasi'
    >,
    idKuotaDosen: Pick<KuotaDosen, 'id'>
  ): void {
    this.kuotaDosenService
      .update(formKuotaDosen, idKuotaDosen)
      .subscribe(() => {
        this.formKuotaDosen.reset();
        this.showAlert('update');
        this.loadDataKuotaDosen();
      });
  }

  delete(id: any) {
    this.kuotaDosenService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataKuotaDosen();
    });
  }
}
