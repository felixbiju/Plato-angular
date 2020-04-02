import { SelectItem } from 'primeng/components/common/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { NgForm } from '@angular/forms';
import "rxjs/add/operator/takeWhile";

import { MessageService } from 'primeng/components/common/messageservice';
import { PortfolioService } from '../shared/services/portfolio.service';
import { ProjectService } from '../shared/services/project.service';
import { LoginService } from '../shared/services/login.service';
import { ModuleService } from '../shared/services/module.service';
import { AccountService } from '../shared/services/account.service';
import { LoaderService } from '../shared/services/loader.service';
import { ReportService } from '../shared/services/report.service';
import { PermissionService } from '../shared/services/permissions.service';

import { Module } from '../shared/model/Module';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnDestroy, OnInit {

  placeholder: string;
  buildHistories: any[];
  lastBuildHistoryStatus : string;
  lastBuildHistoryID : number = 0;

  newModule = new Module();
  scmPollTimer: string = '';
  periodicBuildTimer: string = '';

  selectedPortfolioName = '';
  selectedAccountName = '';
  selectedProjectName = '';
  module_name = '';
  selectedModuleName = '';

  errMsg: string;
  portfolios: any[];
  accounts: any[];
  projects: any[];
  modules: any[];
  tooldata: any[]=[];
  refresh = false;
  refreshTime: number;

  showStartingProgress = false;
  isReportsSelected: boolean;
  selectedHistory: Number;
  isExecutionDisabled = false;
  expandBuildHistory = false;
  screenPermission: any[];

  constructor( private route: ActivatedRoute, private router: Router, private account: AccountService, private login: LoginService,
               private moduleService: ModuleService, private project: ProjectService, private portfolio: PortfolioService,
               private message: MessageService, private loader: LoaderService, private _report: ReportService,
               private _permissions: PermissionService) {
  }

  ngOnInit() {
    const sub = this.route
    .queryParams
    .subscribe(params => {
      console.log(params['action']);
      if(params['action'] === 'run') {
        this.executeModule();
      }
    });
    this.callDefaultFunctions();
  }

  ngOnDestroy() {
    this.refresh = false;
    localStorage.removeItem('reportStatus');
  }

  getScheduleBuild() {
    this.moduleService.getSchedule().subscribe( data => {
    console.log(data);
     data.moduleJobsJenkinsParametersList.forEach(parameter => {
       if (parameter.parameter_key ===  'scm_timer')
        {
        this.scmPollTimer = parameter.value;
        console.log(this.scmPollTimer);
        }
        else if (parameter.parameter_key === 'timer_trigger')
       {
         this.periodicBuildTimer = parameter.value;
       }
    });
},
  error => {
    this.modules = null;
    this.message.add({
      severity: 'error',
      summary: 'Module Request -',
      detail: error._body,
    });
  });
}

  scheduleModule() {

    this.newModule.moduleJobsJenkinsParametersList.length = 0;
    if (this.scmPollTimer === 'null') {
      this.scmPollTimer = '';
    }
    if (this.periodicBuildTimer === 'null') {
      this.periodicBuildTimer = '';
    }
    this.newModule.moduleJobsJenkinsParametersList.push({
    id: 0,
    parameter_key: 'scm_timer',
    value: this.scmPollTimer
    });
    this.newModule.moduleJobsJenkinsParametersList.push({
        id: 0,
        parameter_key: 'timer_trigger',

        value: this.periodicBuildTimer
      });
      this.newModule.jenkins_job_name = localStorage.getItem('module_name');    this.newModule.description = '';
      console.log(this.newModule);
      this.moduleService.scheduleBuild(this.newModule).subscribe(data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Schedule Build',
        detail: 'Build scheduled successfully.',
      });
    }, err => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Schedule Build',
        detail: err._body,
      });
    });

  }


  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          console.log('undefined');
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName === 'Project Module') {
              module.screens.forEach(screen => {
                if (screen.screenName === 'Project Screen') {
                  this.screenPermission = screen.components;
                  console.log('screen permissions');
                  console.log(this.screenPermission);
                }
              });
            }
          });
        }
      });
    });
  }

  callDefaultFunctions() {
    this.refreshBuildHistory();
    this.getPermissionByRole();

    if (localStorage.getItem('reportStatus') === 'true') {
      this.isReportsSelected = true;
    } else {
      this.isReportsSelected = false;
    }

    this._report.currentReportStatus.subscribe(value => {
      this.isReportsSelected = value;
      localStorage.setItem('reportStatus', JSON.stringify(value));
    });

    this.module_name = localStorage.getItem('module_name');
    this.placeholder = localStorage.getItem('module_name');

    this.getStoredNames();
    this.getPortfolioList();
    this.getAccountList();
    this.getProjectList();
    this.getBuidHistory(this.module_name, localStorage.getItem('module_id'), localStorage.getItem('module_description'));
  }

  refreshBuildHistory() {
    console.log('start refreshing build history list...');
    this.getLastbuildHistoryId();
    console.log('lastBuildHistoryID:::::::'+this.lastBuildHistoryID);
    this.refresh = true;
    this.refreshTime = 5000;
    TimerObservable.create(1000, this.refreshTime)
    .takeWhile(() => this.refresh)
    .subscribe(()  =>  {
      this.getRefreshBuildHistory();
    });
  }

  setBuildHistory(buildHistory) {
    localStorage.setItem('build_history_id', buildHistory.buildHistoryId);
    localStorage.setItem('overallstatus', buildHistory.status.toLowerCase());
    this._report.changeReportShownStatus(true);
    this.router.navigate(['/project', 'reports']);
  }

  getStoredNames() {
    if ( !(localStorage.getItem('portfolio_name') === null) ) {
      this.selectedPortfolioName = localStorage.getItem('portfolio_name');
      this.selectedAccountName = localStorage.getItem('account_name');
      this.selectedProjectName = localStorage.getItem('project_name');
    }
    if ( !( localStorage.getItem('project_name') === null ) ) {
      this.getModuleByProject(localStorage.getItem('project_name'));
    }
  }

  selectPortfolioName(portfolio) {
    this.selectedPortfolioName = '';
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedPortfolioName = portfolio.portfolio_name;

    this.module_name = '';
    this.placeholder = '';
    this.selectedModuleName = '';

    localStorage.setItem('portfolio_id', portfolio.portfolio_id);
    localStorage.setItem('portfolio_name', portfolio.portfolio_name);
    this.getAccountList();
    this.getModuleByProject(null);
    this.getBuidHistory(null, null, null);
    this.moduleService.changeConfig(true);
  }

  selectAccountName(account) {
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedAccountName = account.accountName;
    this.module_name = '';
    this.placeholder = '';
    this.selectedModuleName = '';

    localStorage.setItem('account_id', account.accountId);
    localStorage.setItem('account_name', account.accountName);
    this.getProjectList();
    this.getModuleByProject(null);
    this.getBuidHistory(null, null, null);
    this.moduleService.changeConfig(true);
  }

  selectProjectName(project) {
    localStorage.setItem('module_name', '');
    this.module_name = '';
    this.placeholder = '';
    this.selectedModuleName = '';

    this.selectedProjectName = project.projectName;
    localStorage.setItem('project_id', project.project_id);
    localStorage.setItem('project_name', project.projectName);
    this.getModuleByProject(project.projectName);
    this.getBuidHistory(null, null, null);
    this.moduleService.changeConfig(true);
  }

  getPortfolioList() {
    this.portfolio.getPortfolioList().subscribe( data => {
        this.portfolios = data;
      },
      error => {
        this.portfolios = [];
        this.message.add({
          severity: 'error',
          summary: 'Portfolios Request -',
          detail: 'HTTP ERROR & Status: ' + error.status,
        });
    });
  }

  getAccountList() {
    this.account.getAccountList(this.selectedPortfolioName).subscribe( data => {
      this.accounts = data;
    },
    error => {
      this.accounts = [];
      this.message.add({
        severity: 'error',
        summary: 'Accounts Request -',
        detail: 'HTTP ERROR & Status: ' + error.status,
      });
    });
  }

  getProjectList() {
    this.project.getProjectList( this.selectedPortfolioName, this.selectedAccountName ).subscribe( data => {
      this.projects = data;
      },
      error => {
        this.projects = [];
        this.message.add({
          severity: 'error',
          summary: 'Projects Request -',
          detail: 'HTTP ERROR & Status: ' + error.status,
        });
      });
  }

  getModuleByProject(project_name) {
    this.moduleService.getModuleList(project_name).subscribe( data => {
      this.modules = data;
    },
    error => {
      this.modules = null;
      this.message.add({
        severity: 'error',
        summary: 'Module Request -',
        detail: error._body,
      });
    });
  }

  getBuidHistory(module_name, module_id, module_description) {
    localStorage.setItem('module_name', module_name);
    localStorage.setItem('module_id', module_id);
    localStorage.setItem('module_description', module_description);
    if(this.selectedModuleName !== '') {
      this.placeholder = 'Select Build';
    }
    this.moduleService.changeModuleId(module_id);
    this.moduleService.getBuildHistoryByModule(module_name).subscribe( data => {
      this.buildHistories = data.sort(function(a, b) {
        return b.buildNumber - a.buildNumber;
      });
      if (this.buildHistories[0].status.toLowerCase() === 'in-progress'
      || this.buildHistories[0].status.toLowerCase() === 'on-hold') {
        this.showStartingProgress = false;
        this.isExecutionDisabled = true;
        this.refresh = true;
        console.log('Build history in-progress/on-hold');
      } else if (this.buildHistories[0].status.toLowerCase() !== 'in-progress'
        || this.buildHistories[0].status.toLowerCase() !== 'on-hold') {
          if((this.lastBuildHistoryID != this.buildHistories[0].buildHistoryId) && (this.lastBuildHistoryID > 0)) {
            this.isExecutionDisabled = false;
            this.refresh = false;
            console.log('Build history completed/failed');
          }
      }
    },
    error => {
      this.isExecutionDisabled = false;
      this.refresh = false;
      this.buildHistories = [];
      this.message.clear();
      // this.message.add({
      //   severity: 'error',
      //   summary: 'Get BuildHistory -',
      //   detail: error._body,
      // });
    });
  }

  getRefreshBuildHistory() {
    this.moduleService.getBuildHistoryByModule(localStorage.getItem('module_name')).subscribe( data => {
      this.buildHistories = data.sort(function (a, b) {
        return b.buildNumber - a.buildNumber;
      });
      console.log('>>> refresh history ID: ' + this.buildHistories[0].buildHistoryId);

      localStorage.setItem('overallstatus', this.buildHistories[0].status.toLowerCase());

      if(this.buildHistories[0].status.toLowerCase() === 'failed'
      || this.buildHistories[0].status.toLowerCase() === 'completed'
      || this.buildHistories[0].status.toLowerCase() === 'aborted') {
        this.isExecutionDisabled = false;

        if((this.lastBuildHistoryID != this.buildHistories[0].buildHistoryId )){

          this.refresh = false;
          console.log('Refreshing Build history list stopped correctly.');

        }


      } else if (this.buildHistories[0].status.toLowerCase() === 'in-progress'
        || this.buildHistories[0].status.toLowerCase() === 'on-hold') {
        this.showStartingProgress = false;
        this.isExecutionDisabled = true;

        this.refresh = true;
        console.log('Refreshing Build history list.');
      }
    },
    err => {
      // console.log(err);
      // this.isExecutionDisabled = false;
      // this.refresh = false;
      // this.buildHistories = [];
      // this.message.add({
      //   severity: 'error',
      //   summary: 'Refresh Build History',
      //   detail: 'Unable to refresh build history.',
      // });
    });
  }

  getLastbuildHistoryId() {

    this.moduleService.getBuildHistoryByModule(localStorage.getItem('module_name')).subscribe( data => {
      this.buildHistories = data.sort(function (a, b) {
        return b.buildNumber - a.buildNumber;
      });
      this.lastBuildHistoryID = this.buildHistories[0].buildHistoryId;
      this.lastBuildHistoryStatus = this.buildHistories[0].status;
    }, error => {
      this.lastBuildHistoryID = 0;
      this.lastBuildHistoryStatus = 'none';
    });
  }

  createModule() {

    if(this.scmPollTimer) {
      this.newModule.moduleJobsJenkinsParametersList.push({
        id: 0,
        parameter_key: 'scm_timer',
        value: this.scmPollTimer
      });
    }

    if(this.periodicBuildTimer) {
      this.newModule.moduleJobsJenkinsParametersList.push({
        id: 0,
        parameter_key: 'timer_trigger',
        value: this.periodicBuildTimer
      });
    }


    this.loader.changeLoaderStatus(true);
    this.moduleService.changeConfig(true);
    this.moduleService.addModule(this.newModule).subscribe( data => {
      this.refresh = true;
      this.refreshBuildHistory();
      localStorage.setItem('module_id', data.moduleId);
      localStorage.setItem('module_name', data.moduleName);
      localStorage.setItem('module_description', data.description);
      this.selectedModuleName = data.moduleName;
      this.placeholder = '';
      const project = localStorage.getItem('project_name');
      this.getModuleByProject(project);
      this.moduleService.changeModuleId(data.moduleId);
      this.routingFunction('Build Configuration');
      this.loader.changeLoaderStatus(false);
      this.message.clear();
      this.message.add({severity:'check', summary:'Create Build : ', detail:'Status: Successful.'});
      document.getElementById('id01').style.display = 'none';
    },
    error => {
      this.loader.changeLoaderStatus(false);
      document.getElementById('id01').style.display = 'none';
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Creating new build failed',
        detail: 'Build with same name already exists.',
      })
    });
  }

  executeModule() {
    this.showStartingProgress = true;
    this.isExecutionDisabled = true;
    this.expandBuildHistory = true;
    this.moduleService.changeConfig(true);
    const module_id = localStorage.getItem('module_id');
    this.refresh = true;
    this.refreshBuildHistory();
    this.moduleService.getSubJobs().subscribe(data => {
      if (data.subModules.length > 0) {
        this.moduleService.executeModuleById(module_id).subscribe(response => {
          this.isExecutionDisabled = false;
          this.message.clear();
          this.message.add({ severity: 'check', summary: 'Execute Build : ', detail: 'Status: Successful.' });
        },
        err => {
          this.showStartingProgress = false;
          console.log(err);
          this.message.clear();
          this.message.add({ severity: 'info', summary: 'Execute Build : ', detail: err._body });
        });
      }
      this.expandBuildHistory = false;
    },
    err => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Execution Failed : ',
        detail: err._body,
      })
    });
  }

  deleteModule() {
    this.moduleService.changeConfig(false);
    this.loader.changeLoaderStatus(true);
    const module_id = localStorage.getItem('module_id');
    this.moduleService.deleteModuleById(module_id).subscribe(data =>{
      localStorage.setItem('module_name', 'Select Build First');
      localStorage.removeItem('module_id');
      this.moduleService.changeModuleId(null);
      this.selectedModuleName = 'Select Build First';
      this.module_name = '';
      this.placeholder = '';
      this.getModuleByProject(localStorage.getItem('project_name'));
      this.loader.changeLoaderStatus(false);
      document.getElementById('confirmBox01').style.display = 'none';
      this.message.clear();
      this.message.add({ severity: 'info', summary: 'Delete Build -', detail: data + 'Status: Successful.' });
      this.router.navigate(['/project']);
    });
  }

  routingFunction(compponent_name) {
    if(this.moduleService.configChanged === true) {
      this.moduleService.changeConfig(true);
    } else {
      this._report.changeReportShownStatus(false);
      switch (compponent_name) {
        case 'Build Configuration':
          this.router.navigate(['/project']);
        break;

        case 'Environment Readiness':
          this.router.navigate(['/project', 'env-ready']);
        break;

        case 'GDPR':
        this.router.navigate(['/project', 'gdpr']);
        break;

        case 'TREND':
        this.router.navigate(['/project', 'trend']);
        break;

        case 'Impact Change':
          this.router.navigate(['/project', 'changeImpact']);
        break;
      }
    }
  }

  setClickedHistory(index) {
    this.selectedHistory = index;
  }

  abortJob(build_history_id){
    localStorage.setItem("build_history_id",build_history_id);
    this.moduleService.abortJob().subscribe( data => {
      this.message.clear();
      this.message.add({
        severity: 'success',
        summary: 'Abort Execution - ',
        detail: 'Status: Successful.',
      });
    },
    err => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Abort Execution - ',
        detail: err._body,
      });
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
