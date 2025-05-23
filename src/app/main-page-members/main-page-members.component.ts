import { Component, signal, WritableSignal } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { TodoComponent } from '../todo/todo.component';
import { ThemePalette } from '@angular/material/core';
import { SongFile } from '../../common/types/song.type';
import { TodoService } from '../todo/todo.service';
import { SongListService } from '../song-list/song-list.service';
import { SongLevelService } from '../song-level/song-level.service';
import { combineLatest, combineLatestWith, map } from 'rxjs';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-main-page-members',
  imports: [SongListComponent, TodoComponent, MatProgressSpinnerModule],
  templateUrl: './main-page-members.component.html',
  styleUrl: './main-page-members.component.scss',
})
export class MainPageMembersComponent {
  public color: ThemePalette = 'primary';
  public isLoading = signal(true);
  private todoIsLoading = true;
  private songFolderIsLoading = true;
  private songLevelIsLoading = true;

  public helpFile: WritableSignal<SongFile | undefined> = signal(undefined);

  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService
  ) {
    this.songFolderService.getRootFolder().subscribe((rootFolder) => {
      this.helpFile.set(
        rootFolder.chordSheets?.find(
          (aChordsheet) => (aChordsheet.name = 'Help Page')
        )
      );
    });
  }

  public reload() {
    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();
  }
}
