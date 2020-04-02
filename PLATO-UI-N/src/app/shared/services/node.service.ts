import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

import { LoginService } from './login.service';

@Injectable()
export class NodeService {



  constructor(private http: Http, private login: LoginService, private config: AppConfig ) { }

  addNode(newNode) {
   const url = this.config.getConfig('baseUrl') + 'NodeService/create/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newNode, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  getNodeList() {
    const url = this.config.getConfig('baseUrl') + 'Portfolio/portfolioList/' + localStorage.getItem('userId');
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllNode() {
    const url = this.config.getConfig('baseUrl') + 'NodeService/fetchAllNodesWithStatus/';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllCredentials() {
    const url = this.config.getConfig('baseUrl') + 'CredentialService/getCredentials/';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  updateNode(updatedNode) {
    const url = this.config.getConfig('baseUrl') + 'NodeService/update/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedNode, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deleteNodeById(node_id: number) {
    const url = this.config.getConfig('baseUrl') + 'NodeService/delete/' + node_id;
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
