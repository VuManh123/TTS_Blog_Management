import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-owner',
  standalone: true,
  imports: [IonicModule ,RouterLink],
  templateUrl: './header-owner.component.html',
  styleUrl: './header-owner.component.css',

})
export class HeaderOwnerComponent {

}
