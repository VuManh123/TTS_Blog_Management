import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from '../../components/main/main.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blog-user',
  standalone: true,
  imports: [HeaderComponent,MainComponent,FooterComponent,CommonModule],
  templateUrl: './blog-user.component.html',
  styleUrl: './blog-user.component.css'
})
export class BlogUserComponent {

}
