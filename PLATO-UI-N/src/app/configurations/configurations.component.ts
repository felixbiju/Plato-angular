import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PortfolioService } from '../shared/services/portfolio.service';
import { ProjectService } from '../shared/services/project.service';
import { LoginService } from '../shared/services/login.service';
import { ModuleService } from '../shared/services/module.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-config',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})

export class ConfigurationsComponent implements OnInit {

  selectedConfigName = '';
  selectedPortfolioName = '';
  selectedAccountName = '';
  selectedProjectName = '';

  portfolios: any[];
  accounts: any[];
  projects: any[];
  modules: any[];

  constructor( private dashboard: DashboardService, private router: Router, private account: AccountService,
               private login: LoginService, private moduleService: ModuleService, private project: ProjectService,
               private portfolio: PortfolioService, ) {}

  ngOnInit() {
    if (localStorage.getItem('selectedConfigName') !== null) {
      this.selectedConfigName = localStorage.getItem('selectedConfigName');
    }
    this.getPortfolioList();
  }

  selectPortfolioName(portfolio_name) {
    this.selectedPortfolioName = '';
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedPortfolioName = portfolio_name;
    localStorage.removeItem('portfolio_name');
    localStorage.setItem('portfolio_name', this.selectedPortfolioName);
    console.log(this.selectedPortfolioName);
    this.getAccountList();
  }

  selectAccountName(account_name) {
    this.selectedAccountName = '';
    this.selectedProjectName = '';
    this.selectedAccountName = account_name;
    localStorage.removeItem('account_name');
    localStorage.setItem('account_name', this.selectedAccountName);
    console.log(this.selectedAccountName);
    this.getProjectList();
  }

  selectProjectName(project_name) {
    this.selectedProjectName = '';
    this.selectedProjectName = project_name;
    localStorage.removeItem('project_name');
    localStorage.setItem('project_name', this.selectedProjectName);
    console.log(this.selectedProjectName);
  }

  getPortfolioList() {
    this.portfolio.getPortfolioList().subscribe( data => this.portfolios = data );
  }

  getAccountList() {
    this.account.getAccountList(this.selectedPortfolioName).subscribe( data => this.accounts = data );
  }

  getProjectList() {
    this.project.getProjectList( this.selectedPortfolioName, this.selectedAccountName ).subscribe( data => this.projects = data );
  }

  selectConfig(event: any) {
    this.selectedConfigName = event.target.innerText;
    localStorage.setItem('selectedConfigName', this.selectedConfigName);
  }
}
