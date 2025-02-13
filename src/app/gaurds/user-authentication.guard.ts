import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const userAuthenticationGuard: CanActivateFn = (route, state) => {
  
  let _loginServie = inject(LoginService);
  let _router = inject(Router)
  return _loginServie.isLogingNow() ? true : _router.navigate(['login']);
};
