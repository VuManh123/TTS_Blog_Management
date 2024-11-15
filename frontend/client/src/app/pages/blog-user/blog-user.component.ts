import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from '../../components/main/main.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-blog-user',
  standalone: true,
  imports: [HeaderComponent,MainComponent,FooterComponent,RouterLink],
  templateUrl: './blog-user.component.html',
  styleUrl: './blog-user.component.css'
})
export class BlogUserComponent {

}
