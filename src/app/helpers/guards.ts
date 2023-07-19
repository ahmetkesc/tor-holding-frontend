import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CommonService } from './services/common.service';

export class Guards {
  static guard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const _c_ = inject(CommonService);

    const isAuth = _c_.isAuth();
    if (!isAuth) {
      _c_.router.navigate(['/login']).then();
      return false;
    }
    return true;
  };

  static nonAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const _c_ = inject(CommonService);

    const isAuth = _c_.isAuth();
    if (isAuth) {
      _c_.router.navigate(['/']).then();
      return false;
    }
    return true;
  };
}
