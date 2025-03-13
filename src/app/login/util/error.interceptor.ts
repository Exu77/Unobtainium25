import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  return next(req).pipe(catchError(err => {
    if (err.status === 401) {
        // auto logout if 401 response returned from api
        authenticationService.logout();
    }

    const error = err.error.message || err.statusText;
    return throwError(() => error);
}));;
};
