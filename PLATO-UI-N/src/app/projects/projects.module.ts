import { NgModule } from '@angular/core';
// import { TrendModule } from 'ngx-trend';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatTabsModule
} from '@angular/material';


import { DragDropModule, GrowlModule } from 'primeng/primeng';
// import {MatDividerModule} from '@angular/material/divider';

import { projectRouting } from './project.routing';
import { ToolPipe } from '../shared/pipes/tool.pipe';
import { ColFormatPipe } from '../shared/pipes/col-format.pipe';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { reverseSort } from '../shared/pipes/reverseSort.pipe';
import { ArrangeByPipe } from '../shared/pipes/arrange.pipe';
import { TableFilterPipe } from '../shared/pipes/userFilter.pipe';
import { FilterCheckpointsPipe } from '../shared/pipes/filterCheckpoints.pipe';
import { ReplaceUnderscore } from '../shared/pipes/replace.pipe';

import { ProjectComponent } from './project.component';
import { PFooterComponent } from './p-footer/p-footer.component';
import { PHeaderComponent } from './p-header/p-header.component';


import { OrchestrationComponent } from './orchestration/orchestration.component';
import { PHomeComponent } from './p-home/p-home.component';
import { ReportsComponent } from './reports/reports.component';
import { PreBuildcheckComponent } from './reports/pre-buildcheck/pre-buildcheck.component';
import { CheckImpactComponent } from './reports/check-impact/check-impact.component';
import { GdprComponent } from './reports/gdpr/gdpr.component';
import { LiveBuildComponent } from './reports/live-build/live-build.component';
import { TechnicalDebtComponent } from './reports/technical-debt/technical-debt.component';
import { PerformanceComponent } from './reports/performance/performance.component';
import { E2EtestComponent } from './reports/e2-etest/e2-etest.component';
import { TestrightComponent } from './reports/testright/testright.component';
import { EcoSystemComponent } from './reports/eco-system/eco-system.component';
import { EnvironmentReadyComponent } from './environment-ready/environment-ready.component';
import { ChangeImpactComponent } from './change-impact/change-impact.component';
import { DatatestingComponent } from './reports/datatesting/datatesting.component';
import { SecurityTestingComponent } from './reports/security-testing/security-testing.component';
import { TrendReportComponent } from './reports/trend-report/trend-report.component';
import { QtpReportComponent } from './reports/qtp-report/qtp-report.component';
import { TaskmanagerComponent } from './reports/taskmanager/taskmanager.component';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { PanelComponent } from './reports/panel/panel.component';
import { LiveBuildWithVideoComponent } from './reports/live-build-with-video/live-build-with-video.component';

@NgModule({

  imports: [
    CommonModule,
    projectRouting,

    DragDropModule,
    GrowlModule,

    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SortablejsModule,

    CdkTableModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
    MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule, MatTabsModule

  ],

  declarations: [
    ProjectComponent,
    OrchestrationComponent,
    PHomeComponent,
    PHeaderComponent,
    PFooterComponent,
    ReportsComponent,
    PreBuildcheckComponent,
    CheckImpactComponent,
    GdprComponent,
    LiveBuildComponent,
    TechnicalDebtComponent,
    PerformanceComponent,
    TestrightComponent,
    E2EtestComponent,
    EcoSystemComponent,
    EnvironmentReadyComponent,
    ChangeImpactComponent,
    DatatestingComponent,
    SecurityTestingComponent,
    PanelComponent,
    LiveBuildWithVideoComponent,

    ToolPipe,
    ColFormatPipe,
    ReversePipe,
    TableFilterPipe,
    reverseSort,
    ArrangeByPipe,
    FilterCheckpointsPipe,
    ReplaceUnderscore,
    TrendReportComponent,
    QtpReportComponent,
    TaskmanagerComponent,
    SafePipe
  ]

})

export class ProjectsModule { }
