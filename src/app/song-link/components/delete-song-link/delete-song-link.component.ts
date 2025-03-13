import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SongLink } from '../../../../common/types/song-link.type';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-song-link',
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, CommonModule],
  templateUrl: './delete-song-link.component.html',
  styleUrl: './delete-song-link.component.scss'
})
export class DeleteSongLinkComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSongLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public aTodo: SongLink,
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
