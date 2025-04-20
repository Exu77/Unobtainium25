import { Component, HostListener, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SafePipe } from '../pipes/safe.pipe';
declare var FB: any;
@Component({
  selector: 'app-main-page',
  imports: [MatCardModule, SafePipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  public isSmallScreen = false;
  public latestYoutubeLink = signal(
    'https://www.youtube.com/embed/xa4d1rao8GQ?si=WifFDe7udqQz7D0J',
  );

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
