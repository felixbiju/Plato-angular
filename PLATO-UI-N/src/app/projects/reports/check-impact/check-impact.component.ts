import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
// import  '../../../../assets/diat_hardcoded.json';

declare var getDiatReportLive: any;

@Component({
  selector: 'app-check-impact',
  templateUrl: './check-impact.component.html',
  styleUrls: ['./check-impact.component.css']
})
export class CheckImpactComponent implements OnInit {

  diatreport: any[];

  constructor(private report: ReportService) { }

  ngOnInit() {
    this.getCheckImpactData();
  }

  // getCheckImpactData(){
  //   this.report.demodiatjson(). subscribe( data =>{
  //     this.diatreport = data;
  //     console.log('bbbb' + JSON.stringify(this.diatreport));
  //     getDiatReportLive(this.diatreport);
  //   });}
    getCheckImpactData(){
    this.report.getBuildHistoryData().subscribe( data => {
      this.diatreport = data.BuildHistory.Diat;
      console.log(this.diatreport);
      console.log("diatreport >> "+ JSON.stringify(this.diatreport));
      getDiatReportLive(this.diatreport);
    });
  }

}
