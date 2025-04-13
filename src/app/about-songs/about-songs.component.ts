import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export interface Song {
  id: number;
  title: string;
  description: string;
  year?: number;
  duration?: number; // in seconds
  lyrics?: string;
}

@Component({
  selector: 'app-about-songs',
  imports: [MatCardModule],
  templateUrl: './about-songs.component.html',
  styleUrl: './about-songs.component.css',
})
export class AboutSongsComponent {
  public songs: WritableSignal<Song[]>;

  constructor() {
    this.songs = signal([
      {
        id: 1,
        title: 'Purpose of my Heart',
        year: undefined,
        duration: undefined,
        description:
          'Der Titel "Purpose of my Heart" handelt über den Sinn innerhalb einer noch nicht fixen Beziehung.',
      },
      {
        id: 2,
        title: 'Gone',
        description: '"Gone" handelt von einer verflossenen Liebe.',
      },
      {
        id: 3,
        title: 'Listen',
        description:
          'In "Listen" geht es darum, dass man seiner inneren Stimme folgen sollte.',
      },
    ]);
  }
}
