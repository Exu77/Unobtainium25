import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationConstants } from './../../common/constants/authentication.constants';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError } from 'rxjs';
import { Todo } from '../../common/types/todo.type';
import { ErrorUtil } from '../util/error.util';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public allTodos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  constructor(
      private http: HttpClient,
    ) { }

  public getTodos():void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/todos/getAll`;
      this.http.get<Todo[]>(url)
          .subscribe(todoList => {
              this.allTodos$.next(todoList);
          },
          catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public saveTodo(aTodo: Todo): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/todos/`;
      this.http.post<Todo[]>(url, aTodo)
      .subscribe(todoList => {
          this.allTodos$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public deleteTodo(aTodo: Todo): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/todos/${aTodo.id}`;
      this.http.delete<Todo[]>(url)
      .subscribe(todoList => {
          this.allTodos$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }
}
