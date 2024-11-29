import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


// test post json : json-server --watch db.json --port 3001
@Component({
  selector: 'app-main-new-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-new-blog.component.html',
  styleUrls: ['./main-new-blog.component.css']
})
export class MainNewBlogComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  editorInstance!: Quill;

  post = {
    title: '',
    category: '',
    languageId: null,  // Sử dụng languageId thay vì language
    content: '',
    excerpt: '',
    userId: 0,
    image: '',  // Trường image để lưu URL ảnh
  };

  categories: { id: number, name: string }[] = [];
  languages: { id: number, code: string, name: string, flag: string }[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Lấy danh sách categories từ file JSON
    this.http.get<{ id: number, name: string }[]>('assets/categories.json')
      .subscribe((data) => {
        this.categories = data;
      });

    // Lấy danh sách ngôn ngữ từ API (hoặc file JSON)
    this.http.get<{ id: number, code: string, name: string, flag: string }[]>('assets/language.json')
      .subscribe((data) => {
        this.languages = data;
      });

    // Lấy thông tin user từ AuthService để cập nhật userId
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.post.userId = response.user.id;
        console.log('User ID từ profile:', this.post.userId);
      },
      error: (err) => {
        console.error('Không thể lấy thông tin người dùng:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.editorInstance = new Quill(this.editor.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ align: [] }],
          ['image'], // Thêm nút chèn ảnh
          ['blockquote', 'code-block'],
        ],
      },
    });

    // Xử lý toolbar, cần khai báo rõ kiểu của toolbar là any
    const toolbar: any = this.editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => {
      this.selectImage();
    });

    // Lấy nội dung khi editor thay đổi
    this.editorInstance.on('text-change', () => {
      this.post.content = this.editorInstance.root.innerHTML;
      this.post.excerpt = this.editorInstance.root.innerText.substring(0, 150); // Tạo excerpt tự động
    });
  }

  // Xử lý chọn ảnh
  selectImage(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.uploadImage(file);
      }
    };
  }

  // Upload ảnh lên server
  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('image', file, file.name);

    // Gửi ảnh lên server và nhận URL ảnh trả về
    this.http.post<any>('http://localhost:3001/upload', formData).subscribe({
      next: (response) => {
        if (response && response.url) {
          const imageUrl = response.url;
          const range = this.editorInstance.getSelection();
          
          if (range !== null) {
            this.editorInstance.insertEmbed(range.index, 'image', imageUrl);
            this.post.image = imageUrl; 
          } else {
            console.error('Không có vị trí lựa chọn trong editor');
          }
        }
      },
      error: (err) => {
        console.error('Upload image failed', err);
      },
    });
  }

  // Hàm submit bài viết
  onSubmit(event: Event): void {
    event.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!this.validatePost(this.post)) {
      alert('Vui lòng điền đầy đủ thông tin bài viết.');
      return;
    }
    console.log('Post object before submitting:', this.post);

    // Gửi bài viết lên API với languageId thay vì language
    this.http.post('http://localhost:3001/posts', this.post).subscribe({
      next: (response) => {
        alert('Đăng bài viết thành công!');
        console.log(response);

        // Chuyển hướng đến trang myblog
        this.router.navigate(['/my-blog']);
      },
      error: (error) => {
        alert('Đăng bài viết thất bại.');
        console.error(error);
      },
    });
  }

  // Hàm kiểm tra tính hợp lệ của bài viết
  validatePost(post: any): boolean {
    return post.title && post.category && post.content && post.languageId;  // Kiểm tra languageId
  }
}
