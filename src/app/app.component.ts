import { Component } from '@angular/core';
import { LoginComponent } from './layouts/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simita';
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginStatus.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
  }
}
