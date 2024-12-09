import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMahasiswaService } from 'src/app/services/master-mahasiswa.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  isOpen = false;
  decodedToken: any;
  formEditUser!: FormGroup;
  editdata: any;

  constructor(
    private authService: AuthService,
    private masterMahasiswaService: MasterMahasiswaService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.formEditUser = this.userFormGroup();
    this.setDisplayData();
  }

  userFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      nim: new FormControl(''),
      ipk: new FormControl(''),
      sks: new FormControl(''),
      noTelp: new FormControl(''),
    });
  }

  submitForm() {
    this.onSubmitEditUser(this.formEditUser.value, this.decodedToken.userId);
  }

  onSubmitEditUser(
    formEditUser: Pick<
      User,
      'name' | 'nim' | 'email' | 'ipk' | 'sks' | 'noTelp'
    >,
    userId: Pick<User, 'id'>
  ): void {
    this.masterMahasiswaService
      .update(formEditUser, userId)
      .subscribe(() => {
        alert('Update profil user berhasil!');
        // this.setDisplayData();
      });
  }

  setDisplayData() {
    this.formEditUser.setValue({
      name: this.decodedToken.name,
      nim: this.decodedToken.nim,
      email: this.decodedToken.email,
      ipk: this.decodedToken.ipk,
      sks: this.decodedToken.sks,
      noTelp: this.decodedToken.noTelp,
    });
  }
}
