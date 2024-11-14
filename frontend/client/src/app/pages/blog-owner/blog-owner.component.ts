import { Component } from '@angular/core';
import { HeaderOwnerComponent } from '../../components/header-owner/header-owner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-blog-owner',
  standalone: true,
  imports: [ HeaderOwnerComponent ,FooterComponent, MainComponent, RouterLink],
  templateUrl: './blog-owner.component.html',
  styleUrl: './blog-owner.component.css'
})
export class BlogOwnerComponent {

}