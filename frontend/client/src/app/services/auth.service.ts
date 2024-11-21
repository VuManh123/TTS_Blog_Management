import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, { username, password }).pipe(
            tap((response: any) => {
                console.log('Token nhận được:', response.token); // Debug token
                localStorage.setItem('token', response.token); // Lưu token
                localStorage.setItem('username', response.username);
            }),
            catchError(error => {
                console.error('Login error', error);
                return throwError(error);
            })
        );
    }
    getUserProfile(): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            return throwError('Không có token');
        }

        return this.http.get('http://localhost:3000/api/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            catchError(err => {
                console.error('Lỗi lấy thông tin profile:', err);
                return throwError(err);
            })
        );
    }


    isLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // Kiểm tra token
    }

    logout(): void {
        localStorage.removeItem('token'); // Xóa token
    }

    register(
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        avatar_url: string
    ): Observable<any> {
        const userData = { username, first_name, last_name, email, password, avatar_url };
        return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
            tap((response: any) => {
                console.log('Đăng ký thành công:', response);
            }),
            catchError((error) => {
                console.error('Register error', error);
                return throwError(error);
            })
        );
    }
}

