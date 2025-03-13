import { Component, input, signal, WritableSignal } from '@angular/core';
import { SongFolder } from '../../common/types/song.type';
import { SongLevel } from '../../common/types/song-level.type';
import { SongLevelService } from './song-level.service';
import { Util } from '../util/util';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-level',
  imports: [MatDatepickerModule, MatInputModule, CommonModule],
  templateUrl: './song-level.component.html',
  styleUrl: './song-level.component.scss'
})
export class SongLevelComponent {
  public songFolder = input<SongFolder>();

  public currentSongLevel: WritableSignal<SongLevel> = signal({});
  public daysBetween: number = 999;

  constructor(private readonly songLevelService: SongLevelService) { 
    this.songLevelService.allTodos$.subscribe((songLevelList: SongLevel[]) => {
      const tempSl = songLevelList?.find(aSl => aSl?.song?.id === this.songFolder()?.id);
      if (tempSl) {
        this.currentSongLevel.set(tempSl);
      } else {
        this.currentSongLevel.set({
          song: this.songFolder(),
          proficiency: 0
        });
      }
      this.calculateLastPlayed();
    });
  }

  public updateProficiency(event: any, aProf: number): void {
    this.currentSongLevel.update(current => { 
      current.proficiency = aProf
      return current;
    }
    );
    this.songLevelService.save(this.currentSongLevel());
    event.stopPropagation();
  }

  public updateLastPlayedPicker(event: any) {
    this.updateDate(new Date(event.value).toDateString());
  }

  public updateLastPlayed(event: any): void {
    this.updateDate(new Date().toDateString());
    event.stopPropagation();
  }

  public openDatePicer(picker: any, event: any) {
    picker.open();
    event.stopPropagation();
  }

  private updateDate(dateString: string): void {
    this.currentSongLevel.update(current => { 
      current.playedLast = dateString
      return current;
    });
    this.songLevelService.save(this.currentSongLevel());
  }

  private calculateLastPlayed() {
    if (!this.currentSongLevel().playedLast) {
      this.daysBetween = 999;
    } else {
      this.daysBetween = Util.getDaysBetween(new Date(), new Date(Date.parse(this.currentSongLevel().playedLast!)));
    }


  }
}
