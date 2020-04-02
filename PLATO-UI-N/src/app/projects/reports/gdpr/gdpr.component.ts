import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
import {Observable} from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent implements OnInit {

  error_details = {
    tool_name: '',
    code: '',
    type: '',
    name: '',
    msg: '',
    stackTrace: ''
  };
  ToolData: any[];
  chartmap = new Map();
  eachtooldata: any[];
  xcheckreports: any[];
  tool_chartkey: any[];
  tool_chartvalue: any[];
  screenshotarray: any[];
  table_name: string;
  mypageTitle: string;
  tool_name: string;
  doc_name: string;
  doc_url: string;
  failed: string;
  passed: string;
  total: string;
  selectedTitle = 0;
  newObj = [];
  sensitiveFieldCountInTable: number;
  public barChartType = 'bar';
  public barchartlegend = false;

  public barChartColors: Array<any> = [
    {
      backgroundColor: ['rgb(130, 227, 164)', 'rgb(237, 88, 99)', 'rgb(156, 204, 221)'],
      borderColor: 'white'
    }
  ];

  constructor(private _report: ReportService) { }

  ngOnInit() {
    this.getBuildHistoryData();
  }

  showtable(table_chart_name) {
    this.table_name = table_chart_name;
    let x = document.getElementById(table_chart_name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    }
  }

  hidetable() {
    document.getElementById('reportpopup').style.display = 'none';
    this.xcheckreports = [];
    this.eachtooldata = [];
    this.passed = null;
    this.failed = null;
    this.total = null;
    this.mypageTitle = null;
    this.tool_name = null;
    this.selectedTitle = 0;
    this.tool_chartkey = [];
    this.tool_chartvalue = [];
    this.chartmap.clear();
    this.newObj = [];
    this.screenshotarray = [];
  }

  hideandshowreport(tool_report) {
    let x = document.getElementById(tool_report);
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else if (x.style.display === 'none') {
      x.style.display = 'block';
    }
  }

  getBuildHistoryData(){
    this._report.getBuildHistoryData().subscribe( data => {
      this.ToolData = data.BuildHistory.GDPR.Tools;
      console.log(this.ToolData);
      for (let i = 0; i < this.ToolData.length; i++) {
        // this.dynamic = data.BuildHistory.AutomationTesting.Tools[i].dynamic;
        // console.log('status >> ' + JSON.stringify(this.dynamic));
        if (this.ToolData[i].stackTrace) {
          console.error(this.ToolData[i].stackTrace);
        }
      }
    });
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

  closeTableAndModal() {
    document.getElementById('reportpopup').style.display = 'none';
    this.xcheckreports = [];
    this.eachtooldata = [];
    this.passed = null;
    this.failed = null;
    this.total = null;
    this.mypageTitle = null;
    this.tool_name = null;
    this.selectedTitle = 0;
    this.tool_chartkey = [];
    this.tool_chartvalue = [];
    this.chartmap.clear();
    this.newObj = [];
    this.screenshotarray = [];

  }


  particulartool(particulartooldata){
    this.tool_name = particulartooldata.chart_name;
    this.doc_name = particulartooldata.documentName;
    this.doc_url = particulartooldata.documentUrl;

    this.tool_chartkey = particulartooldata.chart_labels;
    this.tool_chartvalue = particulartooldata.chart_values;

    for (let i = 0; i < this.tool_chartvalue.length; i++) {
      const obj = {
        label: this.tool_chartkey[i],
        value: this.tool_chartvalue[i]
      };
      this.newObj.push(obj);
    }

    this.xcheckreports = particulartooldata.tabular_data;
    this.eachtooldata = particulartooldata.tabular_data[0].components;
    this.sensitiveFieldCountInTable = particulartooldata.tabular_data[0].components.length;
    this.mypageTitle = particulartooldata.tabular_data[0].pageTitle;

    this.screenshotarray = particulartooldata.tabular_data[0].screenShots;
  }

  showComponent(xcheckpage) {
    localStorage.setItem('xcheckpagecomponent', JSON.stringify(xcheckpage));
    this.eachtooldata = xcheckpage.components;
    this.sensitiveFieldCountInTable = xcheckpage.components.length;
    this.mypageTitle = xcheckpage.pageTitle;
    this.screenshotarray = xcheckpage.screenShots;
    this.passed = xcheckpage.passed;
    this.failed = xcheckpage.failed;
    this.total = xcheckpage.total_test_cases;
  }

  setClickedTitle(index) {
    this.selectedTitle = index;
  }
}
