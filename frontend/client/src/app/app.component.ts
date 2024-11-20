import { Component } from '@angular/core';
import {RouterModule } from '@angular/router';
import { BlogOwnerComponent } from './pages/blog-owner/blog-owner.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';
import { MainCategoryComponent } from './components/main-category/main-category.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterModule, BlogDetailComponent,MainCategoryComponent,CategoriesComponent ,BlogOwnerComponent, LoginComponent ,MainComponent, FooterComponent ,HeaderComponent ,BlogUserComponent],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  title = 'frontend';

}
