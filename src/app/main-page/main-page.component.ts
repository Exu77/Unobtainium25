import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
declare var FB: any;
@Component({
  selector: 'app-main-page',
  imports: [MatCardModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  ngOnInit(): void {
    // needed for reload after navigation
    if (FB != null && FB?.XFBML != null) {
      FB?.XFBML?.parse();
    }
  }
}
