import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { LoginService } from './login.service';
import { AppConfig } from '../../app.config';

@Injectable()
export class PortfolioService {

  constructor(private http: Http, private login: LoginService, private config: AppConfig) { }

  addPortfolio(newPortfolio) {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/create/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newPortfolio, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  getPortfolioList() {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/portfolioList/' + localStorage.getItem('userId');
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllPortfolio() {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/getPortfolioList/';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  updatePortfolio(updatedPortfolio, portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/update/' + portfolio_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedPortfolio, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deletePortfolioById(portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/delete/' + portfolio_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
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
