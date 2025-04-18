import { Component, signal, WritableSignal } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';

export interface BandMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  imageCopyRight?: string;
  bio: string;
}

@Component({
  selector: 'app-about-band',
  imports: [MatCard, MatCardModule],
  templateUrl: './about-band.component.html',
  styleUrl: './about-band.component.css',
})
export class AboutBandComponent {
  public bandMembers: WritableSignal<BandMember[]>;

  constructor() {
    this.bandMembers = signal([
      {
        id: 1,
        name: 'Simon Meier',
        role: 'Singer und Rhytmus-Gitarrist',
        imageUrl: 'assets/images/simon.jpg',

        bio: 'Simon ist der Sänger und Rhytmus-Gitarrist der Band.',
      },
      {
        id: 2,
        name: 'Christian Gloor',
        role: 'Lead-Gitarrist',
        imageUrl: 'assets/images/gloor.jpg',
        imageCopyRight: 'J.Konrad Photography',
        bio: 'Christian ist der Lead-Gitarrist der Band.',
      },
      {
        id: 3,
        name: 'Richard Clare',
        role: 'Schlagzeuger',
        imageUrl: 'https://example.com/simon.jpg',
        bio: 'Richi ist der Schlagzeuger der Band.',
      },
      {
        id: 4,
        name: 'Dieter Biedermann',
        role: 'Bassist',
        imageUrl: 'https://example.com/simon.jpg',
        bio: 'Dieter ist der Bassist der Band.',
      },
    ]);
  }
}
