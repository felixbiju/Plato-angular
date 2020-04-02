import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { AccountService } from '../../shared/services/account.service';
import { ProjectService } from '../../shared/services/project.service';
import { EnvironmentService} from '../../shared/services/environment.service';
import { Application } from '../../shared/model/application';
import { Server } from '../../shared/model/server';
import { Database } from '../../shared/model/database';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-environment',
  templateUrl: './config-environment.component.html',
  styleUrls: ['./config-environment.component.css']
})
export class ConfigEnvironmentComponent implements OnInit, OnDestroy {

  environment: any[];
  checked = 'checked';
  server: any[];
  applications = new Application();
  servers = new Server();
  databases = new Database();
  database: any[];
  users: any[];
  projects: any[];
  accounts:any[];
  portfolios: any[];
  selectedPortfolioName = '';
  selectedAccountName = '';
  selectedProjectName = '';
  selectedProjectId;
  selectedPortfolioId;
  selectedAccountId;
  selecteddriver;
  dropSelect;
  applicationName: string;
  applicationURL: string;
  applicationTime: number;
  serverName: string;
  serverURL: string;
  serverInterval: number;
  databaseName: string;
  databaseURL: string;
  username: string;
  databasePassword:string;
  databasePort:string;
  databaseDriver: string;
  isEditShow: boolean;
  isDeleteShow: boolean;
  isEditShowforServer:boolean;
  isDeleteShowforServer:boolean;
  isEditShowforDatabase:boolean;
  isDeleteShowforDatabase:boolean;
  check1 = false;
  check2 = false;
  check3 = false;
  check4 = false;
  check5 = false;
  check6 = false;
  portfolio_name = localStorage.getItem('portfolio_name');
  account_name = localStorage.getItem('account_name');
  project_name = localStorage.getItem('project_name');
  errMsg: string;
  email: string;
  name: string;
  password:string;
  screenPermission: any[];
  localdriver;
  updatelocaldriver;
  databaseIP;
  updateDriver;
  updateIp;

  environments = [
    {value: 'Application-0', viewValue: 'Application'},
    {value: 'Server-1', viewValue: 'Server'},
    {value: 'Database-2', viewValue: 'Database'}
  ];

  constructor(private portfolioService: PortfolioService, private accountService: AccountService,
    private projectService: ProjectService, private environmentService: EnvironmentService,
    private _permissions: PermissionService) { }

  ngOnInit() {
    this.getDefaultData();
  }

  ngOnDestroy() {
    localStorage.removeItem('Config_Portfolio');
    localStorage.removeItem('Config_Account');
    localStorage.removeItem('Config_Project');
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          console.log('undefined');
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'environment screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
  }

  getDefaultData() {
    this.getPermissionByRole();
    // this._permissions.getAllPermissions().subscribe(permisssion => {
    //   permisssion.permissionData.forEach(module => {
    //     if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
    //       module.screens.forEach(screen => {
    //         if (screen.screenName.toLowerCase() === 'environment screen') {
    //           this.screenPermission = screen.components;
    //         }
    //       });
    //     }
    //   });
    //   console.log(this.screenPermission);
    // });
    this.isEditShow = false;
    this.isDeleteShow = false;
    this.isEditShowforServer = false;
    this.isDeleteShowforServer = false;
    this.isEditShowforDatabase = false;
    this.isDeleteShowforDatabase = false;

    this.portfolioService.getAllPortfolio().subscribe(data => {
      this.portfolios = data;
    });
    this.accountService.getAllAccountList(localStorage.getItem('portfolio_id')).subscribe(data => {
      this.accounts = data;
    });
    this.projectService.getProjectList1(localStorage.getItem('portfolio_id'), localStorage.getItem('account_id')).subscribe(data => {
      this.projects = data;
    },
      error => {
        this.errMsg = error;
      }
    );
    this.environmentService.getApplicationsList(localStorage.getItem('project_id')).subscribe(data => {
      this.environment = data;
    },
    err => {
      this.environment = [];
    });
    this.environmentService.getServerList(localStorage.getItem('project_id')).subscribe(data => {
      this.server = data;
    },
    err => {
      this.server = [];
    });
    this.environmentService.getDatabaseList(localStorage.getItem('project_id')).subscribe(data => {
      this.database = data;
    },
    err => {
      this.database = [];
    });
  }

  startBackgroundThreads(){
    let response;
    this.environmentService.startAppsBackgroundServices(localStorage.getItem('project_id')).subscribe(data => {
      response = response+data;
    },
    err => {
      response = response+" Error while starting apps bg service";
    });
    this.environmentService.startServBackgroundServices(localStorage.getItem('project_id')).subscribe(data => {
      response = response+data;
    },
    err => {
      response = response+" Error while starting Server bg service";
    });
    this.environmentService.startDBsBackgroundServices(localStorage.getItem('project_id')).subscribe(data => {
      response = response+data;
    },
    err => {
      response = response+" Error while starting DBs bg service";
    });
    console.log(response)
  }

  selectedPortfolioValue(portfolio) {
    localStorage.setItem('Config_Portfolio', JSON.stringify(portfolio));
    this.accountService.getAllAccountList(portfolio.portfolio_id).subscribe(data =>{
      this.accounts = data;
    },
    err => {
      this.accounts = [];
    });
  }

  selectedAccountValue(account) {
    localStorage.setItem('Config_Account', JSON.stringify(account));
    const portfolio = JSON.parse(localStorage.getItem('Config_Portfolio'));
    this.projectService.getProjectList1(portfolio.portfolio_id, account.accountId).subscribe(data => {
      this.projects = data;
    },
    err => {
      this.projects = [];
    });
  }

  selectProjectName(project) {
    this.selectedProjectName = project.project_name;
    console.log('project :: ' + project.project_name);
    localStorage.setItem('Config_Project', JSON.stringify(project));
    this.getUsersInProject(project.project_name);
  }

  selectedProjectValue(project) {
    this.selectedProjectId = project.project_id;
    localStorage.setItem('Config_Project', JSON.stringify(project));
    this.environmentService.getApplicationsList(project.project_id).subscribe(data =>{this.environment = data});
    this.environmentService.getServerList(project.project_id).subscribe(data =>{this.server = data});
    this.environmentService.getDatabaseList(project.project_id).subscribe(data =>{this.database = data});
  }

  // For Application
  getAllEnvironment(){
    this.environmentService.getApplicationList().subscribe(data =>{
      this.environment = data;
    });
  }

  getUsersInProject(project_id){
    this.environmentService.getUsersInProject().subscribe( data => this.users = data,
                                                error => this.errMsg = error );
  }

  getPortfolioList() {
    this.portfolioService.getAllPortfolio().subscribe( data => {
      this.portfolios = data;
    },
    error => {
      this.errMsg = error;
      this.portfolios = [];
    });
  }

  getAccountList() {
    this.accountService.getAllAccountList(this.selectedPortfolioName).subscribe( data => {
      this.accounts = data;
    },
    error => {
      this.errMsg = error;
      this.accounts = [];
    });
  }

  getProjectsList() {
    this.projectService.getProjectList( this.selectedPortfolioId, this.selectedAccountId ).subscribe( data => {
      this.projects = data;
    },
    error => {
      this.projects = [];
      this.errMsg = error;
    });
  }

  //TO CREATE APPLICATION GIVEN PROJECT_ID
  createApplication() {
    const project_id = localStorage.getItem('project_id');
    const newApplication = {
      applicationName:this.applicationName,
      applicationURL:this.applicationURL,
      pullingInterval:this.applicationTime
    }
    this.environmentService.addApplication(newApplication).subscribe( data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data => {
        this.environment = data;
      },
      err => {
        this.environment = [];
      });
      this.environmentService.getServerList(projectID).subscribe(data =>{
        this.server = data;
      },
      err => {
        this.server = [];
      });
      this.environmentService.getDatabaseList(projectID).subscribe(data => {
        this.database = data;
      },
      err => {
        this.database = [];
      });
    });
  }

  //TO CREATE SERVER GIVEN PROJECT_ID
  createServer() {
    const project_id = localStorage.getItem('project_id');
    const newServer = {
      serverName:this.serverName,
      serverURL:this.serverURL,
      pullingInterval: this.serverInterval
    }
    this.environmentService.addServer(newServer).subscribe( data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //TO CREATE DATABASE GIVEN PROJECT_ID
  createDatabase() {
    const project_id = localStorage.getItem('project_id');
    if(this.selecteddriver==="mysql"){
     this.localdriver ="com.mysql.jdbc.Driver"
    }
    if(this.selecteddriver==="sqlserver"){
      this.localdriver ="com.microsoft.sqlserver.jdbc.SQLServerDriver"
     }
    const newDatabase = {
      databaseName:this.databaseName,
      databaseURL:"jdbc:"+this.selecteddriver+"://"+this.databaseIP+":"+this.databasePort,
      username: this.username,
      databaseDriver: this.localdriver,
      Password:this.databasePassword,
      databasePort:this.databasePort
    }
    // databaseDriver: this.databaseDriver,
    // databaseURL:this.databaseURL,
    this.environmentService.addDatabase(newDatabase).subscribe( data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  selectedDriver(selecteddriver){
    this.selecteddriver=selecteddriver;
    console.log("selecteddriver"+selecteddriver);
  }

  selectedDriverforUpdate(selecteddriver){
    this.updateDriver=selecteddriver;
    console.log("selecteddriver"+ this.updateDriver);
  }

  //TO UPDATE APPLICATION DETAILS GIVEN PROJECT_ID
  updateApplication() {
    const updatedapplication = {
      applicationId: localStorage.getItem('applicationId'),
      applicationName: this.applications.applicationName,
      applicationURL: this.applications.applicationURL,
      pullingInterval: this.applications.pullingInterval
    }
    this.environmentService.updateApplication(updatedapplication).subscribe( data => {
      const projectID = localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //TO UPDATE SERVER DETAILS GIVEN PROJECT_ID
  updateServer(){
    const updatedserver = {
      serverId: localStorage.getItem('serverId'),
      serverName: this.servers.serverName,
      serverURL: this.servers.serverURL,
      pullingInterval: this.servers.pullingInterval
    }
    this.environmentService.updateServer(updatedserver).subscribe( data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //TO UPDATE DATABASE DETAILS GIVEN PROJECT_ID
  updateDatabase(){
    if(this.updateDriver==="mysql"){
      this.updatelocaldriver ="com.mysql.jdbc.Driver"
     }
     if(this.updateDriver==="sqlserver"){
       this.updatelocaldriver ="com.microsoft.sqlserver.jdbc.SQLServerDriver"
      }
    const updateddatabase = {
      databaseId: localStorage.getItem('databaseId'),
      databaseName: this.databases.databaseName,
      databaseURL:"jdbc:"+this.updateDriver+"://"+this.updateIp+":"+this.databases.databasePort,
      username: this.databases.username,
      databaseDriver: this.updatelocaldriver,
      Password:this.databases.password,
      databasePort:this.databases.databasePort
    }
    // databaseURL: this.databases.databaseURL,
    // databaseURL:"jdbc:"+this.selecteddriver+"://"+this.databaseIP+":"+this.databasePort,
    this.environmentService.updateDatabase(updateddatabase).subscribe( data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //FOR APPLICATION
  isChecked(applicationName,applicationId) {
    this.isEditShow=true;
    this.isDeleteShow=true;
    localStorage.removeItem("applicationName");
    localStorage.setItem("applicationName",applicationName);
    localStorage.removeItem("applicationId");
    localStorage.setItem("applicationId",applicationId);
  }

  //FOR SERVER
  isCheckedForServer(serverName,serverId) {
    this.isEditShowforServer = true
    this.isDeleteShowforServer = true;
   localStorage.removeItem("serverId");
   localStorage.setItem("serverId",serverId);
  }

  //FOR DATABASE
  isCheckedForDatabase(databaseName,databaseId){
    this.isEditShowforDatabase = true
    this.isDeleteShowforDatabase = true;
    localStorage.removeItem("databaseId");
    localStorage.setItem("databaseId",databaseId);
  }

  //FOR APPLICATION
  isSelected() {
    if(this.check2 == true) {
      this.check2 = false;
      this.isDeleteShow = false;
    } else {
      this.check2 = true;
      this.isDeleteShow = true;
    }
  }

  //FOR SERVER
  isSelectedForServer() {
    if(this.check4 == true) {
      this.check4 = false;
      this.isDeleteShowforServer = false;
    } else {
      this.check4 = true;
      this.isDeleteShowforServer = true;
    }
  }

  //FOR DATABASE
  isSelectedForDatabase() {
    if(this.check6 == true) {
      this.check6 = false;
      this.isDeleteShowforDatabase = false;
    } else {
      this.check6 = true;
      this.isDeleteShowforDatabase = true;
    }
  }

 //TO DELETE APPLICATION
  deleteApplication() {
    this.environmentService.deleteApplicationById().subscribe(data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

 //TO DELETE SERVER
  deleteServer() {
    this.environmentService.deleteServerById().subscribe(data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //TO DELETE SERVER
  deleteDatabase() {
    this.environmentService.deleteDatabaseById().subscribe(data => {
      const projectID=localStorage.getItem('project_id');
      this.environmentService.getApplicationsList(projectID).subscribe(data =>{this.environment = data});
      this.environmentService.getServerList(projectID).subscribe(data =>{this.server = data});
      this.environmentService.getDatabaseList(projectID).subscribe(data =>{this.database = data});
    });
  }

  //TO FETCH APPLICATION FOR UPDATION
  getParticularApplication(){
    const applicationId = localStorage.getItem('applicationId');
    this.environmentService.getApplnById(applicationId).subscribe( data => {
      this.applications = data;
    });
  }

  //TO FETCH SERVER FOR UPDATION
  getParticularServer(){
    const serverId = localStorage.getItem('serverId');
    this.environmentService.getServById(serverId).subscribe( data => {
      this.servers = data;
    });
  }

  //TO FETCH DATABASE FOR UPDATION
  getParticularDatabase(){
    const databaseId = localStorage.getItem('databaseId');
    this.environmentService.getDatabById(databaseId).subscribe( data => {
      this.databases = data;
      this.updateDriver=data.databaseDriver
      this.updateIp=data.databaseURL;

      this.updateIp= this.updateIp.split("//")[1].split(":")[0];
      // console.log("x issss"+ x);
      // this.updateIp=x;

      if(this.updateDriver.includes("sqlserver")){
        this.updateDriver="sqlserver";
        // var x= this.updateIp.split("//")[0];
        // console.log("x issss"+ x);
      }
      if(this.updateDriver.includes("mysql")){
        this.updateDriver="mysql";
      }
    });

  }

  // changing backend services status
  onChangingBackendServicesSetting(checked) {
    this.environmentService.onChangingBackendServicesSetting(checked).subscribe( data => {});
  }

  toggleTable(tableName) {
    let x = document.getElementById(tableName);
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else if (x.style.display === 'none') {
      x.style.display = 'block';
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
