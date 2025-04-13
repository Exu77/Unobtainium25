import { Component, HostListener, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
declare var FB: any;
@Component({
  selector: 'app-main-page',
  imports: [MatCardModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
    // needed for reload after navigation
    if (FB != null && FB?.XFBML != null) {
      FB?.XFBML?.parse();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 768; // Adjust breakpoint as needed
  }
}
