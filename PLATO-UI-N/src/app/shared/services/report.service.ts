import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class ReportService {

  fetchatabaseDetail = "DatabaseToolServices/fetchDatabaseDetail/";
  fetchatabaseData = "EnvironmentReadinessDatabaseDataService/fetchatabaseData/";
  fetchServerDetail = "ServerToolServices/fetchServerDetail/";
  fetchApplicationDetail = "ApplicationToolServices/fetchApplicationDetail/";
  fetchparticularApplicationData = "ApplicationToolServices/getApplicationData/";
  getApplicationDataOnDateBasis = "ApplicationToolServices/getApplicationDataOnDateBasis/";
  fetchparticularServerData = "ServerToolServices/getServerData/";
  getBuildHistory = "DetailBuildHistory/getBuildHistory/";
  abortJobURL = "buildModule/abortJob/";

  public IsReportSelected: Subject<boolean> = new Subject<boolean>();
  public currentReportStatus = this.IsReportSelected.asObservable();

  constructor( private http: Http, private config: AppConfig ) { }

  changeReportShownStatus(value) {
    this.IsReportSelected.next(value);
  }
  demodiatjson(){
    const url = '../../../../assets/diat_hardcoded.json';
    return this.http.get(url).map((res: Response) => res.json());
  }
  getBuildHistoryData() {

    // sample report
    // const url = '../../../assets/ServicesUrls/SampleReport.json';

    const url = this.config.getConfig('baseUrl') + this.getBuildHistory + localStorage.getItem('build_history_id');
    return this.http.get(url).map((res: Response) => res.json());
  }

  getLastBuildHistoryData(build_history_id) {
    const url = this.config.getConfig('baseUrl') + this.getBuildHistory + build_history_id;
    return this.http.get(url).map((res: Response) => res.json());
  }

  getqtpreportdata() {
    const url = '../../../assets/ServicesUrls/qtpwhole.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getduckcreektabledata() {
    const url = '../../../assets/ServicesUrls/duckcreek.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getTrendData() {
    const url = '../../../assets/ServicesUrls/SampleTrend.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getxcheckData() {
    const url = '../../../assets/ServicesUrls/SamplexcheckReport.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getqtpData() {
    const url = '../../../assets/ServicesUrls/Qtp.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getChartcolour() {
    const url = '../../../assets/ServicesUrls/ChartColours.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getTrendData1() {
    const url = '../../../assets/ServicesUrls/SampleTrend1.json';
    return this.http.get(url).map((res: Response) => res.json());
  }

  getDatabaseData() {
    const url = this.config.getConfig('baseUrl') + this.fetchatabaseData + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getDatabaseStatus() {
    const url = this.config.getConfig('TEMServiceUrl') + this.fetchatabaseDetail + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getServerData() {
    const url = this.config.getConfig('baseUrl') + 'EnvironmentReadinessServerDataService/fetchServerData/' + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getServerStatus() {
    const url = this.config.getConfig('TEMServiceUrl') + this.fetchServerDetail + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getParticularServerData() {
    const url = this.config.getConfig('TEMServiceUrl') + this.fetchparticularServerData + localStorage.getItem('serverId');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getParticularServerDataDateWise(){
    const url = this.config.getConfig('TEMServiceUrl') + 'ServerToolServices/getServerDataOnDateBasis/' + localStorage.getItem('serverId') +'/'+localStorage.getItem('fromDate')+'/'+localStorage.getItem('toDate');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getApplicationData() {
    const url = this.config.getConfig('baseUrl') + 'EnvironmentReadinessApplicationDataService/fetchApplicationData/' + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getApplicationStatus() {
    const url = this.config.getConfig('TEMServiceUrl') + this.fetchApplicationDetail + localStorage.getItem('project_id');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getParticularApplicationData(){
    const url = this.config.getConfig('TEMServiceUrl') + this.fetchparticularApplicationData + localStorage.getItem('applicationId');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  getParticularApplicationDataDateWise(){
    const url = this.config.getConfig('TEMServiceUrl') + this.getApplicationDataOnDateBasis + localStorage.getItem('applicationId') +'/'+localStorage.getItem('fromDate')+'/'+localStorage.getItem('toDate');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  abortJob() {
    const url = this.config.getConfig('baseUrl') + this.abortJobURL + localStorage.getItem('job_name')+ '/'+ localStorage.getItem('build_number');
    return this.http.get(url).map( (res: Response) => res.json() );
  }

  sendLadyBugNotification(ladyBugObj) {
    const url = this.config.getConfig('ladyBugUrl') + 'GCM/resource/json/getMessage';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, ladyBugObj, { headers: headers }).map(res => res.json());
  }

  sendToALM(reportObj) {
    const url = this.config.getConfig('baseUrl') + 'QCSevice/updateQC/';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, reportObj, { headers: headers }).map(res => res.json());
  }

  updateALMResponse(updatedReport) {
    const url = this.config.getConfig('mongoBaseUrl') + 'PlatoMongoTemplate/updateMongo';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, updatedReport, { headers: headers }).map(res => res.json());
  }
}
