import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MainBlogDetailComponent } from '../../components/main-blog-detail/main-blog-detail.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [HeaderComponent,FooterComponent ,CommonModule, MainBlogDetailComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {

}
