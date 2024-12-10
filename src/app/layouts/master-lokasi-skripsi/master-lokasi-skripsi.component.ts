import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LokasiSkripsi } from 'src/app/interfaces/lokasi-skripsi';
import { AuthService } from 'src/app/services/auth.service';
import { MasterLokasiSkripsiService } from 'src/app/services/master-lokasi-skripsi.service';

@Component({
  selector: 'app-master-lokasi-skripsi',
  templateUrl: './master-lokasi-skripsi.component.html',
  styleUrls: ['./master-lokasi-skripsi.component.scss'],
})
export class MasterLokasiSkripsiComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formLokasiSkripsi!: FormGroup;
  listLokasiSkripsi!: LokasiSkripsi[];
  detailLokasiSkripsi: any;
  alertMessage: string = '';

  constructor(
    private authService: AuthService,
    private masterLokasiSkripsiService: MasterLokasiSkripsiService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formLokasiSkripsi = this.addLokasiSkripsiFormGroup();
    this.loadDataLokasiSkripsi();
  }

  loadDataLokasiSkripsi() {
    this.masterLokasiSkripsiService.fetchAll().subscribe((res) => {
      this.listLokasiSkripsi = res;
    });
  }

  addLokasiSkripsiFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      namaLokasi: new FormControl('', [Validators.required]),
    });
  }

  submitFormLokasiSkripsi() {
    console.log('id: ' + this.formLokasiSkripsi.controls['id'].value);
    this.formLokasiSkripsi.controls['id'].value;
    if (
      this.formLokasiSkripsi.controls['id'].value == null ||
      this.formLokasiSkripsi.controls['id'].value == ''
    ) {
      this.onSubmitAddLokasiSkripsi(this.formLokasiSkripsi.value);
    } else if (
      this.formLokasiSkripsi.controls['id'].value != null ||
      this.formLokasiSkripsi.controls['id'].value != ''
    ) {
      this.onSubmitUpdateLokasiSkripsi(
        this.formLokasiSkripsi.value,
        this.formLokasiSkripsi.controls['id'].value
      );
    }
  }

  onSubmitAddLokasiSkripsi(formLokasiSkripsi: Pick<LokasiSkripsi, 'id'>): void {
    this.masterLokasiSkripsiService
      .create(formLokasiSkripsi, this.decodedToken.userId)
      .subscribe(() => {
        this.formLokasiSkripsi.reset();
        this.loadDataLokasiSkripsi();
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

  update(idLokasiSkripsi: any) {
    this.masterLokasiSkripsiService
      .fetchById(idLokasiSkripsi)
      .subscribe((res: any) => {
        this.detailLokasiSkripsi = res.data;

        this.formLokasiSkripsi.setValue({
          id: this.detailLokasiSkripsi[0].id,
          namaLokasi: this.detailLokasiSkripsi[0].namaLokasi
        });
      });
  }

  onSubmitUpdateLokasiSkripsi(
    formLokasiSkripsi: Pick<LokasiSkripsi, 'namaLokasi'>,
    idLokasiSkripsi: Pick<LokasiSkripsi, 'id'>
  ): void {
    this.masterLokasiSkripsiService
      .update(formLokasiSkripsi, idLokasiSkripsi)
      .subscribe(() => {
        this.formLokasiSkripsi.reset();
        this.showAlert('update');
        this.loadDataLokasiSkripsi();
      });
  }

  delete(id: any) {
    this.masterLokasiSkripsiService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataLokasiSkripsi();
    });
  }
}
