import { Component } from '@angular/core';
import { HeaderOwnerComponent } from '../../components/header-owner/header-owner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchBlogComponent } from '../../components/search-blog/search-blog.component';

@Component({
  selector: 'app-search-blog',
  standalone: true,
  imports: [HeaderOwnerComponent, FooterComponent,SearchBlogComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
