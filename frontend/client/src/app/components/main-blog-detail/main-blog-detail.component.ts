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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/articles.json')
      .subscribe(data => {
        this.articles = data;
        const articleId = this.route.snapshot.paramMap.get('id');
        this.blog = this.articles.find(article => article.id === Number(articleId));
      });
  }
}
