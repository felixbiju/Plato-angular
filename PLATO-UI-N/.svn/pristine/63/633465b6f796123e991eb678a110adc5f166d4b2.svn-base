import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user';
import { AppConfig } from '../../app.config';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class LoginService {

  authToken: any;
  username: any;
  user: User;
  isLoggedIn: boolean;
  public IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor ( private http: Http, private router: Router, private message: MessageService, private config: AppConfig) { }

  authenticateUser( newUser ) {
    const url = this.config.getConfig('baseUrl') + 'LoginService/Login/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post( url, newUser, {headers: headers} )
                          .map( (res: Response) => res.json())
                          .catch( this.errorHandler );
  }

// private helper methods for including token into header into requests
 jwt() {
    // create authorization header with jwt token
    const currentToken = localStorage.getItem('id_token');
    if ( currentToken ) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentToken });
      headers.append('Content-Type','application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  loggedIn() {
    if (localStorage.getItem('token') !== null) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  storeUserData(user){
    this.user = user;
    localStorage.setItem('token', user.JWT);
    localStorage.setItem('user', user.userName);

    localStorage.setItem('defaultProjectDetails', JSON.stringify(user.defaultProjectDetails));
    localStorage.setItem('portfolio_id', user.defaultProjectDetails.portfolio_id);
    localStorage.setItem('portfolio_name', user.defaultProjectDetails.portfolio_name);
    localStorage.setItem('account_id', user.defaultProjectDetails.account_id);
    localStorage.setItem('account_name', user.defaultProjectDetails.account_name);
    localStorage.setItem('project_id', user.defaultProjectDetails.project_id);
    localStorage.setItem('project_name', user.defaultProjectDetails.project_name);

    this.authToken = user.JWT;
    this.username = user;
  }

  getUserData(){
    return this.user;
  }

  loggedOut() {
    this.message.clear();
    this.message.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'Thank you, for using Plato.'
    });
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  errorHandler(err: Response) {
    let msg = '';
    switch (err.status) {
      case 404:
          msg = 'User not Found.';
      break;

      case 500:
          msg = 'Server connection Failed.';
      break;
    }
    return Observable.throw(msg);
  }
}
