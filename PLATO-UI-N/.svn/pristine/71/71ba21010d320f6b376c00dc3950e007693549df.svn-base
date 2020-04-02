import { log } from 'util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { AccountService } from '../../shared/services/account.service';
import { ProjectService } from '../../shared/services/project.service';
import { UserService } from '../../shared/services/user.service';
import { PermissionService } from '../../shared/services/permissions.service';

import { Tasks } from '../../shared/model/tasks';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-config-users',
  templateUrl: './config-users.component.html',
  styleUrls: ['./config-users.component.css']
})
export class ConfigUsersComponent implements OnInit, OnDestroy {


  // users: User[] = [];
  users: any[] = [];
  user = new User();
  projects: any[];
  accounts:any[];
  portfolios: any[];
  roles: any[];
  rolesAllocated:any;
  allocatedProjects:any[];
  selectedPortfolioName='';
  selectedAccountName = '';
  selectedProjectName = '';

  newUser = new User();
  editUsersProject = new User();
  errMsg: string;
  index: number;
  i: number;

  length: number;
  email: string;
  name: string;
  password:string;
  seletedUser: string;

  createRoles: number[]=[];
  deleteRoles: number[]=[];

  allocatedRoles: number[]=[];
  roleToBeCreated: number[]=[];
  deleteProjects: number[]=[];
  usersSelected: string[]=[];

  checkAll = false;
  checkUser = false;
  isMultipleShow: boolean;
  isEditShow: boolean;
  isDeleteShow: boolean;
  isRoleCheck: boolean;

  user_id = '';
  userRoles: any[] = [];
  allocatedUsersList: any[] = [];
  locallyAllocatedRoles: any[] = [];
  filterText = '';
  selectedUser = '';
  screenPermission: any[];

  portfolio_name: string;
  portfolio_id: number;

  account_name: string;
  account_id: number;

  project_name: string;
  project_id: number;

  selected_portfolio_name: string;
  selected_portfolio_id: number;

  selected_account_name: string;
  selected_account_id: number;

  selected_project_name: string;
  selected_project_id: number;

  constructor( private portfolioService: PortfolioService, private accountService: AccountService,
               private projectService: ProjectService, private userService: UserService,
               private _permissions: PermissionService, private message: MessageService ) { }

  ngOnInit() {
    this.getDefaultData();
  }

  ngOnDestroy() {
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          // console.log('undefined');
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'users screen') {
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
    this.portfolio_name = localStorage.getItem('portfolio_name');
    this.portfolio_id = +localStorage.getItem('portfolio_id');

    this.account_name = localStorage.getItem('account_name');
    this.account_id = +localStorage.getItem('account_id');

    this.project_name = localStorage.getItem('project_name');
    this.project_id = +localStorage.getItem('project_id');

    this.getPermissionByRole();
    this.isEditShow = false;
    this.isMultipleShow = false;
    this.isDeleteShow = false;

    this.portfolioService.getAllPortfolio().subscribe(data => {
      this.portfolios = data;
    });
    this.accountService.getAllAccountList(this.portfolio_id).subscribe(data => {
      this.accounts = data;
    });
    this.projectService.getProjectList1(this.portfolio_id, this.account_id).subscribe(data => {
      this.projects = data;
    });

    if (this.portfolio_id !== null && this.account_id !== null && this.project_id !== null) {
      this.userService.getUsersInProAccPortfolio(this.project_id, this.account_id, this.portfolio_id).subscribe(data => {
        this.users = data;
      }, error => {
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Users',
          detail: 'Error fetching user list for project: '+ this.project_name,
        });
      });
    } else if (this.portfolio_id !== null && this.account_id !== null) {
      this.userService.getUsersInAccountAndPorfolio(this.account_id, this.portfolio_id).subscribe(data => {
        this.users = data;;
      }, error => {
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Users',
          detail: 'Error fetching user list for account: '+ this.account_name,
        });
      });
    } else if (this.portfolio_id === null) {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Users',
        detail: 'Please select portfolio',
      });
    }
  }

  setAllChecked() {
    this.usersSelected = [];
    console.log(this.checkAll);
    localStorage.removeItem('user_id');
    if (!this.checkAll) {
      this.isEditShow = false;
      this.isMultipleShow = true;
      this.isDeleteShow = true;
      this.checkUser = true;
    } else {
      this.isEditShow = false;
      this.isMultipleShow = false;
      this.isDeleteShow = false;
      this.checkUser = false;
    }
  }

  isChecked(user_id) {
    if (this.usersSelected.includes(user_id)) {
      console.log('Unchecked item is >> ' + user_id);
      this.usersSelected = this.usersSelected.filter((val, i) => val !== user_id);
      console.log(this.usersSelected);
    } else {
      console.log('Checked item is >> ' + user_id);
      this.usersSelected.push(user_id);
      console.log(this.usersSelected);
    }

    if (this.usersSelected.length === 1) {
      this.isEditShow = true;
      this.isMultipleShow = false;
      this.isDeleteShow = true;
      localStorage.setItem('user_id', this.usersSelected[0]);
    } else if (this.usersSelected.length >= 2) {
      this.isEditShow = false;
      this.isMultipleShow = true;
      this.isDeleteShow = true;
    } else if (this.usersSelected.length < 1) {
      this.isEditShow = false;
      this.isMultipleShow = false;
      this.isDeleteShow  = true;
    }
  }

  isRoleChecked(roleId) {
    if(this.createRoles.includes(roleId)) {
      console.log(this.createRoles.includes(roleId));
      this.index = this.createRoles.indexOf(roleId);
      this.createRoles.splice(this.index, 1);
    } else {
      console.log(this.createRoles.includes(roleId));
      this.createRoles.push(roleId);
    }
    console.log('checked_role_id' + this.createRoles);
  }


  addProjectForUser() {
    console.log('USER >> ');
    console.log(this.editUsersProject);
    console.log('Creating  ----> ' + this.createRoles.length);
    this.allocatedUsersList.push(this.editUsersProject);
    const userProjectmapping = {
      userList: this.allocatedUsersList,
      project_id: this.selected_project_id,
      roleList: this.createRoles
    };
    console.log(userProjectmapping);
    this.userService.addProjectForUser(userProjectmapping).subscribe(data => {
      this.getUserDetails(localStorage.getItem('user_id'));
      this.getAllUsers();
    },
    err => {
      console.error(err);
    });
    this.deleteRoles = [];
    this.createRoles = [];
    this.allocatedUsersList = [];
    this.editUsersProject = null;
  }

  getAllUsers() {
    const portfolio = {
      portfolio_id: 'All',
      portfolio_name: 'All'
    };
    this.portfolio_name = '';
    this.account_name = '';
    this.project_name = '';
    this.userService.getUserList().subscribe( data => {
      this.users = data;
    }, err => {
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Users',
          detail: 'Error while fetching user list',
        });
    });
  }

  getAllUsersinPortfolio(portfolio_id){
    this.userService.getUsersInPortfolio(portfolio_id).subscribe(data=>{this.users = data;});
  }

  allUsersInProjectInAccountInPortfolio(project_id,account_id, portfolio_id){
    this.userService.getUsersInProAccPortfolio(project_id, account_id, portfolio_id).subscribe(data => { this.users = data;});
  }

  selectedPortfolioValue(portfolio) {
    this.portfolio_id = portfolio.portfolio_id;
    this.accountService.getAllAccountList(this.portfolio_id).subscribe(data =>{this.accounts = data}, error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Portfolio : '+this.portfolio_name,
        detail: 'Error while fetching account list',
      });
    });
    this.users = [];
    this.account_name = '';
    this.project_name = '';
  }

  selectedAccountValue(account) {
    this.account_id = account.accountId;
    this.usersSelected = [];

    this.projectService.getProjectList1(this.portfolio_id, this.account_id).subscribe(data => {
      this.projects = data;
    }, error => {
      this.project_name = '';
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account : '+this.account_name,
        detail: 'Error while fetching project list',
      });
    });
    this.userService.getUsersInAccountAndPorfolio(this.account_id, this.portfolio_id).subscribe(data=> {
      this.users = data;;
    }, err => {
      this.users = [];
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account : '+this.account_name,
        detail: 'Error while fetching users list',
      });
    });
  }

  selectedProjectValue(project) {
    console.log(project);
    this.project_id= project.project_id;
    this.usersSelected = [];
    this.selectedProjectName = project.project_name;

    this.userService.getUsersInProAccPortfolio(this.project_id, this.account_id, this.portfolio_id).subscribe(data => {
      this.users = data;;
    },
    err => {
      this.users = [];
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Project : '+this.project_name,
        detail: 'Error while fetching users list',
      });
    });
  }

  selPortfolioValue(portfolio_name, portfolio_id) {
    this.selected_portfolio_name = portfolio_name;
    this.selected_portfolio_id = portfolio_id;

    this.accountService.getAllAccountList(this.selected_portfolio_id).subscribe(data => {
      this.accounts = data;
    },
    err => {
      this.accounts = [];
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Portfolio : '+this.selected_portfolio_name,
        detail: err,
      });
    });
    this.selected_account_name = '';
    this.selected_project_name = '';
  }

  selAccountValue(accountName, account_id) {
    this.selected_account_name = accountName;
    this.selected_account_id = account_id;

    this.projectService.getProjectList1(this.selected_portfolio_id, this.selected_account_id).subscribe(data => {
      this.projects = data;
    },
    err => {
      this.projects = [];
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account : ' + this.selected_account_name,
        detail: err,
      });

    });
    this.selected_project_name = '';
  }

  selProject(project_name, project_id) {
    this.selected_project_name = project_name;
    this.selected_project_id = project_id;

    const userID = this.editUsersProject.user_id;
    this.userService.getUsersRolesInProject(userID, this.selected_project_id).subscribe(data => {
      this.rolesAllocated = data;
      Object.keys(this.rolesAllocated).forEach(key => {
        Object.keys(this.rolesAllocated[key]).forEach(key1 => {
          this.allocatedRoles.push(this.rolesAllocated[key][key1]);
        });
      });
    },
      err => {
        this.rolesAllocated = [];
        this.allocatedRoles = [];
    });

    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    },
    err => {
      this.roles = [];
      this.message.add({
        severity: 'error',
        summary: 'Role : ',
        detail: 'Error while fetching available roles',
      });
    });
  }

  checkRole(roleId) {
    if (this.allocatedRoles.includes(roleId)) {
      return true;
    } else {
      return false;
    }
  }

  selectedRoleValue(role) {
    if (this.createRoles.includes(role)) {
      this.index = this.createRoles.indexOf(role);
      this.createRoles.splice(this.index, 1);
      console.log('remove Roles >> ');
      console.log(this.createRoles);
    } else {
      this.createRoles.push(role);
      console.log('add Roles >> ');
      console.log(this.createRoles);
    }
  }

  saveRolesLocally() {
    const projectRoleMapping = {
      user_id: localStorage.getItem('user_id'),
      project_id: this.selected_project_id,
      roles: this.createRoles
    };
    this.locallyAllocatedRoles.push(projectRoleMapping);
    console.log(this.locallyAllocatedRoles);
    this.createRoles = [];
  }

  getUsersInProject(project_id) {
    console.log('hi projects testing');
    this.projectService.getUsersInProject().subscribe(data => {
      this.users = data;
    },
    error => {
      this.errMsg = error;
    });
  }

  getPortfolioList() {
    this.portfolioService.getAllPortfolio().subscribe( data => {
      this.portfolios = data;
    },
    error => {
      this.portfolios = [];
      this.errMsg = error;
    });
  }

  getAccountList() {
    this.accountService.getAccountList(this.portfolio_name).subscribe( data => {
      this.accounts = data;
    },
    error => {
      this.accounts = [];
      this.errMsg = error;
    });
  }

  getProjectsList() {
    this.projectService.getProjectList(this.portfolio_id, this.account_id ).subscribe( data => {
      this.projects = data;
    },
    error => {
      this.projects = [];
      this.errMsg = error;
    });
  }

  getParticularUser(){
    const user_id = localStorage.getItem('user_id');
    this.userService.getParticularUser(user_id).subscribe( data => {
      this.newUser = data;
    });
  }

  getUserDetails(user_id) {
    this.selectedUser = user_id;

    localStorage.setItem('user_id', user_id);
    this.userService.getParticularUser(this.selectedUser).subscribe( data => {
      this.editUsersProject = data;
      this.getPortfolioList();
      this.getAccountList();
      this.getProjectsList();
      this.allocatedRoles = [];
    }, error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'User : '+this.selectedUser,
        detail: 'Error while fetching user details',
      });
    });
    this.userService.getAllAllocatedProjectsAndRoles(this.selectedUser).subscribe( data => {
      this.userRoles = data;
    },
    err => {
      this.userRoles = [];
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Users : '+this.selectedUser,
        detail: 'Error while fetching Allocated projects and roles',
      });
    });
  }

  getUsersAllocatedProj(userid) {
    this.userService.getAllocatedProjects(userid).subscribe( data => {
      this.allocatedProjects = data;
      localStorage.setItem('user_id', userid);
      console.log( this.allocatedProjects);
    });
  }

  isCheckedForDeletion(project_id){
    if(this.deleteProjects.includes(project_id)){
      this.index = this.deleteProjects.indexOf(project_id);
      this.deleteProjects.splice(this.index, 1);
    } else {
      console.log(this.deleteProjects.includes(project_id));
      this.deleteProjects.push(project_id);
    }
    console.log('checked_project_id' + this.deleteProjects);
  }

  deallocateProjects(user_id, project_id) {
    let userList: any[] = [];
    userList.push(user_id);
    this.userService.deallocateProject(userList, project_id).subscribe(data => {
      console.log(data);
      this.getAllUsers();
      this.getUserDetails(user_id);
    },
    err => {
      console.error(err);
    });
  }

  updateUser() {
    this.userService.editUser(this.newUser).subscribe(data => {
      this.getAllUsers();
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'User : '+this.newUser.name,
        detail: 'User updated successfully',
      });
      this.usersSelected = [];
      this.newUser.name = '';
      this.newUser.user_id = '';
      this.newUser.password = '';

    }, error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Error while updating user : '+this.newUser.name,
        detail: error,
      });
    });
  }

  createUser() {
    this.userService.addUser(this.newUser).subscribe(data => {
      this.getAllUsers();
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'User: ' + this.newUser.name,
        detail: 'User creaded successfully',
      });
    }, error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'User: ' + this.newUser.name,
        detail: 'Error while creating user',
      });
    });
  }

  deleteUser(){
    const userID=localStorage.getItem('user_id');
    this.userService.deleteUser(userID).subscribe(data => {
      this.getAllUsers();
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.usersSelected = [];
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'User : '+userID,
        detail: 'User deleted successfully',
      });
    }, error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Error while creating user : '+userID,
        detail: error,
      });
    });
  }

  getRolesForUser(user_id, project_id) {
    this.selected_project_id = project_id;
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    },
    err => {
      this.roles = [];
    });
  }

  updateRoleForProject() {
    console.log('inside update role project');
    let userList: any[] = [];
    userList.push(localStorage.getItem('user_id'));
    const project_id = this.selected_project_id;
    this.userService.deallocateProject(userList, project_id).subscribe(data => {
      console.log(data);
      this.addProjectForUser();
      console.info(userList);
      console.info(project_id);
    },
    err => {
      console.error(err);
      console.log(userList);
      console.log(project_id);
    });
  }

  allocateMultipleUsersFromProject() {
    let userClass: any[] = [];
    this.usersSelected.forEach(element => {
      const userObj = {
        name: '',
        password: '',
        user_id: element
      }
      userClass.push(userObj);
    });
    const userProjectmapping = {
      userList: userClass,
      project_id: this.selected_project_id,
      roleList: this.createRoles
    };
    console.log(userProjectmapping);
    this.userService.addProjectForUser(userProjectmapping).subscribe(data => {
      console.log(data);
      this.getUserDetails(localStorage.getItem('user_id'));
      console.log('Project and Role Allocated Succesfully.');
      this.getAllUsers();
    },
    err => {
      console.error(err);
    });
    this.usersSelected = [];
    this.deleteRoles = [];
    this.createRoles = [];
    this.allocatedUsersList = [];
    this.editUsersProject = null;
  }

  deallocateMultipleUsersFromProject() {
    console.log(this.usersSelected);
    this.userService.deallocateProject(this.usersSelected, this.selected_project_id).subscribe(data => {
      console.log(data);
      this.getAllUsers();
    },
    err => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Deallocating Users',
        detail: err,
      });
    });
    this.usersSelected = [];
  }

  StoreDefault(userRole){
    const userRolepassed ={
          "project_id"  : userRole.project_id,
          "default_project": 'Y',
          "user_id":userRole.user_id,
    };
    this.userService.addDefaultProject(userRolepassed).subscribe( data => {
      this.getUserDetails(userRolepassed.user_id);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
