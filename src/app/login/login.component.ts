import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../core/data-services/auth.data-service';
import { Router } from '@angular/router';
import { AuthResponse } from '../shared/models/auth-response.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'oc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginError: boolean;
  isLoggingIn: boolean;

  constructor(
    private formBuiler: FormBuilder,
    private authDataService: AuthDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/admin']);
    }
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isLoggingIn = true;
      const { username, password } = this.loginForm.value;

      this.authDataService.login(username, password).subscribe(
        (authResponse: AuthResponse) => {
          localStorage.setItem('authToken', authResponse.access_token);
          this.authService.user$.next(authResponse.user);
          this.isLoggingIn = false;

          this.router.navigate(['/admin']);
        },
        (error) => {
          this.isLoggingIn = false;
          this.isLoginError = true;
        }
      );
    }
  }

  private initForm() {
    this.loginForm = this.formBuiler.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
