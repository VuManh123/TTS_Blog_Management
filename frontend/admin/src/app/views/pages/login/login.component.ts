import { Component, NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        const token = response.token;
        this.authService.saveToken(token); // Lưu token
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // Điều hướng đến dashboard
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.error.message || 'Invalid username or password';
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}