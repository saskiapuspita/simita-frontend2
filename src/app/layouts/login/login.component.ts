import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  reset() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  createLoginFormGroup(): FormGroup {
    return new FormGroup({
      // nim: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  onSubmit(loginForm: any): void {
    this.authService.login(loginForm).subscribe();
  }
}
