import { Component, OnInit } from '@angular/core';
import { StreamingService } from '../../../shared/services/streaming.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  imageUrl: string;
  tomcat = 'http://172.25.14.112:8080/livestreamdata/';
  ip = '172.25.14.111';
  videoLink: string;

  isLive: boolean;

  constructor(private service: StreamingService) { }

  ngOnInit() {
    this.isLive = true;
    this.startThread();
  }

  startThread() {
    const modifiedIP = this.ip.replace(/\./g,'_');
    this.videoLink = this.tomcat + modifiedIP + '/recording.mp4?random=' + Date.now();
    this.service.getStatus(this.ip).subscribe((data: { status: string}) => {
      if(data.status) {
        this.isLive = true;
        this.fetchImage(modifiedIP);
      } else {
        this.isLive = false;
      }
    });
  }

  stopThread() {
    this.isLive = false;
    this.service.stopThread(this.ip).subscribe(data => {
      console.log("thread stopped");
    });
  }

  fetchImage(modifiedIP: string) {

    let count = 0;

    (async () => {

      while (this.isLive) {
        this.imageUrl = this.tomcat + modifiedIP + '/' + count + '.jpg?random=' + Date.now();
        console.log(this.imageUrl);
        count = (count > 60)? 0 : count+1;
        if( count == 60 ){
          this.service.getStatus(this.ip).subscribe((data: { status: string}) => {
            if(!data.status) {
              this.isLive = false;
            }
          });
        }
        await this.delay(1000);
      }

    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
