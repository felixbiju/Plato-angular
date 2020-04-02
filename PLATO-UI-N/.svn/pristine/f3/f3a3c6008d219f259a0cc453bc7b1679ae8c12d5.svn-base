import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //Observable from rxjs library
import 'rxjs/add/operator/map'; // map method from rxjs library
import 'rxjs/add/operator/catch'; // catch method from rxjs library
import 'rxjs/add/observable/throw';  // throw method from rxjs library

import { DbModel } from '../model/db';
import { AppConfig } from '../../app.config';

@Injectable()
export class UserService {

  constructor(private http: Http, private login: LoginService, private config: AppConfig) { }

  getUserList() {
    const userList = this.config.getConfig('baseUrl') + 'UserConfigService/userProjectRoleList2/';
    return this.http.get( userList ).map( (res: Response) => res.json());
  }

  getUsersInPortfolio(portfolio_id){
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/allUsersInPortfoliowithProjectDetails/' + portfolio_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getUsersInAccountAndPorfolio(account_id,portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/allUsersInAccountInPortfolio/' + account_id + '/'
    + portfolio_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getUsersInProAccPortfolio(project_id,account_id, portfolio_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/allUsersInProjectInAccountInPortfolio/' + project_id + '/'
    + account_id +'/' + portfolio_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getAllRoles() {
    const url = this.config.getConfig('baseUrl') + 'RoleConfigService/all/';
    return this.http.get(url).map((res: Response) => res.json() );
  }

  // For sending email,name and password to create user in json
  addUser( newUser) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/create/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post( url, newUser, {headers: headers} ).map( (res: Response) => res.text());
  }

  editUser( newUser) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/update/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put( url, newUser, {headers: headers} ).map( (res: Response) => res.text());
  }

  deleteUser(user_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/delete/' +user_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers : headers});
    return this.http.put(url, {headers : headers}).map((res: Response) => res.text());
  }

  getParticularUser(user_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/fetchParticular/' + user_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllAllocatedProjectsAndRoles(user_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/getAllocatedProjectsAndRolesArray/' + user_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  addProjectForUser(editUsersProject) {
   const url = this.config.getConfig('baseUrl') + 'UserConfigService/allocateMultipleRolesForMultipleUsers/' + editUsersProject.project_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers : headers});
    return this.http.put(url, editUsersProject, {headers : headers}).map((res: Response) => res.text());
  }

  deleteMapping(user_id,projectID, delete_role_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/delete/' + user_id + '/' + projectID + '/' + delete_role_id;
    return this.http.get(url).map( (res: Response) => res.text() );
  }

  getUsersRolesInProject(userID, project_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/getRoles/' + userID + '/' + project_id;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllocatedProjects(userID) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/getAllocatedProjects/' + userID;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  deallocateProject(user_id, project_id) {
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/deallocate/' + project_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, user_id, { headers: headers }).map( (res: Response) => res.text());
  }

  addDefaultProject(userRolepassed){
    // url need to change
    const url= this.config.getConfig('baseUrl') +"UserConfigService/updateUPM";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers : headers});
    return this.http.put(url, userRolepassed, {headers : headers}).map((res: Response) => res.text());
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

      case 409:
        msg = 'Conflict.';
      break;

    }
    return Observable.throw(msg);
  }
}
