import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Tasks } from '../../shared/model/tasks';
import { Roles } from '../../shared/model/roles';
import { RolesService } from '../../shared/services/roles.service';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-roles',
  templateUrl: './config-roles.component.html',
  styleUrls: ['./config-roles.component.css']
})
export class ConfigRolesComponent implements OnInit {

  projects: any[];
  name: string;
  company: string;
  stage: number;
  task = new Tasks();
  selectedID: string;
  id: string;
  roles: any[];
  roleName : string;
  role_name : string;
  roleId : number;

  isDeleteShow:boolean;
  isEditShow:boolean;
  selectAll = false;
  check2 = false;
  public checked_array: any[] = [];
  screenPermission: any[];

  constructor(private dashboard: DashboardService, private _role: RolesService, private _permissions: PermissionService, private _message: MessageService ) { }

  ngOnInit() {
    this.getPermissionByRole();
    this.isDeleteShow = false;
    this.isEditShow = false;
    this.getAllRoles();
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'roles screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
  }

  isAllSelected() {
    this.checked_array = [];
    localStorage.removeItem('roleID');
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

  isChecked(roleID,roleName) {
    if (this.checked_array.includes(roleID)) {
      this.checked_array = this.checked_array.filter((val, i) => val !== roleID);
    } else {
      this.checked_array.push(roleID);
      localStorage.setItem('roleID', roleID);
    }

    if (this.checked_array.length === 1) {
      this.isEditShow  = true;
      this.isDeleteShow  = true;
      localStorage.setItem('roleID', this.checked_array[0]);
    } else if (this.checked_array.length >= 2) {
      this.isEditShow  = false;
      this.isDeleteShow  = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    }
    localStorage.setItem('roleId',roleID);
    localStorage.setItem('roleName',roleName);
    this.role_name = localStorage.getItem('roleName');
  }

  getAllRoles() {
    this._role.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }

  createRole() {
    const newRole = {
      role_name : this.roleName
    }
    this._role.addRole(newRole).subscribe( data => {
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Role : '+this.roleName,
        detail: 'Role created successfully'
      });
      this.getAllRoles();
    }, error => {
      console.log(error);
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Error while creating role : '+this.roleName,
        detail: error._body
      });
    });
  }

  updateRole() {
    const updatedRole = {
      role_id : localStorage.getItem('roleId'),
      role_name : this.role_name
    }
    this._role.updateRole(updatedRole).subscribe(data => {
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Role : '+this.role_name,
        detail: 'Role updated successfully'
      });
      this.getAllRoles();
      this.isDeleteShow = false;
      this.isEditShow = false;
    }, error => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Role : '+this.role_name,
        detail: error._body
      });
    });
    this.checked_array = [];
  }

  deleteRole() {
    this._role.deleteRole().subscribe(data => {
      this._message.clear();
      this._message.add({
        severity: 'check',
        summary: 'Role',
        detail: 'Role Deleted successfully'
      });
      this.getAllRoles();
      this.isDeleteShow=false;
      this.isEditShow=false;
    }, error => {
      this._message.clear();
      this._message.add({
        severity: 'error',
        summary: 'Role',
        detail: error._body
      });
    });
  }
  resetForm(form: NgForm) {
    form.reset();
  }
}
