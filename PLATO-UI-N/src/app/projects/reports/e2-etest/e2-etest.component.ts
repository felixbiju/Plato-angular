import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-e2-etest',
  templateUrl: './e2-etest.component.html',
  styleUrls: ['./e2-etest.component.css']
})

export class E2EtestComponent implements OnInit {

  error_details = {
    tool_name: '',
    code: '',
    type: '',
    name: '',
    msg: '',
    stackTrace: ''
  };
  expanddata: any[1];
  ToolData: any[];
  chartmap = new Map();
  eachtooldata: any[];
  xcheckreports: any[];
  report_url: string;
  tool_chartkey: any[];
  tool_chartvalue: any[];
  screenshotarray: any[];
  data1: any[];
  dynamic: string;
  table_name: string;
  mypageTitle: string;
  execution_time: string;
  tool_name: string;
  doc_name: string;
  doc_url: string;
  failed: string;
  passed: string;
  total: string;
  selectedTitle = 0;
  showBarGraph:boolean = false;
  multiUrlTestString:string = "http://172.25.32.81:8080/plato,,,http://172.25.32.81:8080/jenkins,,,http://172.25.32.81:8080";

  public barChartType = "horizontalBar";
  public barchartlegend = true;
  public barChartColors: Array<any> = [
    {
      backgroundColor: "rgb(100, 221, 23)",
      borderColor: "white"
    },
    {
      backgroundColor: "rgb(210, 0, 0)",
      borderColor: "white"
    },
    {
      backgroundColor: "rgb(156, 204, 221)",
      borderColor: "white"
    }
  ];
  public barChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "black",
        boxWidth: 30
      }
    },
    tooltips: {
      enabled: true
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.5
        }
      ],
      yAxes: [
        {
          stacked: true,
          barPercentage: 0.5
        }
      ]
    }
  };

  newObj = [];
  public pieChartType = "pie";
  public piechartlegend = true;
  public piechartoptions = {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10
      }
    }
  };

  public pieChartColors: Array<any> = [
    {
      backgroundColor: [
        "rgb(100, 221, 23)",
        "rgb(210, 0, 0)",
        "rgb(156, 204, 221)"
      ],
      borderColor: "white"
    }
  ];

  showtable(table_chart_name) {
    this.table_name = table_chart_name;
    let x = document.getElementById(table_chart_name);
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  hidetable() {
    document.getElementById("reportpopup").style.display = "none";
    this.xcheckreports = [];
    this.report_url = '';
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
    var x = document.getElementById(tool_report);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  constructor(private _report: ReportService) {}

  ngOnInit() {
    this.getBuildHistoryData();
  }

  getBuildHistoryData() {
    this._report.getBuildHistoryData().subscribe(data => {
      const livestatus = data.BuildHistory.LiveBuildConsole.tools;
      this.ToolData = data.BuildHistory.AutomationTesting.Tools;
      for (let i = 0; i < this.ToolData.length; i++) {
        for(let j = 0; j < this.ToolData[i].ToolReport.length; ++j){
          this.ToolData[i].ToolReport[j].LinkList = <string>this.ToolData[i].ToolReport[j].report_url.split(",,,");
          this.ToolData[i].ToolReport[j].LinkListName = [];
          for(let k = 0; k < this.ToolData[i].ToolReport[j].LinkList.length; ++k){
            this.ToolData[i].ToolReport[j].LinkListName.push(this.ToolData[i].ToolReport[j].LinkList[k].split("/").pop());
            console.log("TEST----->" + this.ToolData[i].ToolReport[j].LinkListName[k] + "<-----TEST");
          }
        }
        this.showBarGraph = false;
        this.dynamic = data.BuildHistory.AutomationTesting.Tools[i].dynamic;
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
    this.report_url = '';
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

  particulartool(particulartooldata) {
    this.tool_name = particulartooldata.chart_name;
    this.doc_name = particulartooldata.documentName;
    this.doc_url = particulartooldata.documentUrl;
    this.execution_time = particulartooldata.total_execution_time;
    this.tool_chartkey = particulartooldata.chart_labels;
    this.tool_chartvalue = particulartooldata.chart_values;

    for (let i = 0; i < this.tool_chartvalue.length; i++) {
      const obj = {
        label: this.tool_chartkey[i],
        value: this.tool_chartvalue[i]
      };
      this.newObj.push(obj);
    }

    if(particulartooldata.tabular_data) {
      this.xcheckreports = particulartooldata.tabular_data;
      this.eachtooldata = particulartooldata.tabular_data[0].components;
      this.data1 = this.eachtooldata[0];
      this.mypageTitle = particulartooldata.tabular_data[0].pageTitle;
      this.screenshotarray = particulartooldata.tabular_data[0].screenShots;
    }

    if(particulartooldata.report_url) {
      this.report_url = particulartooldata.report_url;
    }
  }

  showComponent(xcheckpage) {
    localStorage.setItem("xcheckpagecomponent", JSON.stringify(xcheckpage));
    this.eachtooldata = xcheckpage.components;
    this.mypageTitle = xcheckpage.pageTitle;
    this.screenshotarray = xcheckpage.screenShots;
    this.passed = xcheckpage.passed;
    this.failed = xcheckpage.failed;
    this.total = xcheckpage.total_test_cases;
  }

  setClickedTitle(index) {
    this.selectedTitle = index;
  }

  openURL(url) {
    window.open(url, "_blank");
  }

  toDataURL(url) {
    return fetch(url).then((response) => {
        return response.blob();
      }).then(blob => {
        return URL.createObjectURL(blob);
    });
  }
  async downloadURL(url) {
    const a = document.createElement("a");
    a.href = await this.toDataURL(url);
    a.download = "screenshot";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
