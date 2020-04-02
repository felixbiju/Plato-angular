import { Permissions } from './../model/permissions';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppConfig } from '../../app.config';

@Injectable()
export class PermissionService{

  role = {
    roleId: 0,
    roleName: 'Null Role'
  }
  IsRoleChanged = new BehaviorSubject<object>(this.role);
  currentRole = this.IsRoleChanged.asObservable();



  constructor( private http: Http, private config: AppConfig) { }

  changeRole(role) {
    this.IsRoleChanged.next(role);
  }

  getAllPermissions() {
    const url = this.config.getConfig('baseUrl') + 'rolePermissionService/getAllPermissions';
    // const url = '../../../assets/ServicesUrls/permission.json';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllPermissionsByRole(role) {
    // const url = '../../../assets/ServicesUrls/permission.json';
    // const url = this.config.getConfig('baseUrl') + 'rolePermissionService/getAllPermissions';
    const url = this.config.getConfig('baseUrl') + 'rolePermissionService/getPermissions/' + role.roleId;
    console.log('Getting permission for role id ==> ' + role.roleId + ' ' + role.roleName);
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  savePermissionByRole(role, permissionData) {
    const url = this.config.getConfig('baseUrl') + 'rolePermissionService/createRolePermission/' + role.roleId;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, permissionData, { headers: headers }).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  deletePermissionByRole(role) {
    const url = this.config.getConfig('baseUrl') + 'rolePermissionService/deleteAll/' + role.roleId;
    return this.http.delete(url).map((res: Response) => res.text()).catch(this.errorHandler);
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
