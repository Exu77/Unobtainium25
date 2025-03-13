import { Component, signal, WritableSignal } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SongFolder } from '../../common/types/song.type';
import { Subscription } from 'rxjs';
import { SongListService } from './song-list.service';
import { Todo } from '../../common/types/todo.type';
import { TodoService } from '../todo/todo.service';
import { SongLevelService } from '../song-level/song-level.service';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SongComponent } from '../song/song.component';
import { SongLevelComponent } from '../song-level/song-level.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-song-list',
  imports: [MatProgressSpinnerModule, SongComponent, CommonModule, SongLevelComponent, MatBadgeModule, MatExpansionModule, FormsModule, MatInputModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  public filteredSongs: WritableSignal<SongFolder[]> = signal([]);
  public isLoading = signal(true);

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;
  public todoCounter: any = {};
  public searchTerm = signal('');

  private songSubscription: Subscription;
  private allSongs:  WritableSignal<SongFolder[]> = signal([]);

  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService,

  ) {

    this.isLoading.set(true);
    this.songSubscription = this.songFolderService.songFolderList$.subscribe(songFolders => {
        this.allSongs.set(songFolders);
        this.filterSongs();
        this.isLoading.set(false);
      }
    );

    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();

    this.todoService.allTodos$.subscribe((todos: Todo[]) => {
        this.todoCounter = {};
        todos.forEach(aTodo => {
          if (aTodo?.song?.id) {
            const aCount: number | undefined = this.todoCounter[aTodo.song.id];
            if (aCount) {
              this.todoCounter[aTodo.song.id] = aCount + 1;
            } else {
              this.todoCounter[aTodo.song.id] = 1;
            }
          }
        });
      });

      this.songFolderService.getRootFolder().subscribe(rootFolder => {})
  }

  public filterSongs() {
    const searchKeys = this.searchTerm().toLowerCase().split(' ');
    this.filteredSongs.set(this.allSongs().filter(aSongFolder => {
      for (const aSearchKey of searchKeys) {
        if (aSongFolder.name.toLowerCase().indexOf(aSearchKey) === -1) {
          return false;
        }
      }
      return true;
    }));
  }
}
