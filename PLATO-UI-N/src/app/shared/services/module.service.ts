import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppConfig } from '../../app.config';

@Injectable()
export class ModuleService {

  IsModuleChanged = new BehaviorSubject<string>(localStorage.getItem('module_id'));
  currentModuleId = this.IsModuleChanged.asObservable();

  IsConfigChanged = new BehaviorSubject<boolean>(false);
  currentConfig = this.IsConfigChanged.asObservable();

  configChanged = false;

  constructor( private http: Http, private config: AppConfig) { }

  changeModuleId(module_id) {
    this.IsModuleChanged.next(module_id);
  }

  changeConfig(value) {
    this.IsConfigChanged.next(value);
  }

  addModule( newModule ) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/createModule/' + localStorage.getItem('project_name');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post( url, newModule, {headers: headers} ).map( (res: Response) => res.json() ).catch(this.errorHandler);
  }
getSchedule() {
  const url = this.config.getConfig('baseUrl') + 'ModulePage/getSchedule/' + localStorage.getItem('module_name');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
}

  scheduleBuild( newModule ) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/updateModule/' + localStorage.getItem('project_name');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post( url, newModule, {headers: headers} ).map( (res: Response) => res.json() ).catch(this.errorHandler);
  }

  getModuleList(project_name) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/getModuleNameList/' + project_name;
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getModuleNames() {
    const url = this.config.getConfig('baseUrl') +'ModulePage/getAllModules';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getSubjobNames() {
    const url = this.config.getConfig('baseUrl') +'ModulePage/getAllSubJobs';
    return this.http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getModuleByAccount(account_name) {
    const url = this.config.getConfig('baseUrl') + 'DashboardService/getModuleListOfProjects/' + localStorage.getItem('userId')
    + '/' + account_name + '/all';
    console.log('bbbbbbbb' + url);
    return this.http.get(url).map( (res: Response) => res.json() ).catch(this.errorHandler);
  }

  getModuleByProject( project_name) {
    const url = this.config.getConfig('baseUrl') + 'DashboardService/getModuleListOfProjects/' + localStorage.getItem('userId')
    + '/' + localStorage.getItem('account_name') + '/' + project_name;
    return this.http.get(url).map( (res: Response) => res.json() ).catch(this.errorHandler);
  }

  getBuildsStatusByAccount() {
    const url = this.config.getConfig('baseUrl') + 'DashboardService/getBuildStatusWiseCountOfModulesInProjects/'
    + localStorage.getItem('userId') + '/' + localStorage.getItem('account_name') + '/all';
    return this.http.get(url).map( (res: Response) => res.json() ).catch(this.errorHandler);

  }

  getBuildStatusByProject() {
    const url = this.config.getConfig('baseUrl') + 'DashboardService/getBuildStatusWiseCountOfModulesInProjects/' + localStorage.getItem('userId')
    + '/' + localStorage.getItem('account_name') + '/' + localStorage.getItem('project_name');
    return this.http.get(url).map( (res: Response) => res.json() ).catch(this.errorHandler);;
  }

  getBuildHistoryByModule(module_name) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/buildHistory/' + module_name;
    return this.http.get(url).map( (res: Response) => res.json() ).catch(this.errorHandler);
  }

  getSubJobs() {
    const moduleConfigUrl = this.config.getConfig('baseUrl') + 'ModulePage/moduleConfig/' + localStorage.getItem('module_name');
    return this.http.get(moduleConfigUrl).map((res: Response) => res.json());
  }

  createSubJobs(newSubJobs) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/createSubJobs/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newSubJobs, {headers: headers}).map( (res: Response) => res.text() ).catch(this.errorHandler);
  }

  executeModuleById(module_id) {
    const url = this.config.getConfig('baseUrl') + 'buildModule/executeJob/' + module_id
    return this.http.get(url).map((res: Response) => res.text());
  }

  deleteModuleById(module_id) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/deleteModule/' + module_id;
    return this.http.delete(url).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  deleteAllSubjobsByModuleId() {
    const url = this.config.getConfig('baseUrl') + '/ModulePage/deleteAllSubModules/' +
    localStorage.getItem('module_id');
    return this.http.delete(url).map((res: Response) => res.text());
  }

  deleteSubJobByName(deletedToolConfig) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/deleteSubModule/';
    return this.http.put(url, deletedToolConfig).map((res: Response) => res.text());
  }

  updateAllSubjobs(updatedData) {
    const url = this.config.getConfig('baseUrl') + 'ModulePage/updateSubJob/';
    return this.http.put(url, updatedData).map((res: Response) => res.text());
  }

  errorHandler( err: Response ) {
    return Observable.throw( err.statusText || 'Server Error.' );
  }

  abortJob() {
    const url = this.config.getConfig('baseUrl') + "buildModule/abortBuild/" +localStorage.getItem('build_history_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }
}
