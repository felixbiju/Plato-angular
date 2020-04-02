import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { PortfolioService } from '../shared/services/portfolio.service';
import { ProjectService } from '../shared/services/project.service';
import { LoginService } from '../shared/services/login.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { ModuleService } from '../shared/services/module.service';
import { AccountService } from '../shared/services/account.service';
import { LoaderService } from '../shared/services/loader.service';
import { ReportService } from '../shared/services/report.service';
import { PermissionService } from '../shared/services/permissions.service';

import { BuildCounts } from '../shared/model/buildCount';
import { Permissions } from '../shared/model/permissions';
import { Module } from '../shared/model/Module';
// import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.css']
})
export class DashboardV2Component implements OnInit {

    progress: number[] = [20, 80, 30, 70, 90];
    legendData: any;
    selectedProjects: string = null;
    selectedModule: string;
    showModuleTable = true;
    newBuild = new Module();
    periodicBuildTimer: string;
    scmPollTimer: string;
    permission = new Permissions();
    buildCount = new BuildCounts();
    toppings = new FormControl();
    selectedPortfolioName = '';
    selectedAccountName = '';
    selectedProjectName = '';
    portfolios: any[];
    accounts: any[];
    projects: any[];
    modules: any[];
    tools: any[];
    lastReport: Array<any> = [];
    isPortfolioSelected = false;
    isAcocuntSelected = false;
    filterText = '';
    screenPermission: any[];
    subjobnames: any[]= [];
    subjobnames1: any[]= [];
    showsubjob: string;
    defaultMiniGraph: any;
    dropDown:boolean[] = [];
    level2dropDown:boolean[] = [];
    showLoader = true;

    public ChartColors: Array<any> = [
      {
        backgroundColor: [
          'rgb(0,200,81)',
          'rgb(255,68,68)',
          'rgb(51,181,229)'
        ],
        borderColor: 'transparent'
      }
    ];

    public trendChartBuilds = [];
    public trendChartTools = [];

    public chartoptions: any = {
      animation: {
        duration: 0
      }
    };
    public barChartoptions: any = {
      scaleShowVerticalLines: false,
      animation: {
          duration: 0
      },
      responsive: true,
      legend: {
          display: false,
          labels: {
              fontColor: 'rgb(255, 99, 132)',
              fontSize : 10,
              boxWidth : 10
          }
      },
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 0.7
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    constructor( private router: Router, private account: AccountService, private login: LoginService,
                 private moduleService: ModuleService, private project: ProjectService, private message: MessageService,
                 private portfolio: PortfolioService, private loader: LoaderService, private _report: ReportService,
                 private _permissions: PermissionService, private _dashboard: DashboardService) { }

    ngOnInit() {
      this.getPermissionByRole();
      this.getStoredNames();
      this.getPortfolioList();
      this.getAccountList();
      this.getProjectList();
    }

    updateProgressColor(progress: number) {
      if (progress <= 20) {
        return 'danger-bar';
      }else if (progress > 21 && progress < 50) {
        return 'warn-bar';
      }else {
        return 'ok-bar';
      }
    }

    randomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

    getPermissionByRole() {
      this._permissions.currentRole.subscribe(role => {
        this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
          if (permissions.permissionData === undefined) {
            this.screenPermission = [];
          } else {
            permissions.permissionData.forEach(module => {
              if (module.moduleName.toLowerCase() === 'dashboard module') {
                module.screens.forEach(screen => {
                  if (screen.screenName.toLowerCase() === 'dashboard screen') {
                    this.screenPermission = screen.components;
                  }
                });
              }
            });
          }
        });
      });
    }

    executeBuild(_module) {
      const module_id = _module.module_Id;
      localStorage.setItem('module_id', _module.module_Id);
      localStorage.setItem('module_name', _module.moduleName);
      this.router.navigate( ['/project'], { queryParams: { action: 'run' } });
    }

    recentReport(module) {
      localStorage.setItem('build_history_id', module.moduleLastBuildHistory);
      localStorage.setItem('module_name', module.moduleName);
      localStorage.setItem('reportStatus', JSON.stringify(true));
      this.router.navigate(['/project', 'reports']);
    }

    getStoredNames() {
      if ( !(localStorage.getItem('portfolio_name') === null) ) {
        this.selectedPortfolioName = localStorage.getItem('portfolio_name');
        this.selectedAccountName = localStorage.getItem('account_name');
        this.selectedProjectName = localStorage.getItem('project_name');
        this.isPortfolioSelected = true;
      }
      if ( !(localStorage.getItem('account_name') === null) && ( localStorage.getItem('project_name') === null ) ) {
        this.isAcocuntSelected = true;
        this.getModuleByAccount(localStorage.getItem('account_name'));
      }
      if ( !( localStorage.getItem('project_name') === null ) ) {
        this.isAcocuntSelected = true;
        this.getModuleByProject(localStorage.getItem('project_name'));
      }
    }

    selectPortfolioName(portfolio) {
      this.isAcocuntSelected = false;
      this.selectedPortfolioName = '';
      this.selectedAccountName = '';
      this.selectedProjectName = '';
      this.selectedPortfolioName = portfolio.portfolio_name;
      this.isPortfolioSelected = true;
      localStorage.removeItem('account_name');
      localStorage.removeItem('account_id');
      localStorage.removeItem('project_name');
      localStorage.removeItem('project_id');
      localStorage.setItem('portfolio_id', portfolio.portfolio_id);
      localStorage.setItem('portfolio_name', portfolio.portfolio_name);
      this.project.changeProject(null);
      this.getAccountList();
    }

    selectAccountName(account) {
      this.selectedAccountName = '';
      this.selectedProjectName = '';
      this.selectedAccountName = account.accountName;

      localStorage.removeItem('project_name');
      localStorage.removeItem('project_id');
      localStorage.setItem('account_id', account.accountId);
      localStorage.setItem('account_name', account.accountName);
      this.isAcocuntSelected = true;
      this.project.changeProject(null);
      this.getBuildCountByAccount();
      this.getModuleByAccount(this.selectedAccountName);
      this.getProjectList();
    }

    selectProjectName(project) {
      this.selectedProjectName = '';
      this.selectedProjectName = project.projectName;

      localStorage.setItem('project_id', project.project_id);
      localStorage.setItem('project_name', project.projectName);
      this.project.changeProject(project.project_id);
      this.getBuildCountByProject();
      this.getModuleByProject(project.projectName);
    }

    getPortfolioList() {
      this.portfolio.getPortfolioList().subscribe(data => {
          this.portfolios = data;
        },
        error => {
          this.message.clear();
          this.message.add({
            severity: 'error',
            summary: 'Portfolio List -',
            detail: error
          });
        }
      );
    }

    getAccountList() {
      let portfolio_name = '';
      if (this.selectedPortfolioName === null) {
        portfolio_name = localStorage.getItem('portfolio_name');
      } else {
        portfolio_name = this.selectedPortfolioName;
      }
      this.account.getAccountList(portfolio_name).subscribe( data => {
          this.accounts = data;
        },
        error => {
          this.message.clear();
          this.message.add({
            severity: 'error',
            summary: 'Account List -',
            detail: error
          });
        }
      );
    }

    getProjectList() {
      let portfolio_name = '';
      let account_name = '';
      if (this.selectedAccountName === null) {
        portfolio_name = localStorage.getItem('portfolio_name');
        account_name = localStorage.getItem('account_name');
      } else {
        portfolio_name = this.selectedPortfolioName;
        account_name = this.selectedAccountName;
      }
      this.project.getProjectList(portfolio_name, account_name ).subscribe(data => {
          this.projects = data;
        },
        error => {
          this.message.clear();
          this.message.add({
            severity: 'error',
            summary: 'Project List -',
            detail: error
          });
        }
      );
    }

    getModuleByAccount(account_name) {
      this.moduleService.getModuleByAccount(account_name).subscribe(data => {
          this.modules = data;
          this.modules = this.modules.reverse();
          // if (this.modules[0].toolsStatus?.toolList !== undefined) {
          //   this.tools = this.modules[0].toolsStatus.toolList;
          // }
          this.getBuildCountByAccount();
        },
        error => {
          this.modules = [];
          this.tools = [];
          this.message.clear();
          this.message.add({
            severity: 'error',
            summary: 'Module List - ',
            detail: error
          });
        }
      );
    }

    getBuildCountByAccount() {
      this.moduleService.getBuildsStatusByAccount().subscribe( data => {
        this.buildCount = data;
        },
        error => {
          this.buildCount = null;
          this.message.clear();
          this.message.add({
            severity: 'error',
            summary: 'Build Count List - ',
            detail: error
          });
        }
      );
    }

    getModuleByProject(project_name) {
      this.moduleService.getModuleByProject(project_name).subscribe( data => {
        this.modules = data;
        this.modules = this.modules.reverse();
        // if (this.modules[0].toolsStatus.toolList !== undefined) {
        //   this.tools = this.modules[0].toolsStatus.toolList;
        // }
        this.getBuildCountByProject();
      },
      error => {
        this.modules = [];
        this.tools = [];
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Module List - ',
          detail: error
        });
      });
    }

    getBuildCountByProject() {
      this.moduleService.getBuildStatusByProject().subscribe( data => {
        this.buildCount = data;
      },
      error => {
        this.buildCount = null;
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Build Count -',
          detail: error
        });
      });
    }

    createBuild() {

      if(this.scmPollTimer) {
        this.newBuild.moduleJobsJenkinsParametersList.push({
          id: 0,
          parameter_key: 'scm_timer',
          value: this.scmPollTimer
        });
      }

      if(this.periodicBuildTimer) {
        this.newBuild.moduleJobsJenkinsParametersList.push({
          id: 0,
          parameter_key: 'timer_trigger',
          value: this.periodicBuildTimer
        });
      }

      this.moduleService.addModule(this.newBuild).subscribe( createdBuild => {
        localStorage.setItem('module_id', createdBuild.moduleId);
        localStorage.setItem('module_name', createdBuild.moduleName);
        localStorage.setItem('module_description', createdBuild.description);
        const project = localStorage.getItem('project_name');
        this.getModuleByProject(project);
        document.getElementById('id01').style.display = 'none';
        this.message.clear();
        this.message.add({severity: 'info', summary: 'Create Build - ', detail: 'Created Successfully.'});
        this.router.navigate(['/project']);
      },
      error => {
        document.getElementById('id01').style.display = 'none';
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Create Build Failed - ',
          detail: 'Build with same name already exists.'
        });
      });
    }

    setModuleid(module_Id){
      localStorage.setItem('delModuleId', module_Id);
    }

    deleteBuild() {
      this.loader.changeLoaderStatus(true);
      const moduleID=localStorage.getItem('delModuleId');
      this.moduleService.deleteModuleById(moduleID).subscribe(data => {
        this.getModuleByProject(localStorage.getItem('project_name'));
        this.loader.changeLoaderStatus(false);
        this.message.clear();
        this.message.add({ severity: 'info', summary: 'Delete Build -', detail: data });
      },
      error => {
        this.message.clear();
        this.message.add({ severity: 'info', summary: 'Delete Build - ', detail: error._body });
      });
    }

    selectModule(event: any, module) {
      // const module_name = event.target.innerHTML;
      localStorage.setItem('module_name', module.moduleName);
      localStorage.setItem('module_id', module.module_Id);
      localStorage.setItem('module_description', module.moduleDescription);
      this.router.navigate( ['/project'] );
    }

    showTotalBuilds() {
      if (this.selectedProjectName === null) {
        this.getModuleByAccount(localStorage.getItem('account_name'));
      } else {
        this.getModuleByProject(localStorage.getItem('project_name'));
      }
    }

    getModuleNames(){
      this.moduleService.getModuleNames().subscribe(data => {
        this.subjobnames1=data;

        for(let i=0; i< this.subjobnames1.length;i++){
          this.subjobnames[i] = data[i].moduleName;
        }
      });
    }
    leave(e, subjob) {
      this.getModuleNames();
     if (this.subjobnames.includes(subjob)) {
       this.showsubjob = subjob;
     }
  }

  enter(e) {
   if (this.showsubjob !== null) {
   this.showsubjob = null;
   }
  }

    showCompletedBuilds() {
      if (this.selectedProjectName === null) {
        this.moduleService.getModuleByAccount(localStorage.getItem('account_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'Completed');
        });
      } else {
        this.moduleService.getModuleByProject(localStorage.getItem('project_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'Completed');
        });
      }
    }

    showOnHoldBuilds() {
      if (this.selectedProjectName === null) {
        this.moduleService.getModuleByAccount(localStorage.getItem('account_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'On-Hold');
        });
      } else {
        this.moduleService.getModuleByProject(localStorage.getItem('project_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'On-Hold');
        });
      }
    }

    showInProgressBuilds() {
      if (this.selectedProjectName === null) {
        this.moduleService.getModuleByAccount(localStorage.getItem('account_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'In-Progress');
        });
      } else {
        this.moduleService.getModuleByProject(localStorage.getItem('project_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'In-Progress');
        });
      }
    }

    showFailedBuilds() {
      if (this.selectedProjectName === null) {
        this.moduleService.getModuleByAccount(localStorage.getItem('account_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'Failed');
        });
      } else {
        this.moduleService.getModuleByProject(localStorage.getItem('project_name')).subscribe(data => {
          this.modules = data.filter((val, i) => val.moduleStatus === 'Failed');
        });
      }
    }

  toggleDropDown(_module,row){
    this.showLoader = true;
    const x = document.getElementById(_module.moduleName);
    if (x.style.display === 'none') {

      this.modules.forEach(mod => {
        if (mod.moduleName !== _module.moduleName) {
          this.dropDown = [];
          const alreadyOpenedOne = document.getElementById(mod.moduleName);
          alreadyOpenedOne.style.display = 'none';
        }
      });
      this.dropDown[row] = true;
      // this.defaultMiniGraph = _module.moduleLastBuildHistory;
      this.lastReport = [];
      this.trendChartBuilds = [];
      this.trendChartTools = [];
      this.getModuleReport(_module.moduleLastBuildHistory);
      this.moduleService.getBuildHistoryByModule(_module.moduleName).subscribe( data => {
        var startPoint = (data.length > 10)? data.length - 10 : 0;
        for(let i = startPoint, col=0; i < data.length; i++, col++){
          this._report.getLastBuildHistoryData(data[i].buildHistoryId).subscribe(reportData => {
            var colData = [];
            reportData.BuildHistory.LiveBuildConsole.tools.forEach(toolInfo => {
              if (this.trendChartTools.indexOf(toolInfo.tool_name) == -1){
                this.trendChartTools.push(toolInfo.tool_name);
              }
              colData.push(toolInfo.tool_status);
            });
            this.trendChartBuilds.push({
              num: +data[i].buildNumber,
              buildHistoryId: data[i].buildHistoryId,
              buildStatus : colData
            });
            this.trendChartBuilds = this.trendChartBuilds.sort((n1,n2) => {
              if(n1.num < n2.num){
                return 1;
              }else if(n1.num == n2.num){
                return 0;
              }else{
                return -1;
              }
            });
            var length = (data.length < 10) ? data.length : 10;
            if (this.trendChartBuilds.length == length){
              this.showLoader = false;
            }
          });
        }
      });
      // when complete report is fetched
      x.style.display = 'table-cell';
    }else {
      this.dropDown[row] = false;
      x.style.display = 'none';
      this.lastReport = [];
    }
  }


  getModuleReport(buildID){
    this._report.getLastBuildHistoryData(buildID).subscribe(data => {
      // Automation testing
      if (data.BuildHistory.AutomationTesting) {
          data.BuildHistory.AutomationTesting.Tools.forEach(tool => {
            tool.ToolReport.forEach(report => {
              this.lastReport.push({
                'tool_name' : tool.tool_name,
                'chart_labels' : report.chart_labels,
                'chart_values' : report.chart_values,
                'chartType' : 'pie'
              });
            });
          });
      }

      // DataTesting
      if (data.BuildHistory.DataTesting) {
          data.BuildHistory.DataTesting.Tools.forEach(tool => {
            tool.ToolReport.forEach(report => {
              this.lastReport.push({
                'tool_name' : tool.tool_name,
                'chart_labels' : report.chart_labels,
                'chart_values' : report.chart_values,
                'chartType' : 'bar'});
            });
          });
      }

      // PerformanceTesting
      if (data.BuildHistory.PerformanceTesting) {
          data.BuildHistory.PerformanceTesting.Tools.forEach(tool => {
            tool.ToolReport.forEach(report => {
              this.lastReport.push({
                'tool_name' : tool.tool_name,
                'chart_labels' : report.chart_labels,
                'chart_values' : report.chart_values,
                'chartType' : 'pie'});
            });
          });
      }

      // SecurityTesting
      if (data.BuildHistory.SecurityTesting) {
          data.BuildHistory.SecurityTesting.Tools.forEach(tool => {
            tool.ToolReport.forEach(report => {
              this.lastReport.push({
                'tool_name' : tool.tool_name,
                'chart_labels' : report.chart_labels,
                'chart_values' : report.chart_values,
                'chartType' : 'pie'});
            });
          });
      }

      // Build
      if (data.BuildHistory.Build) {
        // Sonar
        if (data.BuildHistory.Build.StaticCodeAnalysis) {
          if (data.BuildHistory.Build.StaticCodeAnalysis.Sonar) {
            const Sonar = data.BuildHistory.Build.StaticCodeAnalysis.Sonar;
            this.lastReport.push({
              'tool_name' : 'SONAR - Total',
              'chart_labels' : ['complexity', 'technical_debt', 'duplications', 'issues'],
              'chart_values' : [
                                  Sonar.total.complexity.replace(/\D/g, ''),
                                  Sonar.total.technical_debt.replace(/\D/g, ''),
                                  Sonar.total.duplications.replace(/\D/g, ''),
                                  Sonar.total.duplications.replace(/\D/g, '')
                                ],
              'chartType' : 'bar',
              'chartColor' : [{
                'backgroundColor': ['skyblue', 'rgb(237, 88, 99)', 'rgb(130, 227, 164)', 'pink', 'blue', 'lime', 'gray', 'yellow']
              }]
            });
            this.lastReport.push({
              'tool_name' : 'SONAR - Complexity',
              'chart_labels' : ['file', 'function', 'class'],
              'chart_values' : [
                                  Sonar.complexity.file.replace(/\D/g, ''),
                                  Sonar.complexity.function.replace(/\D/g, ''),
                                  Sonar.complexity.class.replace(/\D/g, '')
                               ],
              'chartType' : 'bar',
              'chartColor' : [{
                'backgroundColor': ['skyblue', 'rgb(237, 88, 99)', 'rgb(130, 227, 164)', 'pink', 'blue', 'lime', 'gray', 'yellow']
              }]
            });
            this.lastReport.push({
              'tool_name' : 'SONAR - Duplications',
              'chart_labels' : ['blocks', 'files', 'lines'],
              'chart_values' : [
                                  Sonar.duplications.blocks.replace(/\D/g, ''),
                                  Sonar.duplications.files.replace(/\D/g, ''),
                                  Sonar.duplications.lines.replace(/\D/g, '')
                               ],
              'chartType' : 'bar',
              'chartColor' : [{
                'backgroundColor': ['skyblue', 'rgb(237, 88, 99)', 'rgb(130, 227, 164)', 'pink', 'blue', 'lime', 'gray', 'yellow']
              }]
            });
            this.lastReport.push({
              'tool_name' : 'SONAR - Issues',
              'chart_labels' : ['blocker', 'critical', 'major', 'minor', 'info'],
              'chart_values' : [
                                  Sonar.issues.blocker.replace(/\D/g, ''),
                                  Sonar.issues.critical.replace(/\D/g, ''),
                                  Sonar.issues.major.replace(/\D/g, ''),
                                  Sonar.issues.minor.replace(/\D/g, ''),
                                  Sonar.issues.info.replace(/\D/g, '')
                               ],
              'chartType' : 'bar',
              'chartColor' : [{
                'backgroundColor': ['skyblue', 'rgb(237, 88, 99)', 'rgb(130, 227, 164)', 'pink', 'blue', 'lime', 'gray', 'yellow']
              }]
            });
          }
        }
        // JUnit
        if (data.BuildHistory.Build.unit_testing) {
          const JUnit = data.BuildHistory.Build.unit_testing.j_unit.testTotal;
          this.lastReport.push({
            'tool_name' : 'Junit',
            'chart_labels' : ['failures', 'passed', 'errors', 'skipped'],
            'chart_values' : [JUnit.failures, JUnit.passed, JUnit.errors, JUnit.skipped],
            'chartType' : 'bar',
            'chartColor' : [{
              'backgroundColor' : ['skyblue', 'skyblue', 'blue', 'skyblue', 'skyblue', 'skyblue', 'skyblue', 'skyblue']
            }]
          });
        }
        // DuckCreek
        if (data.BuildHistory.Build.duckCreek_manuscript_analyzer) {
          const DuckCreek = data.BuildHistory.Build.duckCreek_manuscript_analyzer;
          this.lastReport.push({
            'tool_name' : 'DuckCreek Manuscript Analyzer',
            'chart_labels' : ['Warnings'],
            'chart_values' : [DuckCreek.warnings],
            'chartType' : 'bar',
            'chartColor' : [{
              'backgroundColor' : ['skyblue', 'rgb(237, 88, 99)', 'rgb(130, 227, 164)', 'pink', 'blue', 'lime', 'gray', 'yellow']
            }]
          });
        }
      }
    });
  }

  toggleLevel2DropDown(buildHistoryId, row) {
    const level2dropDown = document.getElementById(buildHistoryId);
    this.lastReport = [];
    this.defaultMiniGraph = buildHistoryId;
    if (level2dropDown.style.display === 'none' || !level2dropDown.style.display) {
      this.trendChartBuilds.forEach(build => {
        if (buildHistoryId !== build.buildHistoryId) {
          this.level2dropDown = [];
          document.getElementById(build.buildHistoryId).style.display = 'none';
        }
      });
      this.getModuleReport(buildHistoryId);
      level2dropDown.style.display = 'table-cell';
      this.level2dropDown[row] = true;
    }else {
      level2dropDown.style.display = 'none';
      this.level2dropDown[row] = false;
      this.lastReport = [];
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
