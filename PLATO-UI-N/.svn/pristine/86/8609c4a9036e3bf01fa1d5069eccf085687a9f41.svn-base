import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class StreamingService {

  liveStreamURL = 'http://172.25.14.112:8080/TEMServices/LiveStreamingService/';

  constructor(private http: HttpClient) { }

  getStatus(ip: string){
    return this.http.get(this.liveStreamURL + 'status/' + ip);
  }

  stopThread(ip: string){
    return this.http.get(this.liveStreamURL + 'stop/' + ip);
  }
}
