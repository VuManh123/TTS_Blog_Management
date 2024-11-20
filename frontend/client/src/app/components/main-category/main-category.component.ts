import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  created_at: Date;
  updated_at: Date;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string; // Tóm tắt bài viết
  author: {
    name: string;
    date: string;
    profileImage: string;
  };
  image: string;
  categoryId: number; // ID của danh mục bài viết
}


@Component({
  selector: 'app-main-category',
  standalone: true,
  imports: [RouterLink, NgFor,CommonModule],
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainCategoryComponent implements OnInit {
  categories: Category[] = [];
  articles: Article[] = [];
  categoryId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Lấy dữ liệu cho categories
    this.http.get<Category[]>('assets/categories.json')
      .subscribe(
        data => {
          this.categories = data.map(category => ({
            ...category,
            created_at: new Date(category.created_at),
            updated_at: new Date(category.updated_at)
          }));
        },
        error => {
          console.error('Error fetching categories', error);
        }
      );

    // Lấy `id` của category từ URL
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    // Gọi API hoặc lấy dữ liệu từ JSON
    this.http.get<Article[]>('assets/articles.json').subscribe(
      (data) => {
        // Lọc bài viết theo categoryId
        this.articles = data.filter((article) => article.categoryId === this.categoryId);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category'; // Trả về tên hoặc 'Unknown' nếu không tìm thấy
  }
}
