import { Component,OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from "rxjs/Subscription";
import "rxjs/add/operator/takeWhile";

import { ReportService } from '../../shared/services/report.service';

@Component({
  selector: 'app-environment-ready',
  templateUrl: './environment-ready.component.html',
  styleUrls: ['./environment-ready.component.css']
})



export class EnvironmentReadyComponent implements OnInit,OnDestroy {
  
  isApplication: boolean;
  isServer: boolean;
  isDatabase: boolean;
  poolingTimeForm: number = parseInt(localStorage.getItem('poolingTime'));
  poolingTime: number = this.poolingTimeForm * 60000;

  startDate = new Date(2018, 0, 1);
  today = new Date();
  to_date = this.today;
  from_date = this.today;
  to_date_form = new FormControl(this.to_date);
  from_date_form = new FormControl(this.from_date);
  minDateFrom = this.startDate;
  maxDateFrom = this.today;
  minDateTo = this.from_date;
  maxDateTo = this.today;

  dataFromUrl: any[];
  private completeGraphName: string;
  private completeGraphUrl: string;
  private completeGraphStatuscheckApp : boolean = true;
  private completeGraphStatus : string;
  
  private subscription: ISubscription;
  private statuscheckServer:boolean= false;
  private statuscheckApp:boolean= false;
  private statuscheckDb:boolean= false;
  private alive = false;
  databases: any[];
  servers: any[];
  applications: any[];

  onRefreshTimeChange(input : number){
    if(input > 0){
     
      this.poolingTimeForm = input;
      this.poolingTime = this.poolingTimeForm * 60000;
      localStorage.setItem('poolingTime', this.poolingTimeForm.toString())
      
    }
    
  }

  public applineChartOptions:any = {
    scaleShowVerticalLines: true,
    animation: false,
    scaledisplay: true,
    responsive: true,
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display:false
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display:false
          }
        }
      ]
  }
};
public applineChartLegend:boolean = false;
public applineChartType:string = 'line';

public applineFullChartOptions:any = {
  scaleShowVerticalLines: true,
  maintainAspectRatio: false,
  animation: false,
  scaledisplay: true,
  responsive: true,
  legend: { position: 'bottom' },
  scales: {
    xAxes: [
      {
        display: true
      }
    ],
    yAxes: [
      {
        display: true
      }
    ]
}
};
public applineFullChartLegend:boolean = true;

public applineChartColors:Array<any> = [
  { // dark greyrgb(92, 107, 192)rgb(0, 188, 212)
    backgroundColor: 'rgba(92, 107, 192,0.2)',
    borderColor: 'rgba(92, 107, 192,1)',
    pointBackgroundColor: 'rgba(92, 107, 192,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(92, 107, 192,1)',
    pointHoverBorderColor: 'rgba(92, 107, 192,1)'
  },
  { // greyrgb(66, 165, 245)
    backgroundColor: 'rgba(0, 188, 212,0.1)',
    borderColor: 'rgba(0, 188, 212,1)',
    pointBackgroundColor: 'rgba(0, 188, 212,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(0, 188, 212,0.8)',
    pointHoverBorderColor: 'rgba(0, 188, 212,0.8)'
  },
  { // dark greyrgb(255, 112, 67)
    backgroundColor: 'rgba(255, 112, 67,0.2)',
    borderColor: 'rgba(255, 112, 67,1)',
    pointBackgroundColor: 'rgba(255, 112, 67,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(255, 112, 67,1)',
    pointHoverBorderColor: 'rgba(255, 112, 67,1)'
  },{ // greyrgb(156, 204, 101)
    backgroundColor: 'rgba(156, 204, 101,0.2)',
    borderColor: 'rgba(156, 204, 101,1)',
    pointBackgroundColor: 'rgba(156, 204, 101,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(156, 204, 101,0.8)',
    pointHoverBorderColor: 'rgba(156, 204, 101,0.8)'
  }
];
 
 



  constructor(private report: ReportService) {
    // this.alive = true;
   }

  ngOnInit() {
    this.alive = true;

    TimerObservable.create(0, this.poolingTime)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.getApplicationStatus();
    });

    TimerObservable.create(0, this.poolingTime)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.getServerStatus();
    });

    TimerObservable.create(0, this.poolingTime)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.getDatabaseStatus();
    });
}

setFunction(data: string){
  if(data == 'app') {
    this.isApplication = true;
    this.isServer = false;
    this.isDatabase = false;
  }
  if(data == 'serv'){
    this.isApplication = false;
    this.isServer = true;
    this.isDatabase = false;    
  }
  if(data == 'db'){
    this.isApplication = false;
    this.isServer = false;
    this.isDatabase = true;    
  }
 

}

addFromEvent(event: MatDatepickerInputEvent<Date>) {
  this.from_date = event.value;
  this.minDateTo = this.from_date;
  let from = this.from_date.getFullYear().toString()+'-'+(this.from_date.getMonth()+1).toString()+'-'+this.from_date.getDate().toString();
  let to   = this.to_date.getFullYear().toString()+'-'+(this.to_date.getMonth()+1).toString()+'-'+this.to_date.getDate().toString();
  localStorage.setItem('fromDate',from);
  localStorage.setItem('toDate',to);
  if(this.isApplication){
    this.report.getParticularApplicationDataDateWise().subscribe( Data => {
      this.dataFromUrl = Data;
    });
  }
  
  if(this.isServer){
    this.report.getParticularServerDataDateWise().subscribe( Data => {
      this.dataFromUrl = Data;
    });
  }
  
  if(this.isDatabase){
    
  }
}

addToEvent(event: MatDatepickerInputEvent<Date>) {
  this.to_date = event.value;
  let from = this.from_date.getFullYear().toString()+'-'+(this.from_date.getMonth()+1).toString()+'-'+this.from_date.getDate().toString();
  let to   = this.to_date.getFullYear().toString()+'-'+(this.to_date.getMonth()+1).toString()+'-'+this.to_date.getDate().toString();
  localStorage.setItem('fromDate',from);
  localStorage.setItem('toDate',to);
  if(this.isApplication){
    this.report.getParticularApplicationDataDateWise().subscribe( Data => {
      this.dataFromUrl = Data;
    });
  }
  
  if(this.isServer){
    this.report.getParticularServerDataDateWise().subscribe( Data => {
      this.dataFromUrl = Data;
    });
  }
  
  if(this.isDatabase){
    
  }
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

getDatabaseData() {
  this.report.getDatabaseData().subscribe( data => {
    this.databases = data;
  });
}

getDatabaseStatus() {
  this.report.getDatabaseStatus().subscribe( status => {
    this.databases = status;
    this.statuscheckDb=true;
  })
}

getApplicationData() {
  this.report.getApplicationData().subscribe( data => {
    this.applications = data;

    
  });
}

getApplicationStatus() {
  this.report.getApplicationStatus().subscribe( status=>{
  this.applications= status;
  this.statuscheckApp= true;
  
  
  });
}

getServerData() {
  this.report.getServerData().subscribe( data => {
    this.servers = data;
  });
}

getServerStatus() {
    this.report.getServerStatus().subscribe(status=>{
    this.servers=status;
    this.statuscheckServer=true;
  }
);

}

public hideCompleteGraph():void {
  var graph = document.getElementById('completeGraphView');
  if (graph.style.display === "block") {
    graph.style.display = "none";
  }
}

showCompleteGraph(pdata:any):void {
  localStorage.setItem('applicationId', pdata.applicationID);
  this.completeGraphName = pdata.applicationName;
  this.completeGraphUrl = pdata.applicationUrl;
  this.completeGraphStatus = pdata.applicationStatus;

    this.report.getParticularApplicationData().subscribe( Data => {
      this.dataFromUrl = Data;

      this.startDate = new Date(this.dataFromUrl[0].minDate);
      this.to_date = new Date(this.dataFromUrl[0].maxDate);
      this.from_date = new Date(this.dataFromUrl[0].minDate);
      this.to_date_form = new FormControl(this.to_date);
      this.from_date_form = new FormControl(this.from_date);
      this.minDateFrom = this.startDate;
      this.maxDateFrom = this.to_date;
      this.minDateTo = this.from_date;
      this.maxDateTo = this.to_date;

      const graph = document.getElementById('completeGraphView');
      if (graph.style.display === 'none') {
        graph.style.display = 'block';
      }
   });
   this.completeGraphStatuscheckApp = false;
  }

showServerCompleteGraph(pdata:any):void {
  localStorage.setItem('serverId', pdata.serverId);
  this.completeGraphName = pdata.serverName;
  this.completeGraphUrl = pdata.serverUrl;
  this.completeGraphStatus = pdata.serverStatus;

    this.report.getParticularServerData().subscribe( Data => {
      this.dataFromUrl = Data;

      this.startDate = new Date(this.dataFromUrl[0].minDate);
      this.to_date = new Date(this.dataFromUrl[0].maxDate);
      this.from_date = new Date(this.dataFromUrl[0].minDate);
      this.to_date_form = new FormControl(this.to_date);
      this.from_date_form = new FormControl(this.from_date);
      this.minDateFrom = this.startDate;
      this.maxDateFrom = this.to_date;
      this.minDateTo = this.from_date;
      this.maxDateTo = this.to_date;

      const graph = document.getElementById('completeGraphView');
      if (graph.style.display === 'none') {
        graph.style.display = 'block';
      }
  });
  this.completeGraphStatuscheckApp = false;
  }

ngOnDestroy(){
  // this.subscription.unsubscribe();
  this.alive = false; // switches your TimerObservable off
}
}
