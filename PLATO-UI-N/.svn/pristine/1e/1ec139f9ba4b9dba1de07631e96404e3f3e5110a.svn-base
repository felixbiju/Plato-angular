import { Injectable, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../../shared/model/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //Observable from rxjs library
import 'rxjs/add/operator/map'; // map method from rxjs library
import 'rxjs/add/operator/catch'; // catch method from rxjs library
import 'rxjs/add/observable/throw';  // throw method from rxjs library
import { AppConfig } from '../../app.config';

@Injectable()
export class DashboardService implements OnInit{

  constructor( private http: Http, private login: LoginService, private config: AppConfig ) {
  }

  ngOnInit() {  }

  getImagesSources() {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/all';
    return this.http.get( url ).map( (res: Response) => res.json() );
  }

  getRoleList() {
    let user: User = this.login.getUserData();
    const url = this.config.getConfig('baseUrl') + 'DashboardService/getRoleList/' + user.name;
    return this.http.get( url ).map( (res: Response) => res.json() );
  }

  getAllBuildHistoryForModule(moduleName){
    const url = this.config.getConfig('baseUrl') + 'DetailBuildHistory/getAllBuildHistory/' + moduleName;
    return this.http.get( url ).map( (res: Response) => res.json() );
  }

}
