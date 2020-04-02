import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';

@Injectable()
export class EnvironmentService {


  constructor(private http: Http, private config: AppConfig) { }

  startAppsBackgroundServices(project_id){
    const url= this.config.getConfig('TEMServiceUrl') + 'BackgroundServices/StartAllApplicationBGService/'+project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }
  startServBackgroundServices(project_id){
    const url= this.config.getConfig('TEMServiceUrl') + 'BackgroundServices/StartAllServerBGService/'+project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }
  startDBsBackgroundServices(project_id){
    const url= this.config.getConfig('TEMServiceUrl') + 'BackgroundServices/StartAllDBBGService/'+project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getProjectsList() {
    return this.http.get( this.config.getConfig('baseUrl') + 'ProjectConfigService/all/' ).map( (res: Response) => res.json());
  }

   getApplicationsList(project_id) {
    const url= this.config.getConfig('baseUrl') + 'EnvironmentApplicationConfigService/fetchAllApplicationProjectWise' + '/' + project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getApplnById(applicationId){
    const application_Id = localStorage.getItem('applicationId');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentApplicationConfigService/fetchApllication' + '/' + application_Id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getServById(serverId){
    const server_Id = localStorage.getItem('serverId');
    const url =this.config.getConfig('baseUrl') + 'EnvironmentServerConfigService/fetchServer' + '/' + server_Id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getDatabById(databaseId){
    const database_Id = localStorage.getItem('databaseId');
    const url =this.config.getConfig('baseUrl') + 'EnvironmentDatabaseConfigService/fetchDatabse' + '/' + database_Id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  addApplication(newApplication) {
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentApplicationConfigService/create' + '/' + project_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newApplication, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  updateApplication(updatedapplication){
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentApplicationConfigService/updateApp'+'/' + project_id;
    console.log(updatedapplication);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedapplication, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  updateServer(updatedserver){
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentServerConfigService/updateServer'+'/' + project_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedserver, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  updateDatabase(updateddatabase){
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentDatabaseConfigService/updateDb'+'/' + project_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updateddatabase, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deleteApplicationById(){
    const application_id = localStorage.getItem('applicationId');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentApplicationConfigService/delete' + '/' + application_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers }).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  addServer(newServer){
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentServerConfigService/create'+'/' + project_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newServer, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deleteServerById(){
    const server_id = localStorage.getItem('serverId');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentServerConfigService/delete' +'/'+server_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers }).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  addDatabase(newDatabase){
    const project_id = localStorage.getItem('project_id');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentDatabaseConfigService/create'+'/' + project_id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, newDatabase, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  deleteDatabaseById(){
    const database_id = localStorage.getItem('databaseId');
    const url = this.config.getConfig('baseUrl') + 'EnvironmentDatabaseConfigService/delete' + '/' +database_id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers }).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  getDatabaseList(project_id) {
    const url=this.config.getConfig('baseUrl') + 'EnvironmentDatabaseConfigService/fetchAllDatabaseDetailProjectWise'+'/' + project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getServerList(project_id) {
    const url=this.config.getConfig('baseUrl') + 'EnvironmentServerConfigService/fetchAllServersProjectWise'+'/' + project_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getProjectList(portfolio_id, account_id) {
    const url=this.config.getConfig('baseUrl') + 'ProjectConfigService/allProjectDetailsInPortfolioAndAccount'+'/' + portfolio_id + '/'+ account_id;
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getApplicationList(){
    return this.http.get( this.config.getConfig('baseUrl') + 'EnvironmentService/fetchAllApplicationProjectWise/' ).map((res:Response) => res.json());
  }

  getUsersInProject(){
    const url= this.config.getConfig('baseUrl') + 'UserConfigService/allUsersInProject/' + localStorage.getItem('project_id');
    return this.http.get( url ).map( (res: Response) => res.json() );
  }

  onChangingBackendServicesSetting(checked) {
    if (checked === true) {
      const url = 'http://172.25.9.140:8080/TEM_Schedular/TEMService/checkServerApplicationDatabase';
      return this.http.get(url).map((res: Response) => res.json());
    } else {
      const url = 'http://172.25.9.140:8080/TEM_Schedular/TEMService/stopSchedular';
      return this.http.get(url).map((res: Response) => res.json());
    }
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
