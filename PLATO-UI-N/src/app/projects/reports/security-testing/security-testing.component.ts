import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from "rxjs/Subscription";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-security-testing',
  templateUrl: './security-testing.component.html',
  styleUrls: ['./security-testing.component.css']
})

export class SecurityTestingComponent implements OnInit {

  error_details = {
    tool_name: '',
    code: '',
    type: '',
    name: '',
    msg: '',
    stackTrace: ''
  };
  ToolData: any[];
  table_name: string;
  public pieChartType = 'pie';
  public piechartlegend = true;
  public piechartoptions = {legend: {position:'bottom',labels:{boxWidth:10} }};

  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['rgb(130, 227, 164)','rgb(237, 88, 99)','rgb(156, 204, 221)'],
      borderColor: 'white'
    }
  ];

  showtable(table_chart_name){
    this.table_name = table_chart_name;
    var x = document.getElementById(table_chart_name);
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  hidetable(){
    let x = document.getElementById(this.table_name);
    if (x.style.display === 'block') {
      x.style.display = 'none';
      document.getElementById('reportpopup').style.display = 'none';
    }
  }

  hideandshowreport(tool_report){
    var x = document.getElementById(tool_report);
    if (x.style.display === "none") {
      x.style.display = "block";
    }
    else if (x.style.display === "block") {
      x.style.display = "none";
    }
  }

  constructor(private _report: ReportService) { }

  ngOnInit() {
    this.getBuildHistoryData();
  }

  openModal(modalName: string, toolData: any) {
    if (toolData.stackTrace || toolData.error_body) {
      this.error_details.tool_name = toolData.tool_name;
      this.error_details.stackTrace = toolData.stackTrace;
      this.error_details.name = toolData.error_body.name;
      this.error_details.type = toolData.error_body.type;
      this.error_details.code = toolData.error_body.code;
      this.error_details.msg = toolData.error_body.error_message;
    }
    document.getElementById(modalName).style.display = 'block';
  }

  closeModal(modalName: string) {
    document.getElementById(modalName).style.display = 'none';
  }

  getBuildHistoryData(){
    this._report.getBuildHistoryData().subscribe( data => {
      this.ToolData = data.BuildHistory.SecurityTesting.Tools;
      console.log(this.ToolData);
      this.ToolData.forEach(tool => {
        if (tool.stackTrace) {
          console.error(tool.stackTrace);
        }
      });
    });
  }

  closeTableAndModal() {
    document.getElementById(this.table_name).style.display = 'none';
    document.getElementById('reportpopup').style.display = 'none';
  }
}
