import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ruangan } from 'src/app/interfaces/ruangan';
import { AuthService } from 'src/app/services/auth.service';
import { RuanganService } from 'src/app/services/ruangan.service';

@Component({
  selector: 'app-master-ruangan',
  templateUrl: './master-ruangan.component.html',
  styleUrls: ['./master-ruangan.component.scss']
})
export class MasterRuanganComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formRuangan!: FormGroup;
  listRuangan!: Ruangan[];
  detailRuangan: any;
  alertMessage: string = '';

  constructor(
    private authService: AuthService,
    private ruanganService: RuanganService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formRuangan = this.addRuanganFormGroup();
    this.loadDataRuangan();
  }

  loadDataRuangan() {
    this.ruanganService.fetchAll().subscribe((res) => {
      this.listRuangan = res;
    });
  }

  addRuanganFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      namaRuang: new FormControl('', [Validators.required]),
    });
  }

  submitFormRuangan() {
    console.log('id: ' + this.formRuangan.controls['id'].value);
    this.formRuangan.controls['id'].value;
    if (
      this.formRuangan.controls['id'].value == null ||
      this.formRuangan.controls['id'].value == ''
    ) {
      this.onSubmitAddRuangan(this.formRuangan.value);
    } else if (
      this.formRuangan.controls['id'].value != null ||
      this.formRuangan.controls['id'].value != ''
    ) {
      this.onSubmitUpdateRuangan(
        this.formRuangan.value,
        this.formRuangan.controls['id'].value
      );
    }
  }

  onSubmitAddRuangan(formRuangan: Pick<Ruangan, 'id'>): void {
    this.ruanganService
      .create(formRuangan)
      .subscribe(() => {
        this.formRuangan.reset();
        this.loadDataRuangan();
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

  update(idRuangan: any) {
    this.ruanganService
      .fetchById(idRuangan)
      .subscribe((res: any) => {
        this.detailRuangan = res.data;

        this.formRuangan.setValue({
          id: this.detailRuangan[0].id,
          namaRuang: this.detailRuangan[0].namaRuang
        });
      });
  }

  onSubmitUpdateRuangan(
    formRuangan: Pick<Ruangan, 'namaRuang'>,
    idRuangan: Pick<Ruangan, 'id'>
  ): void {
    this.ruanganService
      .update(formRuangan, idRuangan)
      .subscribe(() => {
        this.formRuangan.reset();
        this.showAlert('update');
        this.loadDataRuangan();
      });
  }

  delete(id: any) {
    this.ruanganService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataRuangan();
    });
  }
}
