import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { Song, SongFolder } from '../../common/types/song.type';
import { SongListService } from '../song-list/song-list.service';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { SongLinkComponent } from '../song-link/song-link.component';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-song',
  imports: [CommonModule, TodoComponent, SongLinkComponent, MatProgressSpinnerModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent  implements OnInit {
  public songFolder = input.required<SongFolder>();
  public song: WritableSignal<Song | null> = signal(null);

  public isLoading = signal(true);

  constructor(private songService: SongListService) { } 

  ngOnInit() {
    this.songService.getSong(this.songFolder().name).subscribe(aSong => {
      this.song.set(aSong);
      this.isLoading.set(false);
    });
}
}
