import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // user: User = {
  //   name: "",
  //   email: "",
  //   password: "",
  // }

  constructor(private userApiService: UserApiService, private router: Router) {}

  ngOnInit() {}

  // registerUser() {
  //   this.userApiService.addUser(this.user).subscribe(res => {
  //     console.log("Berhasil register user!");
  //     this.router.navigate(['/']);
  //   })
  // }
}
