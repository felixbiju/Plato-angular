import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tasks } from '../../shared/model/tasks';
import { MessageService } from 'primeng/components/common/messageservice';
import { Projects } from '../../shared/model/projects';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { AccountService } from '../../shared/services/account.service';
import { ProjectService } from '../../shared/services/project.service';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-projects',
  templateUrl: './config-projects.component.html',
  styleUrls: ['./config-projects.component.css']
})
export class ConfigProjectsComponent implements OnInit, OnDestroy {

  projects: Projects[];
  project = new Projects();
  newProject = new Projects();
  company: string;
  stage: number;
  task = new Tasks();
  selectedID: string;
  id: string;
  roles: any[];
  portfolios: any[];
  accounts: any[];
  CreatedDate : Date;
  modifiedDate : Date;

  selectAll = false;
  check2 = false;
  public checked_array: any[] = [];
  index: number;
  isEditShow: boolean;
  isDeleteShow: boolean;
  portfolio_name = localStorage.getItem('portfolio_name');
  account_name = localStorage.getItem('account_name');
  screenPermission: any[];

  constructor( private _portfolio: PortfolioService, private _account: AccountService,
               private _project: ProjectService, private _permissions: PermissionService, private _message: MessageService) { }

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
                if (screen.screenName.toLowerCase() === 'project screen') {
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
    this.isEditShow = false;
    this.isDeleteShow = false;
    this._portfolio.getAllPortfolio().subscribe(data => {
      this.portfolios = data;
    });
    this._account.getAllAccountList(localStorage.getItem('portfolio_id')).subscribe(data => {
      this.accounts = data;
    });
    this.getAllProjects();
  }

  isChecked(project) {
    if (this.checked_array.includes(project.project_id)) {
      this.checked_array = this.checked_array.filter((val, i) => val !== project.project_id);
    } else {
      this.checked_array.push(project.project_id);
      localStorage.setItem('Config_Project', JSON.stringify(project));
    }

    if (this.checked_array.length === 1) {
      this.isEditShow  = true;
      this.isDeleteShow  = true;
      localStorage.setItem('project_id', this.checked_array[0]);
    } else if (this.checked_array.length >= 2) {
      this.isEditShow  = false;
      this.isDeleteShow  = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    }
  }

  isSelected() {
    this.checked_array = [];
    localStorage.removeItem('Config_Project');
    if (!this.selectAll) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      this.check2 = true;
    } else {
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.check2 = false;
    }
  }

  selectedPortfolioValue(portfolio) {
    localStorage.setItem('Config_Portfolio',JSON.stringify(portfolio));
    this._account.getAllAccountList(portfolio.portfolio_id).subscribe(data => {
      this.accounts = data;
    });
    this.getAllProjects();
  }

  selectedAccountValue(account) {
    localStorage.setItem('Config_Account', JSON.stringify(account));
    this.getAllProjects();
  }

  getAllProjects() {
    let portfolio_id;
    let accountId;
    if(localStorage.getItem('Config_Portfolio') !== null && localStorage.getItem('Config_Account') !== null) {
      portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
      accountId = JSON.parse(localStorage.getItem('Config_Account')).accountId;
    } else if (localStorage.getItem('Config_Account') !== null) {
      portfolio_id = localStorage.getItem('portfolio_id');
      accountId = JSON.parse(localStorage.getItem('Config_Account')).accountId;
    } else {
      portfolio_id = localStorage.getItem('portfolio_id');
      accountId = localStorage.getItem('account_id');
    }

    this._project.getProjectList1(portfolio_id, accountId).subscribe(data => {
      this.projects = data;
    },
    err => {
      this.projects = [];
    });
  }

  createProject() {
    let account_id;
    if (localStorage.getItem('Config_Account') !== null) {
      account_id = JSON.parse(localStorage.getItem('Config_Account')).accountId;
    } else {
      account_id = localStorage.getItem('account_id');
    }
    this._project.addProject(this.newProject, account_id).subscribe(data => {
      this.getAllProjects();
      this.getAllProjects();
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Project : '+ this.newProject.project_name,
        detail: 'Project added successfully.'
      });
    },
    error => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Project : '+this.newProject.project_name,
        detail: error._body
      });
    });
  }

  getParticularProject() {
    const project_id = JSON.parse(localStorage.getItem('Config_Project')).project_id;
    this._project.getParticularProject(project_id).subscribe( data => {
      this.project = data;
    })
  }

  updateProject() {
    let account_id;
    if (localStorage.getItem('Config_Account') !== null) {
      account_id = JSON.parse(localStorage.getItem('Config_Account')).accountId;
    } else {
      account_id = localStorage.getItem('account_id');
    }

    const updatedProject = {
      project_id : this.project.project_id,
      project_name : this.project.project_name,
      project_status : this.project.project_status,
      project_creation_date : this.project.project_creation_date
    }
    this._project.updateProject(updatedProject,account_id).subscribe(data => {
      this.isEditShow=false;
      this.isDeleteShow=false;
      this.getAllProjects();
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Project : '+this.project.project_name,
        detail: 'Project updated successfully.'
      });
    },
    error => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Project : '+this.project.project_name,
        detail: 'Error updating fields. Please recheck name.'
      });
    });
    this.checked_array = [];
  }

  deleteProject() {
    this._project.deleteProject().subscribe(data => {
      this.isEditShow=false;
      this.isDeleteShow=false;
      this.getAllProjects();
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Project',
        detail: 'Project deleted successfully.'
      });
    },
    error => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Project',
        detail: error._body
      });
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
