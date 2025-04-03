import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SongFolder } from '../../common/types/song.type';
import { combineLatest, combineLatestWith, map, Subscription } from 'rxjs';
import { SongListService } from './song-list.service';
import { Todo } from '../../common/types/todo.type';
import { TodoService } from '../todo/todo.service';
import { SongLevelService } from '../song-level/song-level.service';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { SongComponent } from '../song/song.component';
import { SongLevelComponent } from '../song-level/song-level.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-song-list',
  imports: [
    MatProgressSpinnerModule,
    SongComponent,
    CommonModule,
    SongLevelComponent,
    MatBadgeModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements OnInit{
  public filteredSongs: WritableSignal<SongFolder[]> = signal([]);
  public isLoading = signal(true);

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public todoMap: WritableSignal<Map<string, number>> = signal(new Map());
  public searchTerm = signal('');
  private allSongs: WritableSignal<SongFolder[]> = signal([]);

  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService
  ) {
  }
  ngOnInit(): void {
    combineLatest([
      this.songFolderService.songFolderIsLoading$,
      this.songLevelService.allSongLevelsIsLoading$,
    ])
      .pipe(
        map((arr) => {
          let result = false;
          arr.forEach((value) => {
            if (value) {
              result = true;
            }
          });
          return result;
        })
      )
      .subscribe((value) => this.isLoading.set(value));
     const songSubscription = this.songFolderService.songFolderList$.subscribe(
      (songFolders) => {
        this.allSongs.set(songFolders);
        this.filterSongs();
      }
    );

    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();

    this.todoService.allTodos$.subscribe((todos: Todo[]) => {
      const newTodoMap = new Map<string, number>();
      todos.forEach((aTodo) => {
        if (aTodo?.song?.id) {
          const aCount = (newTodoMap.get(aTodo.song.id) ?? 0) + 1;
          newTodoMap.set(aTodo.song.id, aCount);
        }
      });
      this.todoMap.set(newTodoMap);
    });

    this.songFolderService.getRootFolder().subscribe((rootFolder) => {});
  }

  public filterSongs() {
    const searchKeys = this.searchTerm().toLowerCase().split(' ');
    this.filteredSongs.set(
      this.allSongs().filter((aSongFolder) => {
        for (const aSearchKey of searchKeys) {
          if (aSongFolder.name.toLowerCase().indexOf(aSearchKey) === -1) {
            return false;
          }
        }
        return true;
      })
    );
  }
}
