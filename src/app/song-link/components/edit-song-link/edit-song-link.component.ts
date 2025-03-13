import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SongFolder } from '../../../../common/types/song.type';
import { SongListService } from '../../../song-list/song-list.service';
import { SongLink } from '../../../../common/types/song-link.type';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-song-link',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatChipsModule, CommonModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-song-link.component.html',
  styleUrl: './edit-song-link.component.scss'
})
export class EditSongLinkComponent implements OnInit {
  public songFolders$: Observable<SongFolder[]>;

  public readonly fcSong = 'song';
  public readonly fcLink = 'link';
  public readonly fcName = 'name';

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSongLinkComponent>,
    private readonly songListService: SongListService,
    @Inject(MAT_DIALOG_DATA) public aLink: SongLink
  ) { 
    this.form = new FormGroup({});
        this.form.addControl(this.fcSong,  new FormControl<SongFolder | null | undefined>(null, Validators.required));
        this.form.addControl(this.fcName,  new FormControl<string | null | undefined>(null, Validators.required));
        this.form.addControl(this.fcLink,  new FormControl<string[] | null | undefined>(null, Validators.required));

    this.songFolders$ = this.songListService.songFolderList$;
  }

  ngOnInit(): void {
    this.form.get(this.fcSong)?.setValue(this.aLink.song);
    this.form.get(this.fcName)?.setValue(this.aLink.name);
    this.form.get(this.fcLink)?.setValue(this.aLink.link ?? []);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  public compareSongFolders(o1: SongFolder, o2: SongFolder): boolean {
    return o1.id === o2.id;
  }
  
  public submitForm() {
      const result: SongLink = {
        id: this.aLink.id,
        name: this.form.value[this.fcName],
        song: this.form.value[this.fcSong],
        link: this.form.value[this.fcLink],
      }
      this.dialogRef.close(result);
    }
}
