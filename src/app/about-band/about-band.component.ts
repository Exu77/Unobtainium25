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
  public bioWolfgang: WritableSignal<string>;
  constructor() {
    this.bandMembers = signal([
      {
        id: 1,
        name: 'Simon Meier',
        role: 'Singer und Rhytmus-Gitarrist',
        imageUrl: 'assets/images/simon.jpg',

        bio:
          '<a href="https://www.simonmeier.li">Simon</a> ist der Sänger und Rhytmus-Gitarrist der Band. Er schreibt eigene Songs, in welchen er eigene Erfahrungen verarbeitet. Zusammen mit der Band ' +
          'arbeitet er an den Arrangements und er Produktion der Songs. Beruflich programmiert er Software. Er ist verheiratet und Vater eines Sohnes.  ',
      },
      {
        id: 2,
        name: 'Christian Gloor',
        role: 'Lead-Gitarrist',
        imageUrl: 'assets/images/gloor.jpg',
        imageCopyRight: 'J.Konrad Photography',
        bio:
          'Christian ist der Lead-Gitarrist der Band. Er bereichert die Band mit seinen kreativen Ideen auf der Gitarre, seinen Solis und seinem Background-Gesang. ' +
          ' Solo ist er als <a href="https://www.youtube.com/@notacockroach1633">NotACockRoach</a> auf Youtube zu sehen. Auch er ist professioineller Software-Entwickler. Falls er privat nicht am Musizieren oder Sport machen ist, reist er gerne nach Amerika, um mit seiner Freundin dort die Zeit zu geniessen.',
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
          'Dieter der Bassist, spielte zuerst Akkordeon in der Band. Er wechselte dann auf ein elektrisches Akkorden mit Synthesizer Sounds und begann dann Bass zu lernen. Auch er ist beruflich ' +
          'Software-Entwickler, verheiratet und Vater von drei Kindern.',
      },
    ]);
    this.bioWolfgang = signal(
      '<a href="http://www.wolfgangvetsch.li">Wolfgang Vetsch</a> ist unser Band-Coach. Er ist ein bekannter liechtensteinischer Musiker, Komponist, Gitarren-Lehrer und Ensemblen-Coach ' +
        'der <a href="https://www.musikschule.li/team/wolfgang-vetsch">liechtensteinischen Musikschule</a>. Er spielt in diversen Bands wie z.B. <a href="https://www.mundart.li">Rääs</a>, <a href="https://www.theroyalfunkforce.com/">Royal Funk Force</a> und seiner eigenen Band <a href="https://www.wolfgangvetsch.li/bluewater-2/">Blue Water</a>. ' +
        '2022 releaste er sein Album <a href="https://open.spotify.com/intl-de/album/352wUD57Fofin9Uy3EGs2R">"Rewired"</a>. Seit einigen Jahren unterstützt er uns mit seinem musikalischen Können, seinem Wissen und Ideen.',
    );
  }
}
