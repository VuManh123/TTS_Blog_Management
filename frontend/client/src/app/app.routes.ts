import { Routes } from '@angular/router';
import { BlogOwnerComponent } from './pages/blog-owner/blog-owner.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { AuthGuard } from './services/auth.guard';
import { MyBlogComponent } from './pages/my-blog/my-blog.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewBlogComponent } from './pages/new-blog/new-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
export const routes: Routes = [
    { path: '', component: BlogOwnerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: BlogUserComponent, canActivate: [AuthGuard] },
    { path: 'categories/:id', component: CategoriesComponent ,canActivate: [AuthGuard]},
    { path: 'blog-detail/:id', component: BlogDetailComponent ,canActivate: [AuthGuard]},
    { path: 'my-blog', component: MyBlogComponent ,canActivate: [AuthGuard]},
    { path: 'new-blog', component: NewBlogComponent ,canActivate: [AuthGuard]},
    { path: 'edit-blog/:id', component: EditBlogComponent ,canActivate: [AuthGuard]},
];