import { Component, input, OnInit, signal } from '@angular/core';
import { Song, SongFolder } from '../../common/types/song.type';
import { SongListService } from '../song-list/song-list.service';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { SongLinkComponent } from '../song-link/song-link.component';

@Component({
  selector: 'app-song',
  imports: [CommonModule, TodoComponent, SongLinkComponent],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent  implements OnInit {
  public songFolder = input.required<SongFolder>();
  public song: Song | null = null;

  constructor(private songService: SongListService) { } 

  ngOnInit() {
    this.songService.getSong(this.songFolder().name).subscribe(aSong => {
      this.song = aSong;
    });
}
}
