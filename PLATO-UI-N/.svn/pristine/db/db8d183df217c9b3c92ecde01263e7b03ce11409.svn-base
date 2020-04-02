import { Component,OnDestroy, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/services/report.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-live-build-with-video',
  templateUrl: './live-build-with-video.component1.html',
  styleUrls: ['./live-build-with-video.component.css']
})
export class LiveBuildWithVideoComponent implements OnInit,OnDestroy {

  private alive = false;
  tools: any[] = [];
  automationTools: any[] = [];
  dataTestingtools: any[] = [];
  performanceTools: any[] = [];
  securityTool: any[] = [];

  sentToALM: any[] = [];
  ladybugRespondedTools: any[]= [];
  alreadySenttools: any[] = [];

  constructor(private report: ReportService, private router: Router, private _message: MessageService) {}

  ngOnInit() {
    this.applicationUnderTest();
    TimerObservable.create(5000, 5000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.applicationUnderTest();
    });
  }

  ngOnDestroy() {
    this.alive = false; // switches your TimerObservable off
  }

  openApplication(tool_name) {
    var x = document.getElementById(tool_name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  applicationUnderTest() {
    this.alive = true;
    this.automationTools = [];
    this.performanceTools = [];
    this.dataTestingtools = [];
    this.securityTool = [];

    this.report.getBuildHistoryData().subscribe( data => {
      this.tools = data.BuildHistory.LiveBuildConsole.tools;

      if (data.BuildHistory.AutomationTesting) {
        this.automationTools = data.BuildHistory.AutomationTesting.Tools;
      }
      if (data.BuildHistory.DataTesting) {
        this.dataTestingtools = data.BuildHistory.DataTesting.Tools;
      }
      if (data.BuildHistory.PerformanceTesting) {
        this.performanceTools = data.BuildHistory.PerformanceTesting.Tools;
      }
      if (data.BuildHistory.SecurityTesting) {
        this.securityTool = data.BuildHistory.SecurityTesting.Tools;
      }

      this.sendladyBugNotifications();

      const overAllStatus = localStorage.getItem('overallstatus');
      if (overAllStatus.toLowerCase() !== 'in-progress') {
        this.updateALMStatus(data);
        console.log('stopping refreshing live build console.');
        this.alive = false;
      }
    });
  }

  AbortJenkins(job_name, build_number) {
    localStorage.setItem('job_name', job_name);
    localStorage.setItem('build_number', build_number);
    this.report.abortJob().subscribe( data => {
      console.log(data);
    });
  }

  //for ladybug alert
  sendladyBugNotifications() {
    // extract ladybug responded tools
    this.ladybugRespondedTools = this.tools;
    this.ladybugRespondedTools = this.ladybugRespondedTools.filter((val, i) => val.ladyBugNotification === 'success');
    console.log('ladybug responded tools >>>>');
    console.log(this.ladybugRespondedTools);
    if (this.ladybugRespondedTools.length <= 0) {
      console.log('Nothing to notify.');
      return 0;
    }

    // concat all report data
    let allTools = this.automationTools.concat(this.performanceTools.concat(this.dataTestingtools.concat(this.securityTool)));
    let matchedTools = [];

    // matched tools with all report data
    this.ladybugRespondedTools.forEach(tool => {
      // remove already sent report data
      if (this.alreadySenttools.length > 0) {
        this.alreadySenttools.forEach(ele => {
          console.log('already Sent tool >>>>');
          console.log(ele);
          allTools = allTools.filter((val, i) => val.tool_name !== ele.tool_name);
        });
      }
      const matchArr = allTools.filter((val, i) => val.tool_name === tool.tool_name);

      // checking data already present or not
      if (!this.alreadySenttools.includes(matchArr[0])) {
        this.alreadySenttools.push(matchArr[0]);
        console.log('save sent tool.');
        console.log(this.alreadySenttools);
      } else {
        console.log('already exists tools >>>> ');
        console.log(matchArr[0]);
      }
      matchedTools.push(matchArr[0]);
    });
    console.log('matched tools >>>>');
    console.log(matchedTools);

    const overAllStatus = localStorage.getItem('overallstatus');
    if (overAllStatus.toLowerCase() === 'in-progress' && matchedTools.length > 0) {
      console.log('ladybug is called for matched passed/failed tools >> ');
      const ladyBug = {
      user: JSON.parse(localStorage.getItem('userData')),
      current_portfolio_name: localStorage.getItem('portfolio_name'),
      current_account_name: localStorage.getItem('account_name'),
      current_project_name: localStorage.getItem('project_name'),
      isExecutionCompleted: localStorage.getItem('overallstatus'),
      successTools: matchedTools // send only matched passed/failed tools
    };
    this.report.sendLadyBugNotification(ladyBug).subscribe(data => {});
    } else if (overAllStatus.toLowerCase() !== 'in-progress' && matchedTools.length > 0) {
      console.log('ladybug is called for passed/failed report >> ');
      const ladyBug = {
      user: JSON.parse(localStorage.getItem('userData')),
      current_portfolio_name: localStorage.getItem('portfolio_name'),
      current_account_name: localStorage.getItem('account_name'),
      current_project_name: localStorage.getItem('project_name'),
      isExecutionCompleted: localStorage.getItem('overallstatus'),
      successTools: this.automationTools.concat(
        this.performanceTools.concat(
          this.dataTestingtools.concat(
            this.securityTool)
          )
        ), // send all tools data on completion
    };
    this.report.sendLadyBugNotification(ladyBug).subscribe(data => {});
    } else {
      console.log('No tools found to notify in Ladybug.');
    }
  }

  updateALMStatus(report) {
    this.report.sendToALM(report).subscribe(data => {
      console.log('refreshing live build console after updating ALM >>>>');
      this.tools = data.BuildHistory.LiveBuildConsole.tools;
      this.report.updateALMResponse(data).subscribe(data => {
        console.log('updating report data in MongoDB after updating ALM >>>>');
      });
    },
    err => {
      console.error('unable to update ALM');
      console.error(err);
      // this._message.clear();
      // this._message.add({
      //   severity: 'error',
      //   summary: 'ALM update request',
      //   detail: 'HTTP Error & Status: ' + err.status
      // });
    });
  }
}


