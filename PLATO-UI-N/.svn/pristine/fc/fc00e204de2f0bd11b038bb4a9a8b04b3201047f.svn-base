import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private config: Object = null;

    constructor(private http: Http) {

    }




    /**
     * Use to get the data found in the AllService file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('../assets/ServicesUrls/AllServices.json').map( res => res.json() ).catch((error: any):any => {
                console.log('AllService.json could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((responseData) => {
              this.config = responseData;
              resolve(true);
            });
        });
    }
}
