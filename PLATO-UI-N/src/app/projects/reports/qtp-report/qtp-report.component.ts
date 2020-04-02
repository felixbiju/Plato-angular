import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';

@Component({
  selector: 'app-qtp-report',
  templateUrl: './qtp-report.component.html',
  styleUrls: ['./qtp-report.component.css']
})
export class QtpReportComponent implements OnInit {

  error_details = {
    tool_name: '',
    code: '',
    type: '',
    name: '',
    msg: '',
    stackTrace: ''
  };
  xcheckreports: any[];
  eachtooldata:any[];
  table_name: string;
  failed: string;
  passed: string;
  total: string;
  ToolData: any[];

  constructor(private report: ReportService) { }

  ngOnInit() {
    this.report.getqtpreportdata().subscribe( data => {
      alert('dsds');
      this.xcheckreports = data.BuildHistory.AutomationTesting.Tools;
      this.ToolData = this.xcheckreports;
      console.log(this.xcheckreports);
      this.ToolData.forEach(tool => {
        if (tool.stackTrace) {
          console.error(tool.stackTrace);
        }
      });
    });
  }

  hideandshowreport(tool_report) {
    var x = document.getElementById(tool_report);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else if (x.style.display === "none") {
      x.style.display = "block";
    }
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
    document.getElementById(this.table_name).style.display = 'none';
    document.getElementById('reportpopup').style.display = 'none';
  }


  showtable(table_chart_name) {
    this.table_name = table_chart_name;
    let x = document.getElementById(table_chart_name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    }
  }

  hidetable(){
    let x = document.getElementById(this.table_name);
    if (x.style.display === 'block') {
      x.style.display = 'none';
      document.getElementById('reportpopup').style.display = 'none';
    }
  }

  showComponent(xcheckpage) {
  localStorage.setItem("xcheckpagecomponent",JSON.stringify(xcheckpage));
  this.eachtooldata = xcheckpage.components;
  console.log(this.eachtooldata);
  this.passed = xcheckpage.passed;
  this.failed = xcheckpage.failed;
  this.total = xcheckpage.total_test_cases;
  }
}
