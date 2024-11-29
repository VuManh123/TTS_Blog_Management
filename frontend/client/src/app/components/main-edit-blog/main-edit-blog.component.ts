import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-edit-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-edit-blog.component.html',
  styleUrls: ['./main-edit-blog.component.css'],
})
export class MainEditBlogComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor!: ElementRef;
  editorInstance!: Quill;

  post = {
    id: 0,
    title: '',
    categoryId: null,
    languageId: null,
    content: '',
    excerpt: '',
    userId: 0,
    image: '',
  };

  categories: { id: number; name: string }[] = [];
  languages: { id: number; code: string; name: string; flag: string }[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy danh sách categories từ JSON
    this.http.get<{ id: number; name: string }[]>('assets/categories.json').subscribe((data) => {
      this.categories = data;
    });

    // Lấy danh sách ngôn ngữ từ JSON
    this.http.get<{ id: number; code: string; name: string; flag: string }[]>('assets/language.json').subscribe((data) => {
      this.languages = data;
    });

    // Lấy ID bài viết từ URL và tải dữ liệu bài viết
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPostData(parseInt(postId, 10));
    }
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
          ['image'],
          ['blockquote', 'code-block'],
        ],
      },
    });

    // Cập nhật nội dung khi editor thay đổi
    this.editorInstance.on('text-change', () => {
      this.post.content = this.editorInstance.root.innerHTML;
      this.post.excerpt = this.editorInstance.root.innerText.substring(0, 150); // Tạo excerpt tự động
    });
  }

  loadPostData(postId: number): void {
    // Gọi API lấy danh sách tất cả bài viết
    this.http.get<any[]>('assets/articles.json').subscribe({
      next: (posts) => {
        const foundPost = posts.find((post) => post.id === postId); // Tìm bài viết có ID tương ứng

        if (foundPost) {
          this.post = { ...foundPost };

          // Cập nhật nội dung vào Quill editor
          if (this.editorInstance) {
            this.editorInstance.root.innerHTML = foundPost.content;
          }
        } else {
          alert('Bài viết không tồn tại!');
          this.router.navigate(['/my-blog']); // Chuyển hướng về trang My Blog nếu không tìm thấy bài viết
        }
      },
      error: (err) => {
        console.error('Không thể tải danh sách bài viết:', err);
        alert('Lỗi khi tải danh sách bài viết!');
      },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!this.validatePost(this.post)) {
      alert('Vui lòng điền đầy đủ thông tin bài viết.');
      return;
    }

    // Gửi yêu cầu cập nhật bài viết
    this.http.put(`http://localhost:3001/posts/${this.post.id}`, this.post).subscribe({
      next: (response) => {
        alert('Cập nhật bài viết thành công!');
        console.log(response);

        // Chuyển hướng đến trang "My Blog"
        this.router.navigate(['/my-blog']);
      },
      error: (error) => {
        alert('Cập nhật bài viết thất bại.');
        console.error(error);
      },
    });
  }

  validatePost(post: any): boolean {
    return post.title && post.category && post.content && post.languageId;
  }
}
