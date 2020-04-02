import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
         MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule,
         MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
         MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
         MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatTabsModule, MatListModule,
        } from '@angular/material';

import { DataTableModule, SharedModule, OrderListModule } from 'primeng/primeng';

import { configRouting } from './configurations.routing';

import { ConfigurationsComponent } from './configurations.component';
import { ConfigProjectsComponent } from './config-projects/config-projects.component';
import { ConfigAccountsComponent } from './config-accounts/config-accounts.component';
import { ConfigUsersComponent } from './config-users/config-users.component';
import { ConfigRolesComponent } from './config-roles/config-roles.component';
import { ConfigPermissionsComponent } from './config-permissions/config-permissions.component';
import { ConfigToolsComponent } from './config-tools/config-tools.component';
import { ConfigPorfoliosComponent } from './config-porfolios/config-porfolios.component';
import { ConfigEnvironmentComponent } from './config-environment/config-environment.component';
import { ConfigHeaderComponent } from './config-header/config-header.component';
import { ConfigFooterComponent } from './config-footer/config-footer.component';
import { ConfigNodeComponent } from './config-node/config-node.component';
import { UserPipe } from '../shared/pipes/user.pipe';
import { SortByPipe } from '../shared/pipes/sortBy.pipe';
import { CheckPointsFilterPipe } from '../shared/pipes/checkPointsFilter.pipe';
import { ConfigToollistComponent } from './config-toollist/config-toollist.component';

@NgModule({
  imports: [
    CommonModule,

    configRouting,
    FormsModule,
    ReactiveFormsModule,

    SortablejsModule,
    DataTableModule, SharedModule, OrderListModule,

    CdkTableModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
    MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule, MatTabsModule, MatListModule,

  ],

  declarations: [
    ConfigurationsComponent,
    ConfigProjectsComponent,
    ConfigAccountsComponent,
    ConfigUsersComponent,
    ConfigRolesComponent,
    ConfigPermissionsComponent,
    ConfigToolsComponent,
    ConfigPorfoliosComponent,
    ConfigEnvironmentComponent,
    ConfigHeaderComponent,
    ConfigFooterComponent,
    ConfigNodeComponent,

    UserPipe,
    SortByPipe,
    CheckPointsFilterPipe,
    ConfigToollistComponent,
  ]

})
export class ConfigurationsModule { }
