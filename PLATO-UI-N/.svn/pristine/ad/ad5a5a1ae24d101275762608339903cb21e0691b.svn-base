import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';

@Injectable()
export class AccountService {



  constructor( private http: Http, private config: AppConfig ) { }

  getAccountList(portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/getAccountListForPortfolio/' + localStorage.getItem('userId') + '/'
                + portfolio_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllAccountList(portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/getAccountListForPortfolio/' + portfolio_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAccountById(account_id) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/fetchParticularAccount/' + account_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  addAccount(portfolio_id, newAccount) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/create/' + portfolio_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newAccount, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  updateAccount(portfolioId, updatedAccount) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/update/' + portfolioId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("update account url");
    console.log(url);
    return this.http.put(url, updatedAccount, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deleteAccountById(account) {
    const url = this.config.getConfig('baseUrl') + 'AccountConfigService/delete/' + account.accountId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("delete account url");
    console.log(url);
    return this.http.delete(url, { headers: headers }).map((res: Response) => res.text()).catch(this.errorHandler);
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
