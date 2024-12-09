import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dosen } from 'src/app/interfaces/dosen';
import { AuthService } from 'src/app/services/auth.service';
import { MasterDosenService } from 'src/app/services/master-dosen.service';

@Component({
  selector: 'app-master-dosen',
  templateUrl: './master-dosen.component.html',
  styleUrls: ['./master-dosen.component.scss'],
})
export class MasterDosenComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formDosen!: FormGroup;
  listDosen!: Dosen[];
  detailDosen: any;
  alertMessage: string = '';

  constructor(
    private authService: AuthService,
    private masterDosenService: MasterDosenService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formDosen = this.addDosenFormGroup();
    this.loadDataDosen();
  }

  loadDataDosen() {
    this.masterDosenService.fetchAll().subscribe((res) => {
      this.listDosen = res;
    });
  }

  addDosenFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nidn: new FormControl('', [Validators.required]),
    });
  }

  submitFormDosen() {
    console.log('id: ' + this.formDosen.controls['id'].value);
    this.formDosen.controls['id'].value;
    if (this.formDosen.controls['id'].value == null || this.formDosen.controls['id'].value == '') {
      this.onSubmitAddDosen(this.formDosen.value);
    } else if (this.formDosen.controls['id'].value != null || this.formDosen.controls['id'].value != '') {
      this.onSubmitUpdateDosen(
        this.formDosen.value,
        this.formDosen.controls['id'].value
      );
    }
  }

  onSubmitAddDosen(formDosen: Pick<Dosen, 'id'>): void {
    this.masterDosenService.create(formDosen).subscribe(() => {
      this.formDosen.reset();
      // this.closeModal.nativeElement.click();
      this.loadDataDosen();
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

  update(idDosen: any) {
    this.masterDosenService.fetchById(idDosen).subscribe((res: any) => {
      this.detailDosen = res.data;
      
      this.formDosen.setValue({
        id: this.detailDosen[0].id,
        name: this.detailDosen[0].name,
        email: this.detailDosen[0].email,
        nidn: this.detailDosen[0].nidn
      });
    });
  }

  onSubmitUpdateDosen(
    formDosen: Pick<Dosen, 'name' | 'email' | 'nidn'>,
    idDosen: Pick<Dosen, 'id'>
  ): void {
    this.masterDosenService.update(formDosen, idDosen).subscribe(() => {
      this.formDosen.reset();
      this.showAlert('update');
      this.loadDataDosen();
    });
  }

  delete(id: any) {
    this.masterDosenService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataDosen();
    });
  }
}
