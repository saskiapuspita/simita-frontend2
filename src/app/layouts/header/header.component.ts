import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  users: any[] = [];
  showCurrentUserData: Promise<boolean> | undefined;

  toggle() {
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  constructor(private authApiService: AuthApiService, private router: Router) {}

  ngOnInit() {
    this.getInfoMe();
  }

  getInfoMe() {
    this.authApiService.getInfoMe().subscribe((data: any[]) => {
      this.users = data;
      this.showCurrentUserData=Promise.resolve(true);
      console.log(data);
    });
  }

  signOut() {
    this.authApiService.logout().subscribe(res => {
      // alert(res.toString());
      console.log("Berhasil logout");
      this.router.navigate(['/']);
    });
  }
}
