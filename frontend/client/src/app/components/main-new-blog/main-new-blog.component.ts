import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Quill from 'quill';

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
    content: '',
    excerpt: '',
    userId: 1, // Giả định userId (có thể lấy từ auth)
    image: '', // Có thể upload sau hoặc mặc định rỗng
  };

  categories: { id: number, name: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Lấy danh sách categories từ file JSON
    this.http.get<{ id: number, name: string }[]>('assets/categories.json')
      .subscribe((data) => {
        this.categories = data;
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
          ['image'],
          ['blockquote', 'code-block'],
        ],
      },
    });

    // Lấy nội dung khi editor thay đổi
    this.editorInstance.on('text-change', () => {
      this.post.content = this.editorInstance.root.innerHTML;
      this.post.excerpt = this.editorInstance.root.innerText.substring(0, 150); // Tạo excerpt tự động
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!this.validatePost(this.post)) {
      alert('Vui lòng điền đầy đủ thông tin bài viết.');
      return;
    }

    // Gửi bài viết lên API
    this.http.post('http://localhost:3000/blogs', this.post).subscribe({
      next: (response) => {
        alert('Đăng bài viết thành công!');
        console.log(response);
      },
      error: (error) => {
        alert('Đăng bài viết thất bại.');
        console.error(error);
      },
    });
  }

  validatePost(post: any): boolean {
    return post.title && post.category && post.content;
  }
}
