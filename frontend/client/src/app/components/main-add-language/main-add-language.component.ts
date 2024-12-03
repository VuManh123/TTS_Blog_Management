import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Quill from 'quill';
import { AddPostService } from '../../services/addpost.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-add-language',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-add-language.component.html',
  styleUrls: ['./main-add-language.component.css']
})
export class MainAddLanguageComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  editorInstance!: Quill;

  post = {
    title: '',
    languageId: null,
    content: '',
    image: '',
  };
  languages: { id: number, code: string, name: string, flag: string }[] = [];
  
  constructor(
    private addPostService: AddPostService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  private loadInitialData(): void {
   
    this.addPostService.getLanguages().subscribe({
      next: (response) => {
        if (response?.success && Array.isArray(response?.data)) {
          this.languages = response.data.map((item: any) => ({
            id: item.id,
            code: item.code,
            name:item.name,
            flag:item.flag
          }));
        } else {
          console.error('Dữ liệu không hợp lệ');
        }
      },
      error: (err) => console.error('Không thể tải danh mục:', err)
    });
  }

  private initEditor(): void {
    this.editorInstance = new Quill(this.editor.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link', { align: [] }],
          ['image', 'blockquote', 'code-block'],
        ],
      },
    });

    const toolbar: any = this.editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => this.selectImage());

    this.editorInstance.on('text-change', () => {
      this.post.content = this.editorInstance.root.innerHTML;
    });
  }

  selectImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) this.uploadImage(file);
    };
  }

  uploadImage(file: File): void {
    this.addPostService.uploadImage(file).subscribe({
      next: (response) => {
        if (response.url) {
          const imageUrl = response.url;
          const range = this.editorInstance.getSelection();

          if (range !== null) {
            this.editorInstance.insertEmbed(range.index, 'image', imageUrl);
            this.post.image = imageUrl;
          }
        }
      },
      error: (err) => console.error('Upload ảnh thất bại:', err)
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.post.image) {
      this.post.image = 'https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png';
    }

    if (!this.validatePost(this.post)) {
      alert('Vui lòng điền đầy đủ thông tin bài viết.');
      return;
    }

    this.addPostService.submitPost(this.post).subscribe({
      next: () => {
        alert('Thêm ngôn ngữ thành công!');
        this.router.navigate(['/my-blog']);
      },
      error: (err) => {
        alert('Đăng ngôn ngữ thất bại.');
        console.error(err);
      }
    });
  }

  private validatePost(post: any): boolean {
    return !!(post.title && post.category && post.content && post.languageId);
  }
}
