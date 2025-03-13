import { Component } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { TodoComponent } from '../todo/todo.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SongFile } from '../../common/types/song.type';
import { TodoService } from '../todo/todo.service';
import { SongListService } from '../song-list/song-list.service';
import { SongLevelService } from '../song-level/song-level.service';

@Component({
  selector: 'app-main-page-members',
  imports: [SongListComponent, TodoComponent],
  templateUrl: './main-page-members.component.html',
  styleUrl: './main-page-members.component.scss'
})
export class MainPageMembersComponent {
  public isLoading = false;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;

  public helpFile?: SongFile;

  
  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService,

  ) {
    this.songFolderService.getRootFolder().subscribe(rootFolder => {
      this.helpFile =  rootFolder.chordSheets?.find(aChordsheet => aChordsheet.name = 'Help Page')

    });
  }

  public reload() {
    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();
  }
}
