import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppUtilService } from '../../app-util.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor(private appUtilService: AppUtilService) {}

  ngAfterViewInit(): void {
    const navbar = document.querySelector('[data-navbar]') as HTMLElement;
    const navTogglers = document.querySelectorAll('[data-nav-toggler]') as NodeListOf<HTMLElement>;

    // Thêm sự kiện cho các nút navbar
    navTogglers.forEach(toggler => {
      toggler.addEventListener('click', () => {
        // Toggling class active để mở/đóng menu
        navbar.classList.toggle('active');
        document.body.classList.toggle('nav-active');
      });
    });
  }
}
