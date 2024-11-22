import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css']
})
export class MyBlogComponent implements OnInit {
  blogs: any[] = []; // Danh sách bài viết
  userId: string | null = null; // ID của người dùng
  categories: any = {}; // Lưu thông tin danh mục theo ID

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    // Lấy thông tin user từ AuthService
    this.authService.getUserProfile().subscribe(
      (profile) => {
        this.userId = profile.id; // Lấy userId từ thông tin profile
        this.loadCategories();
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }

  loadCategories() {
    // Lấy tất cả danh mục
    this.http.get<any[]>('assets/categories.json').subscribe(
      (categories) => {
        categories.forEach((category) => {
          this.categories[category.id] = category; // Lưu danh mục theo ID
        });
        this.getBlogsByUserId();
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    );
  }

  getBlogsByUserId() {
    if (this.userId) {
      this.http
      .get<any[]>(`assets/articles.json`)
       // .get<any[]>(`http://localhost:3000/api/blogs?userId=${this.userId}`)
        .subscribe(
          (data) => {
            this.blogs = data;
          },
          (error) => {
            console.error('Lỗi khi lấy danh sách bài viết:', error);
          }
        );
    }
  }
}
