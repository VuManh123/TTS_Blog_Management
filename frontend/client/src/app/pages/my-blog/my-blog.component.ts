import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';  // Đảm bảo sử dụng CommonModule cho các chỉ thị như ngIf

@Component({
  selector: 'app-my-blog',
  standalone: true,
  imports: [CommonModule],  // Dùng CommonModule cho các chỉ thị
  template: `
    <div *ngIf="username">
      <p>Chào mừng, {{ username }}!</p>
      <p>{{ message }}</p>
    </div>
    <div *ngIf="!username">
      <p>Chưa đăng nhập, vui lòng đăng nhập để xem thông tin.</p>
    </div>
  `,
  styleUrls: ['./my-blog.component.css']
})
export class MyBlogComponent implements OnInit {
  username: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.username = response.user.username; // Lấy username từ response
        this.message = response.message; // Lấy message từ response
      },
      error: (err) => {
        console.error('Lỗi lấy thông tin profile:', err);
      },
    });
  }
}
