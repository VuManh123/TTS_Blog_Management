import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  created_at: Date;
  update_at: Date;
}

interface Article {
  id: number;
  title: string;
  slug: string;
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
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];
  articles: Article[] = [];

  constructor(private http: HttpClient) { }

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
        },
        error => {
          console.error('Error fetching articles', error);
        }
      );
  }

  ngAfterViewInit(): void {
    const sliderContainer = document.querySelector('[data-slider-container]') as HTMLElement;
    const sliderPrevBtn = document.querySelector('[data-slider-prev]') as HTMLElement;
    const sliderNextBtn = document.querySelector('[data-slider-next]') as HTMLElement;

    let currentSlidePos = 0;
    const sliderItems = sliderContainer?.children as HTMLCollectionOf<HTMLElement>;

    // Di chuyển slider
    const moveSlider = (position: number) => {
      // Đảm bảo rằng không di chuyển quá phạm vi
      if (position < 0) {
        position = sliderItems.length - 1;
      } else if (position >= sliderItems.length) {
        position = 0;
      }

      // Chuyển slider bằng cách dịch chuyển container mà không cần hiệu ứng
      sliderContainer.style.transform = `translateX(-${position * 100}%)`;
    };

    // Lắng nghe sự kiện cho nút Prev
    sliderPrevBtn?.addEventListener('click', () => {
      currentSlidePos--;
      moveSlider(currentSlidePos);
    });

    // Lắng nghe sự kiện cho nút Next
    sliderNextBtn?.addEventListener('click', () => {
      currentSlidePos++;
      moveSlider(currentSlidePos);
    });
  }
}
