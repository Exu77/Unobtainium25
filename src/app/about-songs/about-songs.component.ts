import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SafePipe } from '../pipes/safe.pipe';

export interface Song {
  id: number;
  title: string;
  description: string;
  year?: number;
  duration?: number; // in seconds
  lyrics?: string;
  youtubeLink?: string;
}

@Component({
  selector: 'app-about-songs',
  imports: [MatCardModule, SafePipe],
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
          'Der Titel "Purpose of my Heart" handelt über den Sinn einer noch nicht fixen Beziehung.' +
          ' "Not sure I understand the purpose of my heart" wird im Lied gesungen und soll zum Ausdruck bringen, dass es noch nicht klar ist,' +
          ' welchen Zweck das eigene Herz verfolgt. Manchmal gehen die Gefühle nach oben, mal nach unten. Manchmal weiss man nicht, wie man sein' +
          ' Gesicht wahren kann, manchmal scheint das Herz verklemmt zu sein. Oft sind wir uns nicht sicher, was wir wollen, manchmal warten wir' +
          ' und treffen dann endlich eine Entscheidung. Das Lied wurde im Tonstudio <a href="https://www.littlebigbeat.com/"><u>Little Big Beat</u></a> in Eschen aufgenommen und von <a href="https://www.instagram.com/fl.gatsby/"><u>Noah Ospelt</u></a> produziert.' +
          ' Das Arrangement stammt von <a href="http://wolfgangvetsch.li"><u>Wolfgang Vetsch</u></a> und <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>. Markant sind die Pausen der Instrumente im Refrain, eine Idee von Wolfgang.' +
          ' Geschrieben von und Copyright: <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>.',
        youtubeLink:
          'https://www.youtube.com/embed/UR-cxI8jZtM?si=KdiDq0IN0SCezocO&amp;start=35',
      },
      {
        id: 2,
        title: 'Gone',
        description:
          '"Gone" handelt von einer verflossenen Liebe. Das Lied ist 2014 nach einer heftigen Zeit der Trauer und Depression entstanden.' +
          ' Es ist ein sehr persönliches Lied, das die Trauer und den Schmerz über den Verlust einer geliebten Frau beschreibt. "Im Nachhinein' +
          ' war es für mich ein sehr wichtiges Lied, um die Trauer zu verarbeiten. Ich bin dankbar, dass ich es schreiben konnte und es mit meiner Band spielen darf.' +
          ' Ich bin sehr dankbar, mit jener Frau aus Luzern für eine wichtige Zeit in meinem Leben zusammen gewesen sein zu dürfen und dass sie mir verziehen hat.' +
          ' Ich bin mir sicher, dass es ihr gut geht und sie glücklich ist.' +
          ' Sehr dankbar bin ich, dass ich meine Frau gefunden habe, die mir alles bedeutet, die ich über alles Liebe und mir unseren tollen Sohn geschenkt hat.' +
          ' Sie hat viel Verständnis für dieses Lied aufgebracht und gar für die Produktion beigetragen. Danke Dir mein Schatz. Vielleicht kann ich mit diesem Lied auch anderen Menschen etwas helfen, die ebenfalls mal eine schwere Zeit durchleben mussten", ' +
          ' schreibt Simon.' +
          ' Das Lied wurde im <a href="https://www.sae.edu/che/"><u>SAE Institute Zürich</u></a> in Zürich aufgenommen und auch von <a href="https://www.instagram.com/fl.gatsby/"><u>Noah Ospelt</u></a> produziert.' +
          ' Geschrieben von und Copyright: <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>.',
        youtubeLink:
          'https://www.youtube.com/embed/Ui3b1SZIBaM?si=Qt1L4CQYv0ihs1qR&amp;start=44',
      },
      {
        id: 3,
        title: '300 Johr',
        description:
          '"300 Johr" ist das von uns geschriebene Lied für das 300 Jahr Jubiläum des Fürstentum Liechtensteins.' +
          ' Es greift das Thema Jubiläum auf und besingt in frischer und lustiger Art und Weise, dass wir zufrieden und stolz auf uns sein können.' +
          ' Der Refrain lädt zum Mitsingen ein und bleibt einem im Ohr: „Es isch a Gschenk, 300 Johr gids üs und viel meh söllens no si...“.' +
          ' Es war uns wichtig, ein Lied zu kreieren, das Jung und Alt mitsingen kann und das eine freudige Stimmung verbreitet. Wir wollen sagen, dass wir glücklich sein können, mit dem, was wir mit unserem Land haben.' +
          ' In Mauren wird gestohlen und in Balzers bläst der „Pföh“, heisst es in einer der drei Strophen des Liedes, welche auf die eine oder andere lustige „Gegebenheit“ des Landes eingehen.' +
          ' Wir haben das Lied 2018 geschrieben und es an dem offiziellen Kontest für den "Liechtenstein Song" der Jubiläumsfeier Liechtensteins von <a href="https://www.liechtenstein-marketing.li/"><u>Liechtenstein Marketing</u></a> eingereicht.' +
          ' Schlussendlich hat Rahel Oehri-Malin mit ihrem <a href="https://youtu.be/qMEDFDOhP-I?si=6lx6xMalm757XkeC"><u>Do khör i hi</u></a> gewonnen, worauf wir herzlich gratuliert haben. Wir hoffen, dass auch unser Lied den Leuten Spass macht,' +
          ' Spass beim Hören und beim Mitsingen zur Melodie.' +
          ' Das Lied wurde im Homestudio von Christian Gloor aufgenommen und auch von ihm abgemischt.' +
          ' Geschrieben von und Copyright: <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>.',
        youtubeLink:
          'https://www.youtube.com/embed/dSLL2VR7mJo?si=evlMb_yKCFqo4Brg&amp;start=28',
      },
      {
        id: 3,
        title: 'Right There In Your Heart',
        description:
          'Dies ist eines unserer ältesten Lieder. Es ist ein Liebeslied, in dem davon gesungen wird, dass es einfach schön ist, wenn eine bestimmte Person in der Nähe ist' +
          " und dass man gerne im Herzen der anderen Person wäre: ''I\'ll be right, I'll be right, I'll be right there in your heart''." +
          ' Das Lied wurde im Studio der <a href="https://www.musikschule.li/"><u>Liechtensteinischen Musikschule</u></a> in Eschen aufgenommen und von <a href="https://stefanfrommelt.li/"><u>Stefan Frommelt</u></a> produziert.' +
          ' Geschrieben von und Copyright: <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>.',
        youtubeLink:
          'https://youtube.com/embed/H7Rthh3LYxE?si=XOG4M4y77AmH79Y4',
      },
      {
        id: 4,
        title: 'Listen',
        description:
          'In "Listen" geht es darum, dass man seiner inneren Stimme folgen sollte. ' +
          ' Der Refrain besingt: "Way, way to go, you should have listened, just listened...  Hey why did you go, didn’t listen, I will listen".' +
          ' Manchmal gibt es Situationen, in denen man nicht richtig zuhört und dann leider die Konsequenzen zu tragen hat. Das Lied' +
          ' ist ein Aufruf. Mit rockigem Sound und eingängigem Refrain, der zum Mitsingen einlädt.' +
          ' Die Aufnahme stammt vom Event "Bring on the Night 2017", welcher von <a href="https://stefanfrommelt.li/"><u>Stefan Frommelt</u></a> organisiert wurde.' +
          ' Aufgenommen wurde via Kamera von Christian Gloor.' +
          ' Geschrieben von und Copyright: <a href="https://simonmeier.li/about-me/music/"><u>Simon Meier</u></a>.',
        youtubeLink:
          'https://www.youtube.com/embed/LxImfwtWbmE?si=bDmI3bJ4e9uYw8hZ&amp;start=51',
      },
    ]);
  }
}
