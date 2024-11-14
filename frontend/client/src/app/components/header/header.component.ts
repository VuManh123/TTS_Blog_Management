import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, IonicModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
