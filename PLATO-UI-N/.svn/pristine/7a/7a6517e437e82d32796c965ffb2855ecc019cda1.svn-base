import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/login.service';
import { ProjectService } from '../shared/services/project.service';
import { RolesService } from '../shared/services/roles.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ModuleService } from '../shared/services/module.service';
import { ReportService } from '../shared/services/report.service';
import { PermissionService } from '../shared/services/permissions.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  platoLogo = '../../assets/images/plato_logo_light_blue.png';
  customer_logo = '../../assets/Customer_Images/customer_logo.png';
  account_image = '../../assets/Customer_Images/customer_bg.png';
  user_pic = '../../assets/sohail.jpg';
  userName = '';
  project_id: any;
  isLoggedIn: boolean;
  userRoles: any = [];
  selectedRoleIndex: any;
  testrightUrl='';
  glassboxUrl='';
  selectedRole = {
    roleId: 0,
    roleName: 'Null'
    
  };

  constructor(private router: Router, private login: LoginService, private roleService: RolesService,
  private _report: ReportService, private message: MessageService, private _project: ProjectService,
  private moduleService: ModuleService, private _permissions: PermissionService, private dashboard: DashboardService,
  private config:AppConfig) {

    this.login.loggedIn();
    this._project.currentProjectId.subscribe( data => {
      this.project_id = data;
      if (data === null) {
        this.userRoles = null;
      } else {
        this.getRoleList(this.project_id);
      }
    });
  }

  ngOnInit() {
    this.login.IsUserLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
      this.testrightUrl=this.config.getConfig('testright_analysis_url');
      this.glassboxUrl=this.config.getConfig('glassbox_url');
      this.getRoleList(localStorage.getItem('project_id'));
      this.userName = localStorage.getItem('user');
    });
    this.isLoggedIn = this.login.isLoggedIn;
    if (localStorage.getItem('project_id') !== null) {
      this.getRoleList(localStorage.getItem('project_id'));
      this.userName = localStorage.getItem('user');
    }

    // this.dashboard.getImagesSources().subscribe( data => {
    //   console.log('imageeee........' + JSON.stringify(data));
    // });
  }

  getRoleList(project_id) {
    this.roleService.getRoles(project_id).subscribe(rolesData => {
      this.userRoles = rolesData;
      this._permissions.changeRole(this.userRoles[0]);
      this.selectedRole = this.userRoles[0];
      this.userName = localStorage.getItem('user');
    },
    error => {
      console.log(error);
    });
  }

  routingFunction(compponent_name) {
    if (this.moduleService.configChanged === true) {
      this.moduleService.changeConfig(true);
    } else {
      this._report.changeReportShownStatus(false);
      switch (compponent_name) {
        case 'dashboard':
          this.router.navigate(['/dashboard']);
        break;

        case 'project':
          this.router.navigate(['/project']);
        break;

        case 'config':
          this.router.navigate(['/config']);
        break;

        case 'user-deatils':
          this.router.navigate(['user-details']);
        break;

        case 'TC_Factory':
          this.router.navigate(['TC_Factory']);
        break;

        case 'logout':
          this.logout();
        break;
      }
    }
  }

  selectRole(role, index) {
    this.selectedRole = role;
    this.selectedRoleIndex = index;
    this._permissions.changeRole(role);
  }

  logout() {
    this.login.IsUserLoggedIn.next(false);
    this.login.loggedOut();
  }
}
