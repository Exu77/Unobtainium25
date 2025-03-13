import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../../common/types/user.type';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthenticationConstants } from './../../../common/constants/authentication.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      const storageUser = localStorage.getItem('user');
      this.userSubject = new BehaviorSubject<User | null>(null);
      if (storageUser) {
          this.userSubject.next(JSON.parse(storageUser));
      }
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
      return this.userSubject?.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/${AuthenticationConstants.URL_API_OPEN}/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/']);
  }
}
