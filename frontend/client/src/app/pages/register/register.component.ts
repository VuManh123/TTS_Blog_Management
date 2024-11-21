import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  avatar_url: string = ''; // Link avatar image
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.register(this.username, this.first_name, this.last_name, this.email, this.password, this.avatar_url).subscribe({
      next: (response) => {
        console.log('Đăng ký thành công:', response);
        this.router.navigate(['/login']); // Điều hướng sang trang đăng nhập sau khi đăng ký thành công
      },
      error: (error) => {
        console.error('Lỗi đăng ký:', error);
        this.errorMessage = 'Đã có lỗi xảy ra trong quá trình đăng ký!';
      }
    });
  }
}
