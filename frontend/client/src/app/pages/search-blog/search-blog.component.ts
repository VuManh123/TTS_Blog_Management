import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';  // Import Router ở đây
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.css']
})
export class SearchBlogComponent implements OnInit {
  blogs: any[] = []; // Danh sách bài viết
  userId: string | null = null; // ID của người dùng
  categories: any[] = []; // Danh sách danh mục

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { } 

  ngOnInit() {
    // Lấy thông tin user từ AuthService
    this.authService.getUserProfile().subscribe(
      (profile) => {
        this.userId = profile.user.id; // Lấy userId từ thông tin profile
        this.getBlogsByUserId(); // Sau khi lấy userId, lấy bài viết của người dùng này
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );

    // Lấy danh sách category
    this.loadCategories();
  }
 
  // Lấy danh sách các bài viết của người dùng theo userId
  getBlogsByUserId() {
    if (this.userId) {
      this.http
        .get<any[]>('assets/articles.json')  // Hoặc sử dụng API endpoint phù hợp
        .subscribe(
          (data) => {
            // Lọc bài viết theo userId
            const filteredBlogs = data.filter((blog) => blog.author.id === this.userId);
            // Sau khi lọc, lấy tên danh mục cho mỗi bài viết
            this.blogs = filteredBlogs.map((blog) => {
              return { ...blog, categoryName: this.getCategoryNameById(blog.categoryId) };
            });
          },
          (error) => {
            console.error('Lỗi khi lấy danh sách bài viết:', error);
          }
        );
    }
  }

  // Lấy tên danh mục theo categoryId
  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  }

  // Lấy danh sách các category từ file categories.json
  loadCategories() {
    this.http.get<any[]>('assets/categories.json').subscribe(
      (categories) => {
        this.categories = categories; // Lưu danh mục vào mảng categories
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    );
  }


  // Hàm xử lý sửa bài viết
  onEdit(blogId: number): void {
    this.router.navigate(['/edit-blog', blogId]); 
  }
  addlanguage(blogId: number): void {
    this.router.navigate(['/edit-blog', blogId]); 
  }


  onDelete(blogId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      this.http.delete(`api/blogs/${blogId}`).subscribe( //thay địa chỉ api delete blog
       () => {
          this.blogs = this.blogs.filter((blog) => blog.id !== blogId);
          alert('Bài viết đã được xóa thành công');
        },
        (error) => {
          console.error('Lỗi khi xóa bài viết:', error);
          alert('Đã có lỗi xảy ra khi xóa bài viết');
        }
      );
    }
  }
}
