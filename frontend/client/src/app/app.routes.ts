import { Routes } from '@angular/router';
import { BlogOwnerComponent } from './pages/blog-owner/blog-owner.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
export const routes: Routes = [
    { path: '', component: BlogOwnerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: BlogUserComponent },
    { path: 'categories/:id', component: CategoriesComponent },
    { path: 'blog-detail/:id', component: BlogDetailComponent },

];
