import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';

import { AuthGuard } from '../shared/guards/auth.guard';

import { TestConfigurationComponent } from './test-configuration/test-configuration.component';

const testModuleRoutes: Routes = [

  {
    path: 'TC_Factory', component: TestConfigurationComponent, canActivate: [AuthGuard],
    // children: [
    // ]
  }
];

export const testModuleRouting: ModuleWithProviders = RouterModule.forChild(testModuleRoutes);
