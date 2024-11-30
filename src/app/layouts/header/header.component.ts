import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MasterMahasiswaService } from 'src/app/services/master-mahasiswa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated = false;
  decodedToken: any;
  changePasswordForm!: FormGroup;
  LoginStatus$! : Observable<boolean>;
  UserName! : any;

  // users: any[] = [];
  showCurrentUserData: Promise<boolean> | undefined;

  toggle() {
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private masterMahasiswaService: MasterMahasiswaService, private router: Router) {}

  ngOnInit() {
    this.authService.loginStatus.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });

    this.LoginStatus$ = this.authService.isLoggesIn;
    
    this.UserName = localStorage.getItem('username');
    
    this.decodedToken = this.authService.decodeToken();

    this.changePasswordForm = this.formBuilder.group({
      password: new FormControl(''),
    });
    // this.getInfoMe();
  }

  reset() {
    this.changePasswordForm = this.formBuilder.group({
      password: new FormControl(''),
    });
  }

  // getInfoMe() {
  //   this.authApiService.getInfoMe().subscribe((data: any[]) => {
  //     this.users = data;
  //     this.showCurrentUserData=Promise.resolve(true);
  //     console.log(data);
  //   });
  // }

  signOut() {
    this.authService.logout();
  }

  changePassword(changePasswordForm: any, id: any) {
    this.masterMahasiswaService
      .updatePassword(changePasswordForm.password, id)
      .subscribe(() => {
        alert('Update password berhasil!');
        document.getElementById("closeModalButton")?.click();
        // this.closePopUp();
      });
    // this.openModalUpdatePassword(id, 'Update Password', ModalUpdatePasswordComponent);
  }

  closePopUp() {
  }
}
