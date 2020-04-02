import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {

  

  IsLoaderStatusChanged = new BehaviorSubject<boolean>(false);
  currentLoaderStatus = this.IsLoaderStatusChanged.asObservable();

  constructor() { }

  changeLoaderStatus(status) {
    this.IsLoaderStatusChanged.next(status);
  }

}
