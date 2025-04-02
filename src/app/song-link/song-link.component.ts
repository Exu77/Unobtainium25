import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SongFolder } from '../../common/types/song.type';
import { SongLink } from '../../common/types/song-link.type';
import { SongLinkService } from './song-link.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSongLinkComponent } from './components/edit-song-link/edit-song-link.component';
import { DeleteSongLinkComponent } from './components/delete-song-link/delete-song-link.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-song-link',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './song-link.component.html',
  styleUrl: './song-link.component.scss',
})
export class SongLinkComponent implements OnInit {
  public songFolder = input.required<SongFolder>();
  public showData = signal(true);
  public displayedColumns: string[] = ['song', 'descr', 'actions'];
  public filteredLinks: WritableSignal<SongLink[]> = signal([]);
  public mouseOverEnabled4Ctrl = signal(true);

  private allLinks: WritableSignal<SongLink[]> = signal([]);
  constructor(
    private readonly songLinkService: SongLinkService,
    public dialog: MatDialog
  ) {
    this.songLinkService.getAllLinks();
  }

  ngOnInit(): void {
    this.songLinkService.allUltimateGuitarLinks$.subscribe(
      (inputLinkList: SongLink[]) => {
        this.allLinks.set(inputLinkList);
        this.filterLinks();
        this.showData.set(this.filteredLinks().length > 0);
      }
    );
  }

  public openEditDialog(aLink: SongLink, event: any): void {
    const dialogRef = this.dialog.open(EditSongLinkComponent, {
      width: '80%',
      data: aLink,
    });

    dialogRef.afterClosed().subscribe((result: SongLink) => {
      if (result) {
        this.songLinkService.saveLink(result);
      }
    });

    event.stopPropagation();
  }

  public openDeletetDialog(aLink: SongLink, event: any): void {
    const dialogRef = this.dialog.open(DeleteSongLinkComponent, {
      width: '80%',
      data: aLink,
    });

    dialogRef.afterClosed().subscribe((result: SongLink) => {
      if (result) {
        this.songLinkService.deleteLink(result);
      }
    });
    event.stopPropagation();
  }

  public openLink(aUrl: string | null | undefined): void {
    if (!aUrl) {
      return;
    }
    window.open(aUrl, '_blank');
  }

  private filterLinks() {
    this.filteredLinks.set(
      this.allLinks().filter((aLink) => {
        if (this.songFolder() && aLink.song?.id !== this.songFolder()?.id) {
          return false;
        }
        return true;
      })
    );
  }
}
