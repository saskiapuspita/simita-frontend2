import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NilaiMataKuliah } from 'src/app/interfaces/nilai-mata-kuliah';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMahasiswaService } from 'src/app/services/master-mahasiswa.service';
import { NilaiMataKuliahService } from 'src/app/services/nilai-mata-kuliah.service';

@Component({
  selector: 'app-nilai-mata-kuliah',
  templateUrl: './nilai-mata-kuliah.component.html',
  styleUrls: ['./nilai-mata-kuliah.component.scss']
})
export class NilaiMataKuliahComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formNilaiMataKuliah!: FormGroup;
  listNilaiMataKuliah!: NilaiMataKuliah[];
  detailNilaiMataKuliah: any;
  alertMessage: string = '';
  namaMahasiswa$: any;

  constructor(
    private authService: AuthService,
    private nilaiMataKuliahService: NilaiMataKuliahService,
    private masterMahasiswaService: MasterMahasiswaService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formNilaiMataKuliah = this.addNilaiMataKuliahFormGroup();
    this.loadDataNilaiMataKuliah();
    this.namaMahasiswa$ = this.fetchAllMahasiswa();
  }

  fetchAllMahasiswa(): Observable<User[]> {
    return this.masterMahasiswaService.fetchAll();
  }

  loadDataNilaiMataKuliah() {
    this.nilaiMataKuliahService.fetchAll().subscribe((res) => {
      this.listNilaiMataKuliah = res;
    });
  }

  addNilaiMataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      mataKuliah: new FormControl('', [Validators.required]),
      nilai: new FormControl('', [Validators.required]),
    });
  }

  submitFormNilaiMataKuliah() {
    console.log('id: ' + this.formNilaiMataKuliah.controls['id'].value);
    this.formNilaiMataKuliah.controls['id'].value;
    if (this.formNilaiMataKuliah.controls['id'].value == null || this.formNilaiMataKuliah.controls['id'].value == '') {
      this.onSubmitAddNilaiMataKuliah(this.formNilaiMataKuliah.value);
    } else if (this.formNilaiMataKuliah.controls['id'].value != null || this.formNilaiMataKuliah.controls['id'].value != '') {
      this.onSubmitUpdateNilaiMataKuliah(
        this.formNilaiMataKuliah.value,
        this.formNilaiMataKuliah.controls['id'].value
      );
    }
  }

  onSubmitAddNilaiMataKuliah(formNilaiMataKuliah: Pick<NilaiMataKuliah, 'nilai' | 'mataKuliah' | 'user'>): void {
    this.nilaiMataKuliahService.create(formNilaiMataKuliah, this.decodedToken.userId).subscribe(() => {
      this.formNilaiMataKuliah.reset();
      this.loadDataNilaiMataKuliah();
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

  update(idNilaiMataKuliah: any) {
    this.nilaiMataKuliahService.fetchById(idNilaiMataKuliah).subscribe((res: any) => {
      this.detailNilaiMataKuliah = res.data;
      
      this.formNilaiMataKuliah.setValue({
        id: this.detailNilaiMataKuliah[0].id,
        name: this.detailNilaiMataKuliah[0].name,
        email: this.detailNilaiMataKuliah[0].email,
        nidn: this.detailNilaiMataKuliah[0].nidn
      });
    });
  }

  onSubmitUpdateNilaiMataKuliah(
    formNilaiMataKuliah: Pick<NilaiMataKuliah, 'nilai' | 'mataKuliah'>,
    idNilaiMataKuliah: Pick<NilaiMataKuliah, 'id'>
  ): void {
    this.nilaiMataKuliahService.update(formNilaiMataKuliah, idNilaiMataKuliah).subscribe(() => {
      this.formNilaiMataKuliah.reset();
      this.showAlert('update');
      this.loadDataNilaiMataKuliah();
    });
  }

  delete(id: any) {
    this.nilaiMataKuliahService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataNilaiMataKuliah();
    });
  }
}
