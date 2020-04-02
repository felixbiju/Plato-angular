import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';
import { SortablejsModule } from 'angular-sortablejs';
import { ProjectsModule } from './projects/projects.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { TestModuleModule } from './test-module/test-module.module';

import { appRouting, appRoutingProviders } from './app.routing';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginService } from './shared/services/login.service';
import { PortfolioService } from './shared/services/portfolio.service';
import { AccountService } from './shared/services/account.service';
import { ProjectService } from './shared/services/project.service';
import { ModuleService } from './shared/services/module.service';
import { DashboardService } from './shared/services/dashboard.service';
import { RolesService } from './shared/services/roles.service';
import { ReportService } from './shared/services/report.service';
import { EnvironmentService } from './shared/services/environment.service';
import { UserService } from './shared/services/user.service';
import { ToolService } from './shared/services/tools.service';
import { NodeService } from './shared/services/node.service';
import { LoaderService } from './shared/services/loader.service';
import { ChangeimpactService } from './shared/services/changeimpact.service';
import { PermissionService } from './shared/services/permissions.service';
import { TestCaseFactoryService } from './shared/services/testcase-factory.service';
import { StreamingService } from './shared/services/streaming.service';
import { MessageService } from 'primeng/components/common/messageservice';

import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatTabsModule
} from '@angular/material';

import { GrowlModule } from 'primeng/primeng';

import { TableFilterPipe } from './shared/pipes/tablefilter.pipe';
import { DateDifference } from './shared/pipes/datediff.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';

export function configProvider(cs: AppConfig) {
  return () => cs.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserDetailsComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
    TableFilterPipe,
    DateDifference,
    DashboardV2Component,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,

    // global settings
    SortablejsModule.forRoot({
      animation: 200
    }),
    GrowlModule,

    appRouting,
    ProjectsModule,
    ConfigurationsModule,
    TestModuleModule,

    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    ChartsModule
  ],

  providers: [
    LoaderService,
    RolesService,
    MessageService,
    LoginService,
    PortfolioService,
    AccountService,
    ProjectService,
    ModuleService,
    DashboardService,
    AuthGuard,
    appRoutingProviders,
    ReportService,
    EnvironmentService,
    ToolService,
    UserService,
    NodeService,
    ChangeimpactService,
    PermissionService,
    TestCaseFactoryService,
    StreamingService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: configProvider,
      deps: [AppConfig],
      multi: true
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
