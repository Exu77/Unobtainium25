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

        bio:
          'Simon ist der Sänger und Rhytmus-Gitarrist der Band. Er schreibt eigene Songs, in welchen er eigene Erfahrungen verarbeitet. Zusammen mit der Band ' +
          'arbeitet er an den Arrangements und er Produktion der Songs. Beruflich programmiert er Software. Er ist verheiratet und Vater eines Sohnes.  ',
      },
      {
        id: 2,
        name: 'Christian Gloor',
        role: 'Lead-Gitarrist',
        imageUrl: 'assets/images/gloor.jpg',
        imageCopyRight: 'J.Konrad Photography',
        bio:
          'Christian ist der Lead-Gitarrist der Band. Er bereichert die Band mit seinen kreativen Ideen auf der Gitarre, seinen Solis und seinem Background-Gesangt. ' +
          ' Solo ist er als NotACockRoach auf Youtube zu sehen. Auch er ist professioineller Software-Entwickler. Falls er privat nicht am Musizieren oder Sport machen ist, reist er gerne nach Amerika, um mit seiner Freundin dort die Zeit zu geniessen.',
      },
      {
        id: 3,
        name: 'Richard Clare',
        role: 'Schlagzeuger',
        imageUrl: '',
        bio:
          'Richi ist der Schlagzeuger der Band. Sein Taktgefühl während dem Musizieren und neben dem Schlagzeug, plus seine musikalische Begabung machen ihn zu einem wertvollen Mitglied der Band. ' +
          'Er kann nicht nur impulsiv und laut, sondern eben auch gefühlvoll und angepasst spielen. Richi ist Jurist, verheiratet und Vater zweier Töchter.',
      },
      {
        id: 4,
        name: 'Dieter Biedermann',
        role: 'Bassist',
        imageUrl: '',
        bio:
          'Dieter der Bassist, spielte zuerst Handorgel in der Band. Er wechselte dann auf eine elektrische Handorgel mit Synthesizer Sounds und begann dann Bass zu lernen. Auch er ist beruflich ' +
          'Software-Entwickler, verheiratet und Vater von drei Kindern.',
      },
    ]);
  }
}
