import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class TestCaseFactoryService {


  constructor(private _http: Http, private config: AppConfig) { }

  getAllChannel() {
    const url = this.config.getConfig('TCBaseUrl') + 'channelService/getAll';
    console.log('get all channel >>>> ' + url);
    return this._http.get(url).map( (res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllNodes() {
    const url = this.config.getConfig('TCBaseUrl') + 'releaseService/getAllNodes ';
    console.log('get all node >>>> ' + url);
    return this._http.get(url).map( (res: Response) => res.json()).catch(this.errorHandler);
  }

  getProductsByChannelId(channel) {
    localStorage.setItem('channel_id', channel.id);
    const url = this.config.getConfig('TCBaseUrl') + 'productService/getAllByChannel/' + channel.id;
    console.log('get all product by channelId >>>> ' + url);
    return this._http.get(url).map( (res: Response) => res.json()).catch(this.errorHandler);
  }

  getSecnariosByChannelIdAndProductId(channel, product) {
    const url = this.config.getConfig('TCBaseUrl') + 'scenarioService/getScenarioTOList/' + channel.id +'/'+ product.id;
    console.log('get all scenario By PID & CID >>>> ' + url);
    return this._http.get(url).map( (res :Response) => res.json()).catch(this.errorHandler);
  }

  addScenario(newScenario) {
    const url = this.config.getConfig('TCBaseUrl') + 'scenarioService/create' ;
    console.log('create scenario without transactions >>>> ' + url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, newScenario, { headers: headers }).map(res => res.json()).catch(this.errorHandler);
  }

  deleteScenariobyId(scenario) {
    const url = this.config.getConfig('TCBaseUrl') + 'scenarioService/delete/'+ scenario.scenarioId;
    console.log('delete scenario >>>> ' + url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete(url, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  getAllTransactionsByChannelName(obj) {
    const url = this.config.getConfig('TCBaseUrl') + 'dataReadExcelService/' + obj.channel_name + '/getData/';
    console.log('get all transactions by Channel name >>>> ' + url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, obj, { headers: headers }).map(res => res.json()).catch(this.errorHandler);
  }

  addTransactionByScenario(newScenario) {
    const url = this.config.getConfig('TCBaseUrl') + 'scenarioService/createTransactions/' + newScenario.scenarioId;
    console.log('add transactions in scenario >>>> ' + url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, newScenario, { headers: headers }).map(res => res.json()).catch(this.errorHandler);
  }

  deleteTransactionsByScenarioId(newScenario) {
    const url = this.config.getConfig('TCBaseUrl') + 'scenarioService/deleteTransactions/' + newScenario.scenarioId;
    console.log('delete transactions in scenario >>>> ' + url);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete(url, { headers: headers }).map(res => res.text()).catch(this.errorHandler);
  }

  createReleaseByChannel(newRelease) {
    const url = this.config.getConfig('TCBaseUrl') + 'dataWriteExcelService/' + newRelease.channel_name + '/setData';
    console.log('create new release >>>> ' + url);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post( url, newRelease, {headers: headers} ).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  updateRelease(updatedRelease) {
    const url = this.config.getConfig('TCBaseUrl') + 'dataWriteExcelService/' + updatedRelease.channel_name + '/updateData';
    console.log('update release >>>> ' + url);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post( url, updatedRelease, {headers: headers} ).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  deleteReleaseById(release) {
    const url = this.config.getConfig('TCBaseUrl') + 'releaseService/delete/' + release.release_id;
    console.log('Delete url >>>>>>>>>> ' + url);
    return this._http.delete(url).map((res: Response) => res.text()).catch(this.errorHandler);
  }

  getAllReleasesByChannel(channel) {
    const url = this.config.getConfig('TCBaseUrl') + 'releaseService/getAll/' + channel.id;
    console.log('get all releases by channelId >>>> ' + url);
    return this._http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getAllProductsandScenariosByChannel(channel) {
    const url = this.config.getConfig('TCBaseUrl') + 'releaseService/getProductByChannel/' + channel.id;
    console.log('get all products and scenarios by channelId >>>> ' + url);
    return this._http.get(url).map((res: Response) => res.json()).catch(this.errorHandler);
  }

  errorHandler(err: Response) {
    let msg = '';
    switch (err.status) {
      case 404:
        err.statusText = 'Not Found.';
      break;

      case 500:
        err.statusText = 'Internal Error |Server connection Failed.';
      break;
    }
    return Observable.throw(msg);
  }
}
