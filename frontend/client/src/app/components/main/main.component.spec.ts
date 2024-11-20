import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Category {
  name: string;
  id:number;
  articleCount: number;
  imageUrl: string;
  altText: string;
}

interface Article {
  title: string;
  id :number;
  slug: string; 
  readTime: string;
  tags: string[];
  author: {
    name: string;
    date: string;
    profileImage: string;
  };
  image: string;
}



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],  
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
          this.articles = data;
          // Xử lý slug cho mỗi bài viết
          this.articles.forEach(article => {
            article.slug = article.title.toLowerCase().replace(/ /g, '-');
          });
        },
        error => {
          console.error('Error fetching articles', error);
        }
      );
  }
}
