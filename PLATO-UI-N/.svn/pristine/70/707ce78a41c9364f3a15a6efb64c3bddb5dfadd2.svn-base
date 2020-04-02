import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-technical-debt',
  templateUrl: './technical-debt.component.html',
  styleUrls: ['./technical-debt.component.css']
})
export class TechnicalDebtComponent implements OnInit {

  sonar_url: string;
  testright_engine_url: string;
  testright_analysis_url: string;
  chartData: any[];
  chartDataJunit:any[];
  chartDataTestNg:any[];
  duckcreektable:any[];

  public barChartData:any[] =[];
  public barChartLabels:any[] =['errors', 'passed','failures','skipped'];

  testrightReport: any;
  staticCodeReport: any;
  duckcreekReport: any;
  testsReport: any;
  loginReport: any;
  accountReport: any;
  issuesReport: any;
  complexityReport: any;
  duplicationsReport: any;
public demobarChartData:any[]=[5,6,3,2,8];
public demobarChartLabels:string[]=['a','b','c','d','e'];

public barChartOptions: any = {
  responsive: true,
  legend: {
    display: true,
    labels: {
        fontColor: 'black',
        boxWidth:0

    }
},
tooltips: {
  enabled: true
},
  animation: {
      onComplete: function () {
          var chartInstance = this.chart,
              ctx = chartInstance.ctx;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
  }

};
  public SCRbarChartLabels:string[] = [];
  public SCRbarChartData:string[] = [];
  // public SCRbarChartData:string[] = ['4101','372','21.2','10838'];
  public testsbarChartLabels:string[] = [];
  public testsbarChartData:string[] = [];
  public duckcreekbarChartData:string[] = [];
  public duckcreekbarChartLabels:string[] = [];
  public loginbarChartLabels:string[] = [];
  public loginbarChartData:string[] = [];
  public accountbarChartLabels:string[] = [];
  public accountbarChartData:string[] = [];

  public issuesbarChartLabels:string[] = [];
  public issuesbarChartData: string[] = [];
  public complexitybarChartLabels: string[] = [];
  public complexitybarChartData: string[] = [];
  public duplicationsbarChartLabels: string[] = [];
  public duplicationsbarChartData: string[] = [];
  public barChartType = 'bar';

  public barChartColors: Array<any> = [{
    backgroundColor: ['skyblue','skyblue','skyblue','skyblue','skyblue','skyblue','skyblue','skyblue']
  }];

  public testsbarChartColors: Array<any> = [{
    backgroundColor: ['skyblue','skyblue','blue','skyblue','skyblue','skyblue','skyblue','skyblue']
  }];

  public SCRbarChartColors: Array<any> = [{
    backgroundColor: ['skyblue','rgb(237, 88, 99)','rgb(130, 227, 164)','pink','blue','lime','gray','yellow']
  }];

  public duckcreekbarChartColors: Array<any> = [{
    backgroundColor: ['skyblue','rgb(237, 88, 99)','rgb(130, 227, 164)','pink','blue','lime','gray','yellow']
  }];

  constructor(private report: ReportService, private config: AppConfig) {
    this.sonar_url = this.config.getConfig('sonar_url');
    this.testright_engine_url = this.config.getConfig('testright_engine_url');
    this.testright_analysis_url = this.config.getConfig('testright_analysis_url');
  }

  ngOnInit() {
    this.getSonarData();
    this.getUnitTestingData();
    this.getDuckcreekTestingData();
    this.getTestRightReport();
  }


  hideandshowreport(tool_report) {
    var x = document.getElementById(tool_report);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    }
    else if (x.style.display === 'block') {
      x.style.display = 'none';

    }
  }

  hideandshowtestreport(tool_report){
    var x = document.getElementById(tool_report);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    }
    else if (x.style.display === 'block') {
      x.style.display = 'none';

    }
  }

  hideandshowDuckcreekreport(tool_report) {
    var x = document.getElementById(tool_report);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    }
    else if (x.style.display === 'block') {
      x.style.display = 'none';

    }
  }

  getSonarData(){

    this.report.getBuildHistoryData().subscribe( data => {
      this.staticCodeReport =data.BuildHistory.Build.StaticCodeAnalysis.Sonar.total;
      console.log('printing staticCodeReport');
      console.log(this.staticCodeReport);
      this.issuesReport = data.BuildHistory.Build.StaticCodeAnalysis.Sonar.issues;
      this.complexityReport = data.BuildHistory.Build.StaticCodeAnalysis.Sonar.complexity;
      this.duplicationsReport = data.BuildHistory.Build.StaticCodeAnalysis.Sonar.duplications;
    // this.testsReport=data.BuildHistory.Build.unit_testing.j_unit.tests_total;
      console.log('technical debt >> ');
      console.log(this.staticCodeReport);
      for ( let key in this.staticCodeReport ) {
        this.SCRbarChartLabels.push(key);
        console.log(key);
        this.SCRbarChartData.push(this.staticCodeReport[key]);
        console.log('MAIN data :: ' + this.staticCodeReport[key]);
      }

      for (let i=0; i < this.SCRbarChartData.length; i++) {
        this.SCRbarChartData[i] = this.SCRbarChartData[i].replace(/[&\/\\#,dhm+()$~%'":*?<>{}]/g, '');
      }

      for( let key in this.issuesReport ) {
        this.issuesbarChartLabels.push(key);
        this.issuesbarChartData.push(this.issuesReport[key]);
        console.log(key);
        console.log('data is:: ' + this.issuesReport  [key]);
      }
      for(let i=0;i<this.issuesbarChartData.length; i++){
        this.issuesbarChartData[i]=this.issuesbarChartData[i].replace(',', "")
      }

      for( let key in this.complexityReport ) {
        this.complexitybarChartLabels.push(key);
        this.complexitybarChartData.push(this.complexityReport[key]);
        console.log(key);
        console.log('data is:: ' + this.complexityReport  [key]);
      }
      for(let i=0;i<this.complexitybarChartData.length; i++){
        this.complexitybarChartData[i]=this.complexitybarChartData[i].replace(',', "")
      }

      for( let key in this.duplicationsReport ) {
        this.duplicationsbarChartLabels.push(key);
        this.duplicationsbarChartData.push(this.duplicationsReport[key]);
        for(let i=0;i<this.duplicationsbarChartData.length; i++){
          this.duplicationsbarChartData[i]=this.duplicationsbarChartData[i].replace(',', "")
        }
        console.log(key);
        console.log('duplications data is:: ' + this.duplicationsReport[key]);
      }

    });

  }

  getUnitTestingData(){
    this.report.getBuildHistoryData().subscribe( data => {
      this.testsReport=data.BuildHistory.Build.unit_testing.j_unit.testTotal;
      for ( let key in this.testsReport ) {
        this.testsbarChartLabels.push(key);
        console.log(key);
        this.testsbarChartData.push(this.testsReport[key]);
        console.log('Test data :: ' + this.testsReport[key]);
      }
      //this.chartData = data.BuildHistory.Build.unit_testing;
      console.log("before error");
      this.chartDataJunit = data.BuildHistory.Build.unit_testing.j_unit.tests;
      console.log("error");
      this.chartDataTestNg = data.BuildHistory.Build.unit_testing.TestNg.tests;


    });

  }

  getDuckcreekTestingData(){
    this.report.getBuildHistoryData().subscribe( data =>{
      this.duckcreekReport = data.BuildHistory.Build.duckCreek_manuscript_analyzer;
      for ( let key in this.duckcreekReport) {
        this.duckcreekbarChartLabels.push(key);
        console.log(key);
        this.duckcreekbarChartData.push(this.duckcreekReport[key]);
        console.log(this.duckcreekbarChartData);
      }
    })

    this.report.getduckcreektabledata().subscribe( data => {
      this.duckcreektable = data;
    });

  }

  getTestRightReport(){
    this.testrightReport = localStorage.getItem('testrightUrl');
  }
}
