import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainCategoryComponent } from '../../components/main-category/main-category.component';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ HeaderComponent,FooterComponent,MainCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
