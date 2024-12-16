import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { AuthService } from 'src/app/services/auth.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';

@Component({
  selector: 'app-master-peminatan',
  templateUrl: './master-peminatan.component.html',
  styleUrls: ['./master-peminatan.component.scss'],
})
export class MasterPeminatanComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formPeminatan!: FormGroup;
  listPeminatan!: Peminatan[];
  detailPeminatan: any;
  alertMessage: string = '';

  constructor(
    private authService: AuthService,
    private masterPeminatanService: MasterPeminatanService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formPeminatan = this.addPeminatanFormGroup();
    this.loadDataPeminatan();
  }

  loadDataPeminatan() {
    this.masterPeminatanService.fetchAll().subscribe((res) => {
      this.listPeminatan = res;
    });
  }

  addPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      nama: new FormControl('', [Validators.required]),
      kuotaPeminatan: new FormControl('', [Validators.required]),
    });
  }

  submitFormPeminatan() {
    console.log('id: ' + this.formPeminatan.controls['id'].value);
    this.formPeminatan.controls['id'].value;
    if (
      this.formPeminatan.controls['id'].value == null ||
      this.formPeminatan.controls['id'].value == ''
    ) {
      this.onSubmitAddPeminatan(this.formPeminatan.value);
    } else if (
      this.formPeminatan.controls['id'].value != null ||
      this.formPeminatan.controls['id'].value != ''
    ) {
      this.onSubmitUpdatePeminatan(
        this.formPeminatan.value,
        this.formPeminatan.controls['id'].value
      );
    }
  }

  onSubmitAddPeminatan(formPeminatan: Pick<Peminatan, 'id'>): void {
    this.masterPeminatanService
      .create(formPeminatan, this.decodedToken.userId)
      .subscribe(() => {
        this.formPeminatan.reset();
        // this.closeModal.nativeElement.click();
        this.loadDataPeminatan();
        this.showAlert('add');
      });
  }

  showAlert(action: string): void {
    if (this.isVisible) {
      return;
    }

    if (action === 'add') {
      this.alertMessage = 'Data berhasil ditambahkan!';
    } else if (action === 'update') {
      this.alertMessage = 'Data berhasil diperbarui!';
    } else {
      this.alertMessage = 'Data berhasil dihapus!';
    }

    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 2500);
  }

  update(id: any) {
    this.masterPeminatanService.fetchById(id).subscribe((res) => {
      this.detailPeminatan = res;
      this.formPeminatan.setValue({
        id: this.detailPeminatan[0].id,
        nama: this.detailPeminatan[0].nama,
        kuotaPeminatan: this.detailPeminatan[0].kuotaPeminatan
      });
    });
  }

  onSubmitUpdatePeminatan(
    formPeminatan: Pick<Peminatan, 'nama' | 'kuotaPeminatan'>,
    idPeminatan: Pick<Peminatan, 'id'>
  ): void {
    this.masterPeminatanService
      .update(formPeminatan, idPeminatan)
      .subscribe(() => {
        this.formPeminatan.reset();
        this.showAlert('update');
        this.loadDataPeminatan();
      });
  }

  delete(id: any) {
    this.masterPeminatanService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataPeminatan();
    });
  }
}
