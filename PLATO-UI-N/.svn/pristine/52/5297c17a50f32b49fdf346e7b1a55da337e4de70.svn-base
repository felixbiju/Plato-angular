import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';

import { AuthGuard } from '../shared/guards/auth.guard';

import { ProjectComponent } from './project.component';
import { PHomeComponent } from './p-home/p-home.component';
import { OrchestrationComponent } from './orchestration/orchestration.component';
import { EnvironmentReadyComponent } from './environment-ready/environment-ready.component';
import { ChangeImpactComponent } from './change-impact/change-impact.component';

import { ReportsComponent } from './reports/reports.component';
import { PreBuildcheckComponent } from './reports/pre-buildcheck/pre-buildcheck.component';
import { CheckImpactComponent } from './reports/check-impact/check-impact.component';
import { E2EtestComponent } from './reports/e2-etest/e2-etest.component';
import { EcoSystemComponent } from './reports/eco-system/eco-system.component';
import { GdprComponent } from './reports/gdpr/gdpr.component';
import { LiveBuildComponent } from './reports/live-build/live-build.component';
import { LiveBuildWithVideoComponent } from './reports/live-build-with-video/live-build-with-video.component';
import { PerformanceComponent } from './reports/performance/performance.component';
import { TechnicalDebtComponent } from './reports/technical-debt/technical-debt.component';
import { DatatestingComponent } from './reports/datatesting/datatesting.component';
import { SecurityTestingComponent } from './reports/security-testing/security-testing.component';
import { TrendReportComponent } from './reports/trend-report/trend-report.component';
import { QtpReportComponent } from './reports/qtp-report/qtp-report.component';

const projectRoutes: Routes = [

  {
    path: 'project', component: ProjectComponent, canActivate: [ AuthGuard ],
    children: [
      { path: '', component: PHomeComponent },
      { path: 'orchestration', component: OrchestrationComponent },
      { path: 'env-ready', component: EnvironmentReadyComponent },
      { path: 'changeImpact', component: ChangeImpactComponent },
      { path: 'trend', component: TrendReportComponent },
      { path: 'qtp', component: QtpReportComponent},
      // { path: 'reportTabs', component: ReportsComponent },
      { path: 'reports', component: PreBuildcheckComponent },
      { path: 'pre-build', component: PreBuildcheckComponent },
      { path: 'check-impact', component: CheckImpactComponent },
      { path: 'e2e', component: E2EtestComponent },
      { path: 'ecosystem', component: EcoSystemComponent },
      { path: 'gdpr', component: GdprComponent },
      { path: 'live-build', component: LiveBuildComponent },
      // { path: 'live-build', component: LiveBuildWithVideoComponent },
      { path: 'technical-debt',  component: TechnicalDebtComponent  },
      { path: 'performance',  component: PerformanceComponent  },
      { path: 'dataTesting', component: DatatestingComponent },
      { path: 'securityTesting', component: SecurityTestingComponent }
    ]
  }
];

export const projectRouting: ModuleWithProviders = RouterModule.forChild(projectRoutes);
