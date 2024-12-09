import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MataKuliah } from 'src/app/interfaces/mata-kuliah';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMataKuliahService } from 'src/app/services/master-mata-kuliah.service';
import { MasterPeminatanService } from 'src/app/services/master-peminatan.service';

@Component({
  selector: 'app-master-mata-kuliah',
  templateUrl: './master-mata-kuliah.component.html',
  styleUrls: ['./master-mata-kuliah.component.scss'],
})
export class MasterMataKuliahComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formMataKuliah!: FormGroup;
  listMataKuliah!: MataKuliah[];
  detailMataKuliah: any;
  alertMessage: string = '';
  peminatan$!: Observable<Peminatan[]>;

  constructor(
    private authService: AuthService,
    private masterMataKuliahService: MasterMataKuliahService,
    private masterPeminatanService: MasterPeminatanService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formMataKuliah = this.addMataKuliahFormGroup();
    this.loadDataMataKuliah();
    this.peminatan$ = this.loadPeminatan();
  }

  loadPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  loadDataMataKuliah() {
    this.masterMataKuliahService.fetchNamaPeminatanBasedOnIdMinat().subscribe((res) => {
      this.listMataKuliah = res;
    });
  }

  addMataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      nama: new FormControl('', [Validators.required]),
      sks: new FormControl('', [Validators.required]),
      minat: new FormControl('', [Validators.required]),
    });
  }

  submitformMataKuliah() {
    console.log('id: ' + this.formMataKuliah.get('id')!.value);
    if (
      this.formMataKuliah.get('id')!.value == null ||
      this.formMataKuliah.get('id')!.value == ''
    ) {
      console.log("masuk ke sini");
      
      this.onSubmitAddMataKuliah(this.formMataKuliah.value);
    } else if (
      this.formMataKuliah.get('id')!.value != null ||
      this.formMataKuliah.get('id')!.value != ''
    ) {
      this.onSubmitUpdateMataKuliah(
        this.formMataKuliah.value,
        this.decodedToken.userId,
        this.formMataKuliah.get('id')!.value
      );
    }
  }

  onSubmitAddMataKuliah(formMataKuliah: Pick<MataKuliah, 'id'>): void {
    this.masterMataKuliahService
      .create(formMataKuliah, this.decodedToken.userId)
      .subscribe(() => {
        this.formMataKuliah.reset();
        // this.closeModal.nativeElement.click();
        this.loadDataMataKuliah();
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
    this.masterMataKuliahService.fetchById(id).subscribe((res) => {
      this.detailMataKuliah = res;
      this.formMataKuliah.setValue({
        id: this.detailMataKuliah[0].id,
        nama: this.detailMataKuliah[0].nama,
        sks: this.detailMataKuliah[0].sks,
        minat: this.detailMataKuliah[0].minat,
      });
    });
  }

  onSubmitUpdateMataKuliah(
    formMataKuliah: Pick<MataKuliah, 'nama' | 'sks' | 'minat'>,
    idUser: Pick<User, 'id'>,
    idMataKuliah: Pick<MataKuliah, 'id'>
  ): void {
    this.masterMataKuliahService
      .update(formMataKuliah, idUser, idMataKuliah)
      .subscribe(() => {
        this.formMataKuliah.reset();
        this.showAlert('update');
        this.loadDataMataKuliah();
      });
  }

  delete(id: any) {
    this.masterMataKuliahService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataMataKuliah();
    });
  }
}
