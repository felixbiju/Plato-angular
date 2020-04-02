import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ChangeimpactService {



  constructor(private http: Http, private config: AppConfig) { }

  getchangeimpactpath() {
    const url = this.config.getConfig('baseUrl') + 'impactChangeService/fetchDiatSubJobDetails/' + localStorage.getItem('project_id');
    return this.http.get(url).map((res: Response) => res.json());
  }

  getComparison() {
    const url= this.config.getConfig('baseUrl') + 'diatCompareService/getComparison/' + localStorage.getItem('project_id') + '/?' + 'commandToExecute=';
    console.log("compare url is"+url);
    return this.http.get(url).map((res: Response) => res.json());
  }

  // changes for RSA Poc
  getDIATForRSA(reportPath) {
    const url = this.config.getConfig('mongoBaseUrl') + 'PlatoMongoTemplate/rsaImpact';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, reportPath, { headers: headers }).map((res: Response) => res.json());
  }
}
