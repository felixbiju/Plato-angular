import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppConfig } from '../../app.config';

@Injectable()
export class ProjectService {

  IsProjectSelected = new BehaviorSubject<string>(localStorage.getItem('project_id'));
  currentProjectId = this.IsProjectSelected.asObservable();

  constructor( private http: Http, private config: AppConfig) { }

  changeProject(project_id) {
    this.IsProjectSelected.next(project_id);
  }

  addProject(newproject, account_id) {
    const url = this.config.getConfig('baseUrl') + 'ProjectConfigService/create/' + account_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newproject, { headers: headers }).map(res => res.text());
  }

  getProjectList(portfolio_id, account_id) {
    const url = this.config.getConfig('baseUrl') +  'DashboardService/getAllocatedProjectList/' +
    localStorage.getItem('userId') + '/' + portfolio_id + '/' + account_id;
    return this.http.get(url).map( (res: Response) => res.json() ).catch( this.errorHandler );
  }

  getProjectList1(portfolio_id, account_id) {
    const url = this.config.getConfig('baseUrl') + 'ProjectConfigService/allProjectDetailsInPortfolioAndAccount/' + portfolio_id + '/' + account_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  deleteProject() {
    const url = this.config.getConfig('baseUrl') + 'ProjectConfigService/delete/' + localStorage.getItem('project_id');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(url, { headers: headers }).map((res: Response) => res.text());
  }

  getParticularProject(project_id) {
    const url = this.config.getConfig('baseUrl') + 'ProjectConfigService/getParticularProject/' + project_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  updateProject(updatedProject,account_id ) {
    const url = this.config.getConfig('baseUrl') + 'ProjectConfigService/update/'+ account_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedProject, { headers: headers }).map(res => res.text());
  }

  getUsersInProject(){
    const url = this.config.getConfig('baseUrl') + 'UserConfigService/allUsersInProject/' + localStorage.getItem('project_id');
    return this.http.get( url ).map( (res: Response) => res.json() );
  }

  errorHandler( err: Response ) {
    return Observable.throw( err.statusText || 'Server Error');
  }
}
