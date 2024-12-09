import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMahasiswaService } from 'src/app/services/master-mahasiswa.service';

@Component({
  selector: 'app-master-mahasiswa',
  templateUrl: './master-mahasiswa.component.html',
  styleUrls: ['./master-mahasiswa.component.scss'],
})
export class MasterMahasiswaComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formMahasiswa!: FormGroup;
  listMahasiswa!: User[];
  detailMahasiswa: any;
  alertMessage: string = '';

  constructor(
    private authService: AuthService,
    private masterMahasiswaService: MasterMahasiswaService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formMahasiswa = this.addMahasiswaFormGroup();
    this.loadDataMahasiswa();
  }

  loadDataMahasiswa() {
    this.masterMahasiswaService.fetchAll().subscribe((res) => {
      this.listMahasiswa = res;
    });
  }

  addMahasiswaFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nim: new FormControl('', [Validators.required]),
      ipk: new FormControl('', [Validators.required]),
      sks: new FormControl('', [Validators.required]),
      noTelp: new FormControl('', [Validators.required]),
    });
  }

  submitformMahasiswa() {
    console.log('id: ' + this.formMahasiswa.controls['id'].value);
    this.formMahasiswa.controls['id'].value;
    if (
      this.formMahasiswa.controls['id'].value == null ||
      this.formMahasiswa.controls['id'].value == ''
    ) {
      this.onSubmitAddMahasiswa(this.formMahasiswa.value);
    } else if (
      this.formMahasiswa.controls['id'].value != null ||
      this.formMahasiswa.controls['id'].value != ''
    ) {
      this.onSubmitUpdateMahasiswa(
        this.formMahasiswa.value,
        this.formMahasiswa.controls['id'].value
      );
    }
  }

  onSubmitAddMahasiswa(formMahasiswa: Pick<User, 'id'>): void {
    this.masterMahasiswaService.create(formMahasiswa).subscribe(() => {
      this.formMahasiswa.reset();
      // this.closeModal.nativeElement.click();
      this.loadDataMahasiswa();
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
    this.masterMahasiswaService.fetchById(id).subscribe((res) => {
      this.detailMahasiswa = res;
      this.formMahasiswa.setValue({
        id: this.detailMahasiswa[0].id,
        name: this.detailMahasiswa[0].name,
        email: this.detailMahasiswa[0].email,
        nim: this.detailMahasiswa[0].nim,
        ipk: this.detailMahasiswa[0].ipk,
        sks: this.detailMahasiswa[0].sks,
        noTelp: this.detailMahasiswa[0].noTelp,
      });
    });
  }

  onSubmitUpdateMahasiswa(
    formMahasiswa: Pick<
      User,
      'name' | 'email' | 'nim' | 'ipk' | 'sks' | 'noTelp'
    >,
    idMahasiswa: Pick<User, 'id'>
  ): void {
    this.masterMahasiswaService
      .update(formMahasiswa, idMahasiswa)
      .subscribe(() => {
        this.formMahasiswa.reset();
        this.showAlert('update');
        this.loadDataMahasiswa();
      });
  }

  delete(id: any) {
    this.masterMahasiswaService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataMahasiswa();
    });
  }
}
