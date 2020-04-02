import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

import { ReportService } from '../../shared/services/report.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup;
  tabsData: any = [];
  formattedTabData: any = [];

  constructor( private _reports: ReportService, private _router: Router) { }

  ngOnInit() {
    this.getTabs();
    this._reports.currentReportStatus.subscribe(value => {
        this.tabsData = [];
        this.formattedTabData = [];
        this.getTabs();
    });
  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  showTabs(tabname) {
    switch (tabname.toLowerCase()) {
      case 'pre-build check':
        this._router.navigate(['/project', 'pre-build']);
      break;

      case 'livebuild console':
        this._router.navigate(['/project', 'live-build']);
      break;

      case 'performance testing':
        this._router.navigate(['/project', 'performance']);
      break;

      case 'build':
        this._router.navigate(['/project', 'technical-debt']);
      break;

      case 'automation testing':
        this._router.navigate(['/project', 'e2e']);
      break;

      case 'diat':
        this._router.navigate(['/project', 'check-impact']);
      break;

      case 'gdpr':
        this._router.navigate(['/project', 'gdpr']);
      break;

      case 'ecosystem':
        this._router.navigate(['/project', 'ecosystem']);
      break;

      case 'data testing':
        this._router.navigate(['/project', 'dataTesting']);
      break;

      case 'security testing':
        this._router.navigate(['/project', 'securityTesting']);
      break;

      case 'notifications':
        this._router.navigate(['/project', 'securityTesting']);
      break;
    }
  }

  getTabs() {
    this._reports.getBuildHistoryData().subscribe(data => {
      for (let key in data['BuildHistory']) {
        this.tabsData.push(key.toLowerCase());
      }
      // filtering report data for tabs 
      this.formattedTabData = this.tabsData.filter((val, i) => val !== 'build_history_id' && val !== 'timestamp');
      this.orderingTabs();
    });
  }

  orderingTabs() {
    for (let i = 0; i < this.formattedTabData.length; i++) {
      let tab: any;
      switch (this.formattedTabData[i].toLowerCase()) {
        case 'prebuildcheck':
          tab = {
            name:"pre-build check",
            order: 1
          }
        break;

        case 'diat':
          tab = {
            name: this.formattedTabData[i],
            order: 2
          }
        break;

        case 'livebuildconsole':
          tab = {
            name:"livebuild console",
            order: 3
          }
        break;

        case 'build':
          tab = {
            name: this.formattedTabData[i],
            order: 4
          }
        break;

        case 'automationtesting':
          tab = {
            name:"automation testing",
            order: 5
          }
        break;

        case 'datatesting':
          tab = {
            name:"data testing",
            order: 6
          }
        break;

        case 'performancetesting':
          tab = {
            name:"performance testing",
            order: 7
          }
        break;

        case 'securitytesting':
          tab = {
            name:"security testing",
            order: 8
          }
        break;

        case 'notifications':
          tab = {
            name: this.formattedTabData[i],
            order: 8
          }
        break;


        case 'gdpr':
        tab = {
          name: "gdpr",
          order: 9
        }
      break;
      }
      this.formattedTabData[i] = tab;
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('Tab index => ', tabChangeEvent.tab.textLabel);
    this.showTabs(tabChangeEvent.tab.textLabel);
  }
}
