import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Category {
  name: string;
  articleCount: number;
  imageUrl: string;
  altText: string;
}

interface Author {
  name: string;
  date: string;
  profileImage: string;
}

interface Article {
  title: string;
  readTime: string;
  tags: string[];
  author: Author;
  image: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [IonicModule, CommonModule],  // Thêm CommonModule để sử dụng *ngFor
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  articles: Article[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Lấy dữ liệu cho categories
    this.http.get<Category[]>('assets/categories.json')
      .subscribe(
        data => {
          this.categories = data;
        },
        error => {
          console.error('Error fetching categories', error);
        }
      );

    // Lấy dữ liệu cho articles
    this.http.get<Article[]>('assets/articles.json')
      .subscribe(
        data => {
          // Thêm trường 'url' vào mỗi bài viết với dấu cách thay bằng dấu gạch ngang
          this.articles = data.map(article => ({
            ...article,
            url: article.title.toLowerCase().replace(/ /g, '-')
          }));
        },
        error => {
          console.error('Error fetching articles', error);
        }
      );
  }
}
