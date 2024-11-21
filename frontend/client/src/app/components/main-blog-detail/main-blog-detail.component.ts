import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-main-blog-detail',
  standalone: true,
  templateUrl: './main-blog-detail.component.html',
  styleUrls: ['./main-blog-detail.component.css'],
  imports: [CommonModule]  // Thêm CommonModule vào imports
})
export class MainBlogDetailComponent implements OnInit {
  blog: any;
  articles: any[] = [];
  comments: any[] = []; // Dữ liệu tất cả bình luận
  filteredComments: any[] = []; // Bình luận thuộc bài viết hiện tại


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Lấy danh sách bài viết
    this.http.get<any[]>('assets/articles.json').subscribe(data => {
      this.articles = data;
      const articleId = this.route.snapshot.paramMap.get('id');
      this.blog = this.articles.find(article => article.id === Number(articleId));

      // Sau khi lấy được bài viết, lọc bình luận
      this.filterComments();
    });

    // Gọi API lấy danh sách bình luận
    this.http.get<any[]>('assets/comments.json').subscribe(data => {
      // Chuyển đổi blog_id thành articles_id
      this.comments = data.map(comment => ({
        ...comment,
        articles_id: comment.blog_id // Đổi tên trường từ blog_id sang articles_id
      }));
      this.filterComments(); // Lọc lại bình luận sau khi có dữ liệu
    });
  }


  // Lọc bình luận dựa trên bài viết hiện tại
  private filterComments(): void {
    if (this.blog && this.comments.length > 0) {
      // Lọc các bình luận theo articles_id
      this.filteredComments = this.comments.filter(comment => comment.articles_id === this.blog.id);
    }
  }


}
