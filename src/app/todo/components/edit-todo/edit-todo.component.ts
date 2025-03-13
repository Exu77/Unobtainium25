import { Component, inject, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, SongFolder } from '../../../../common/types/song.type';
import { BAND_MEMBERS, COMPARE_BAND_MEMBERS } from '../../../../common/constants/band-members.constant';
import { Todo } from '../../../../common/types/todo.type';
import { SongListService } from '../../../song-list/song-list.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBandMember } from '../../../../common/types/member.type';
import { MatButtonModule } from '@angular/material/button';





@Component({
  selector: 'app-edit-todo',
  imports: [ReactiveFormsModule
    , MatFormFieldModule
    , MatInputModule
    , FormsModule
    , MatButtonModule
    , MatSelectModule
    , MatChipsModule
    , CommonModule
    , MatDialogModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit{
  public songFolders$: Observable<SongFolder[]>;
  public bandMemberComperator = COMPARE_BAND_MEMBERS;
  public bandMembers = BAND_MEMBERS;
  public readonly aTodo: Todo = inject<Todo>(MAT_DIALOG_DATA);

  public readonly fcSong = 'song';
  public readonly fcDescription = 'description';
  public readonly fcResponsible = 'responsibles';

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTodoComponent>,
    private readonly songListService: SongListService,
  ) {
    this.form = new FormGroup({});
    this.form.addControl(this.fcSong,  new FormControl<SongFolder | null | undefined>(null));
    this.form.addControl(this.fcDescription,  new FormControl<string | null | undefined>('', Validators.required));
    this.form.addControl(this.fcResponsible,  new FormControl<IBandMember[] | null | undefined>([]));

    this.songFolders$ = this.songListService.songFolderList$;
  };

  ngOnInit(): void {
    console.log('init', this.aTodo);
    this.form.get(this.fcSong)?.setValue(this.aTodo.song);
    this.form.get(this.fcDescription)?.setValue(this.aTodo.description);
    this.form.get(this.fcResponsible)?.setValue(this.aTodo.responsibles ?? []);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  public compareSongFolders(o1: SongFolder, o2: SongFolder): boolean {
    return o1.id === o2.id;
  }

  public submitForm() {
    const result: Todo = {
      id: this.aTodo.id,
      description: this.form.value[this.fcDescription],
      song: this.form.value[this.fcSong],
      responsibles: this.form.value[this.fcResponsible]
    }
    this.dialogRef.close(result);
  }

}
