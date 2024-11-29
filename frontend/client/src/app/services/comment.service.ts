import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  content: string;
  created_at: string;
  blog_id: number;
  user: {
    name: string;
    profileImage: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments'; // URL API

  constructor(private http: HttpClient) {}

  // Hàm lấy tất cả comments từ API
  getComments(): Observable<{ success: boolean; data: Comment[]; status: number; message: string }> {
    return this.http.get<{ success: boolean; data: Comment[]; status: number; message: string }>(this.apiUrl);
  }
}
