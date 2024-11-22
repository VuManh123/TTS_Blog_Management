import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = `${environment.apiUrl}/languages`; // Endpoint cho languages API

  constructor(private http: HttpClient) {}

  // Phương thức gọi API để lấy danh sách languages
  getLanguages(): Observable<any> {
    return this.http.get(this.apiUrl); // GET request tới http://localhost:3000/languages
  }
}
