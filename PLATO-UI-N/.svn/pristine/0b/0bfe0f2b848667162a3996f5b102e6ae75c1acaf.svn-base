import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './shared/guards/auth.guard';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default Route or login route

  { path: 'login', component: LoginComponent },

  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardV2Component },

  { path: 'dashboard/:name', canActivate: [AuthGuard], component: DashboardV2Component },

  { path: 'user-details', canActivate: [AuthGuard], component: UserDetailsComponent },

  { path: 'error', component: PageNotFoundComponent, canActivate: [AuthGuard] },

  // "Catch-All-incorrect-routes"
  { path: '**', component: PageNotFoundComponent , canActivate: [AuthGuard] },

];

export const appRoutingProviders: any[] = [ ];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
