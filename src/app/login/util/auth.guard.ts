import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const user = authenticationService.userValue;
      if (user) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
};
