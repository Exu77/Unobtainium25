import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SongLevel } from '../../common/types/song-level.type';
import { AuthenticationConstants } from '../../common/constants/authentication.constants';
import { ErrorUtil } from '../util/error.util';

@Injectable({
  providedIn: 'root'
})
export class SongLevelService {

  public allTodos$: BehaviorSubject<SongLevel[]> = new BehaviorSubject<SongLevel[]>([]);
  constructor(
      private http: HttpClient,
    ) { }

  public getAll():void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/getAll`;
      this.http.get<SongLevel[]>(url)
          .subscribe(todoList => {
              this.allTodos$.next(todoList);
          },
          catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public save(aObj: SongLevel): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/`;
      this.http.post<SongLevel[]>(url, aObj)
      .subscribe(todoList => {
          this.allTodos$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public delete(aObj: SongLevel): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-level/${aObj.id}`;
      this.http.delete<SongLevel[]>(url)
      .subscribe(todoList => {
          this.allTodos$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }
}
