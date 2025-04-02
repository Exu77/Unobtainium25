import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SongLevel } from '../../common/types/song-level.type';
import { AuthenticationConstants } from '../../common/constants/authentication.constants';
import { ErrorUtil } from '../util/error.util';

@Injectable({
  providedIn: 'root',
})
export class SongLevelService {
  public readonly allSongLevelsIsLoading$ = new BehaviorSubject<boolean>(false);
  public allSongLevels$ = new BehaviorSubject<SongLevel[]>([]);
  constructor(private http: HttpClient) {}

  public getAll(): void {
    this.allSongLevelsIsLoading$.next(true);
    const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/getAll`;
    this.http.get<SongLevel[]>(url).subscribe({
      next: (todoList) => {
        this.allSongLevels$.next(todoList);
        this.allSongLevelsIsLoading$.next(false);
      },
      error: () => {
        ErrorUtil.handleError<any>(url, null);
        this.allSongLevelsIsLoading$.next(false);
      },
    });
  }

  public save(aObj: SongLevel): void {
    this.allSongLevelsIsLoading$.next(true);
    const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/`;
    this.http.post<SongLevel[]>(url, aObj).subscribe({
      next: (todoList) => {
        this.allSongLevels$.next(todoList);
        this.allSongLevelsIsLoading$.next(false);
      },
      error: () => {
        ErrorUtil.handleError<any>(url, null);
        this.allSongLevelsIsLoading$.next(false);
      },
    });
  }

  public delete(aObj: SongLevel): void {
    this.allSongLevelsIsLoading$.next(true);
    const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/${aObj.id}`;
    this.http.delete<SongLevel[]>(url).subscribe({
      next: (todoList) => {
        this.allSongLevels$.next(todoList);
        this.allSongLevelsIsLoading$.next(false);
      },
      error: () => {
        ErrorUtil.handleError<any>(url, null);
        this.allSongLevelsIsLoading$.next(false);
      },
    });
  }
}
