import { Component, OnInit } from '@angular/core';

import { ChangeimpactService } from '../../shared/services/changeimpact.service';
import { PermissionService } from '../../shared/services/permissions.service';
import { ReportService } from '../../shared/services/report.service';


declare var getDiatReportLive: any;

@Component({
  selector: 'app-changeimpact',
  templateUrl: './change-impact.component.html',
  styleUrls: ['./change-impact.component.css']
})
export class ChangeImpactComponent implements OnInit {

  diatcommand: string;
  isDisabled = true;
  compareddata: any[];
  showdata: any[];
  screenPermission: any[];

  constructor(private _impactService: ChangeimpactService, private _permissions: PermissionService, private report: ReportService) { }

  ngOnInit() {

    this.getPermissions();
    this.getCommandForDIAT();
    this.showComparison();
  }

  getPermissions() {
    this._permissions.getAllPermissions().subscribe(permisssion => {
      permisssion.permissionData.forEach(module => {
        if (module.moduleName === 'Project Module') {
          module.screens.forEach(screen => {
            if (screen.screenName === 'Impact Change Screen') {
              this.screenPermission = screen.components;
            }
          });
        }
      });
      console.log(this.screenPermission);
    });
  }

  getCommandForDIAT() {
    this._impactService.getchangeimpactpath().subscribe( data => {
      this.isDisabled = false;
      // changes for aarya's requirements
      // this.diatcommand = data.commandToExecute;

      // changes for RSA' PoC requirements
      this.diatcommand = 'Recent Report sheet.xlsx';
    });
  }

  getComparison() {
    localStorage.removeItem('comparedata');
    this.showComparison();
    this._impactService.getComparison().subscribe( data=> {
      this.compareddata = data;
      localStorage.setItem('comparedata',JSON.stringify(this.compareddata));
      getDiatReportLive(this.compareddata);
    });
  }

  showComparison() {
    const showcomparedata = JSON.parse(localStorage.getItem('comparedata'));
    this.showdata = showcomparedata;
    getDiatReportLive(showcomparedata);
  }

  // changes for RSA's PoC
  getDIATForRSA(reportPath) {
    // console.log(reportPath);
    // localStorage.removeItem('comparedata');
    // this.showComparison();
    // this._impactService.getDIATForRSA(reportPath).subscribe( data => {
    //   console.log('DIAT Json >>>>');
    //   console.log(data);
    //   this.compareddata = data;
    //   localStorage.setItem('comparedata',JSON.stringify(this.compareddata));
    //   getDiatReportLive(this.compareddata);
    // });
    this.report.demodiatjson(). subscribe( data =>{
      this.compareddata = data;
      console.log('cccc' + JSON.stringify(this.compareddata));
      getDiatReportLive(this.compareddata);
});
  }}
