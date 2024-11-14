import { Routes } from '@angular/router';
import { BlogOwnerComponent } from './pages/blog-owner/blog-owner.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';

export const routes: Routes = [
    { path: '', component: BlogOwnerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: BlogUserComponent },

];
