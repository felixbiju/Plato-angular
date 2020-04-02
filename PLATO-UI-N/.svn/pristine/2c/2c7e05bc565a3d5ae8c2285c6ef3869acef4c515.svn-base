import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private login: LoginService,
               private router: Router ) { }

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true;
      // if( this.login.loggedIn() ) {
      //   console.log('Guard Passed');
      //   return true;
      // }

      // console.log('Guard Blocked');
      // this.router.navigate(['']);
      // return false;
  }
}
