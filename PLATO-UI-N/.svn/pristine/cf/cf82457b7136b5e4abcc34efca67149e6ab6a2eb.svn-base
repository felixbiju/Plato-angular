import { Component,OnDestroy , OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from "rxjs/Subscription";
import "rxjs/add/operator/takeWhile";
import { ReportService } from '../../../shared/services/report.service';

@Component({
  selector: 'app-pre-buildcheck',
  templateUrl: './pre-buildcheck.component.html',
  styleUrls: ['./pre-buildcheck.component.css']
})
export class PreBuildcheckComponent implements OnInit,OnDestroy {

  isApplication: boolean;
  isServer: boolean;
  isDatabase: boolean;
  poolingTime: any = 60000;

  databases: any[];
  servers: any[];
  applications: any[];

  constructor(private report: ReportService) {}

  ngOnInit() {
    this.getStatus();
  }

  getStatus(){
    this.report.getBuildHistoryData().subscribe( data => {
      this.applications =  data.BuildHistory.PreBuildCheck.Applications;
      this.servers = data.BuildHistory.PreBuildCheck.Servers;
      this.databases = data.BuildHistory.PreBuildCheck.Databases;
    }); 
  }

  hideandshowreport(tool_report){
    var x = document.getElementById(tool_report);
    if (x.style.display === "block") {
      x.style.display = "none";
    }
    else if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  ngOnDestroy(){ }
}
