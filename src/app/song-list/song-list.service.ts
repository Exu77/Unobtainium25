import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Song, SongFolder } from '../../common/types/song.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationConstants } from '../../common/constants/authentication.constants';
import { ErrorUtil } from '../util/error.util';

@Injectable({
  providedIn: 'root'
})
export class SongListService {

  public readonly songFolderList$: BehaviorSubject<SongFolder[]> = new BehaviorSubject<SongFolder[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getFilecontentUrl(fileId: string): string {
    return `${environment.apiUrl}/${AuthenticationConstants.URL_API_OPEN}/googleDrive/fileContent?id=${fileId}`;
  }

  getFileContent(fileId: string): Observable<any> {
    return this.http.get<any[]>(this.getFilecontentUrl(fileId));
  }

  public getSong(songName: string): Observable<Song> {
    return this.http.get<Song>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/song?name=${songName}`)
    .pipe(
      tap(song => {}),
      catchError(ErrorUtil.handleError<Song>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/song`))
    );
  }

  public getRootFolder(): Observable<Song> {
    return this.http.get<Song>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/rootFolder`)
    .pipe(
      tap(song => {}),
      catchError(ErrorUtil.handleError<Song>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/song`))
    );
  }
  
  

  public getSongFolders(): void {
    this.http.get<any[]>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/songFolders`)
    .subscribe(files => {
        this.songFolderList$.next(files);
      },
      catchError(ErrorUtil.handleError<any[]>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/googleDrive/songFolders`, []))
    );
  }
}
