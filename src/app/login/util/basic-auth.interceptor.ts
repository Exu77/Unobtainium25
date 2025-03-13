import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthenticationConstants } from '../../../common/constants/authentication.constants';

export const basicAuthInterceptor: HttpInterceptorFn = (request, next) => {
  // add header with basic auth credentials if user is logged in and request is to the api url
  const authenticationService = inject(AuthenticationService);
  const user = authenticationService.userValue;
  const isLoggedIn = !!(user && user.authdata);
  const isApiUrl = request.url.startsWith(AuthenticationConstants.URL_API_OPEN);
  if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: { 
              Authorization: `Basic ${user?.authdata}`
          }
      });
  }
  return next(request);
};
