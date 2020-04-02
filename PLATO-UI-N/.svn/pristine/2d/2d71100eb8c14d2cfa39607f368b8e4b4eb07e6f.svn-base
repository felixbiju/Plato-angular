import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { RolesService } from '../../shared/services/roles.service';
import { PermissionService } from '../../shared/services/permissions.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-config-permissions',
  templateUrl: './config-permissions.component.html',
  styleUrls: ['./config-permissions.component.css']
})

export class ConfigPermissionsComponent implements OnInit {

  roles: any[] = [];
  permissionsData: any[] = [];
  selectedRole: any = null;
  alldata: any[] = [];
  screenPermission: any[];
  screenData: any[];

  constructor(private _roles: RolesService, private _permissions: PermissionService, private _loader: LoaderService, private message: MessageService) { }

  ngOnInit() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'permissions screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
    this.getAllPermission();
    this.getAllRoles();
  }

  getAllRoles() {
    this._roles.getAllRoles().subscribe(roles => {
      this.roles = roles;
    },
    error => {
      this.roles = [];
      console.error(error);
    });
  }

  getAllPermission() {
    this._permissions.getAllPermissions().subscribe( permissions => {
      this.screenData = permissions.permissionData;
    },
    error => {
      console.error(error);
    });
  }

  getAllPermissionbyRole(role) {
    this._loader.changeLoaderStatus(true);
    this._permissions.getAllPermissionsByRole(role).subscribe( permissions => {
      if ( permissions !== null && permissions.permissionData !== undefined ) {
        this.mapRoleWisePermissionWithAllPermissions(permissions);
      } else {
        console.log('no permission found in role ==> ' + role.Name);
        this.getAllPermission();
      }
      this._loader.changeLoaderStatus(false);
    },
    error => {
      console.error(error);
      this._loader.changeLoaderStatus(false);
    });
  }

  mapRoleWisePermissionWithAllPermissions(userPermissions) {
    this._permissions.getAllPermissions().subscribe(permissions$ => {
      this.screenData = permissions$.permissionData;
      userPermissions.permissionData.forEach(moduleData => {
        const module$ = this.screenData.filter((val, i) => val.moduleName === moduleData.moduleName);
        moduleData.screens.forEach(screen => {
          const screen$ = module$[0].screens.filter((val, i) => val.screenName === screen.screenName);
          const falseComp = screen.components.filter((val, i) => val.checked === false);
          if (falseComp.length > 0) {
            module$[0].checked = false;
            screen$[0].checked = false;
          } else {
            module$[0].checked = true;
            screen$[0].checked = true;
          }
          screen.components.forEach(component => {
            screen$[0].components.forEach(component$ => {
              if (component.name === component$.name) {
                component$.checked = component.checked;
              }
            });
          });
        });
      });
    },
    error => {
      console.error(error);
    });
  }

  selectRole(role) {
    this.selectedRole = role;
    this.getAllPermissionbyRole(role);
  }

  savePermission() {
    this._loader.changeLoaderStatus(true);
    const roleWisePermission = {
      permissionData: this.screenData
    };
    this._permissions.savePermissionByRole(this.selectedRole, roleWisePermission).subscribe( data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Permission',
        detail: 'Permissions saved successfully'
      });
      this._loader.changeLoaderStatus(false);
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Permission',
        detail: 'Error while modifying permissions'
      });
      this._loader.changeLoaderStatus(false);
    });
  }

  deletePermissionByRole() {
    this._loader.changeLoaderStatus(true);
    this._permissions.deletePermissionByRole(this.selectedRole).subscribe(res => {
      console.log(res);
      this._loader.changeLoaderStatus(false);
      this.savePermission();
    },
    error => {
      this._loader.changeLoaderStatus(false);
      console.error(error);
    });
  }

  isModuleChecked(currentModule) {
    currentModule.screens.forEach(screen => {
      screen.checked = !currentModule.checked;
      screen.components.forEach(component => {
        component.checked = !currentModule.checked;
      });
    });
  }

  isScreenChecked(screen) {
    screen.components.forEach(component => {
      component.checked = !screen.checked;
    });
  }

  isComponentChecked(currentModule, screen, component) {
    if (component.checked === false) {
      currentModule.checked = !component.checked;
      screen.checked = !component.checked;
    }
  }
}
