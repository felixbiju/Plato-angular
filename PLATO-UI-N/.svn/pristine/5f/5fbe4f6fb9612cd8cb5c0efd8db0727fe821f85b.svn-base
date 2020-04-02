import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';

import { AuthGuard } from '../shared/guards/auth.guard';

import { ConfigurationsComponent } from './configurations.component';
import { ConfigAccountsComponent } from './config-accounts/config-accounts.component';
import { ConfigProjectsComponent } from './config-projects/config-projects.component';
import { ConfigPermissionsComponent } from './config-permissions/config-permissions.component';
import { ConfigRolesComponent } from './config-roles/config-roles.component';
import { ConfigToolsComponent } from './config-tools/config-tools.component';
import { ConfigUsersComponent } from './config-users/config-users.component';
import { ConfigPorfoliosComponent } from './config-porfolios/config-porfolios.component';
import { ConfigEnvironmentComponent } from './config-environment/config-environment.component';
import {ConfigNodeComponent} from './config-node/config-node.component';
import {ConfigToollistComponent} from './config-toollist/config-toollist.component';

const configRoutes: Routes = [

  {

    path: 'config', component: ConfigurationsComponent, canActivate: [ AuthGuard ],

    children: [

      { path: '', component: ConfigPorfoliosComponent},

      { path: 'portfolio', component: ConfigPorfoliosComponent },

      { path: 'accounts', component: ConfigAccountsComponent },

      { path: 'projects', component: ConfigProjectsComponent },

      { path: 'permissions', component: ConfigPermissionsComponent },

      { path: 'roles', component: ConfigRolesComponent },

      { path: 'users', component: ConfigUsersComponent },

      { path: 'tools', component: ConfigToolsComponent },

      { path: 'environment', component: ConfigEnvironmentComponent },
      { path: 'node', component: ConfigNodeComponent },
      { path: 'toollist', component: ConfigToollistComponent },

    ]

  }

];

export const configRouting: ModuleWithProviders = RouterModule.forChild(configRoutes);
