import { Component, OnInit, OnDestroy } from '@angular/core';

// import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoaderService } from './shared/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  blurRatio = 0;

  constructor(private message: MessageService, private loader: LoaderService ) { }

  ngOnInit() {

    this.msgs = [];
    this.message.messageObserver.subscribe(async messages =>{
      this.msgs.push(messages);
      await this.delay(4000);
      this.msgs = [];
    });

    this.loader.IsLoaderStatusChanged.subscribe( showLoader => {
      if (showLoader) {
        this.blurRatio = 2;
        document.getElementById('spinner01').style.display = 'block';
      } else {
        this.blurRatio = 0;
        document.getElementById('spinner01').style.display = 'none';
      }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnDestroy() { }
}
