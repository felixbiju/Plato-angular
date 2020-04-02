import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { MessageService } from 'primeng/components/common/messageservice';
import { AppConfig } from '../../app.config';

@Injectable()
export class RolesService {

  constructor( private http: Http, private message: MessageService, private config: AppConfig ) { }

  getRoles(project_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/getRoles/' + localStorage.getItem('userId') + '/'
    + project_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllRoles() {
    const url = this.config.getConfig('baseUrl') + 'RoleConfigService/all/';
    return this.http.get(url).map((res: Response) => res.json());
  }

  addRole(newRole) {
    const url = this.config.getConfig('baseUrl') + 'RoleConfigService/create/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newRole, { headers: headers }).map(res => res.text());
  }

  updateRole(updatedRole) {
    const url = this.config.getConfig('baseUrl') + 'RoleConfigService/update/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedRole, { headers: headers }).map(res => res.json);
  }

  deleteRole() {
    const url = this.config.getConfig('baseUrl') + 'RoleConfigService/delete/' + localStorage.getItem('roleId');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers }).map(res => res.text());
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
