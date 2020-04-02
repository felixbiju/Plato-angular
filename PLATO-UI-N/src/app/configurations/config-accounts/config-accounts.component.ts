import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService} from '../../shared/services/account.service';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Accounts } from '../../shared/model/accounts';
import { Portfolios } from '../../shared/model/portfolio';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-accounts',
  templateUrl: './config-accounts.component.html',
  styleUrls: ['./config-accounts.component.css']
})
export class ConfigAccountsComponent implements OnInit, OnDestroy {

  accounts: Accounts[];
  account = new Accounts();
  portfolios : any[];
  isEditShow: boolean;
  isDeleteShow: boolean;
  accountId: number;
  account_name: string;
  account_head: string;
  // account_logo: string;
  background_image: string;
  account_status: string;
  portfolio_id: string = '';
  selectAll = false;
  checkedAccount = false;
  public checked_array: any[] = [];
  index: number;
  portfolio_name: string = '';
  screenPermission: any[];

  constructor(private accountService: AccountService, private portfolioServices: PortfolioService,
  private message: MessageService, private _permissions: PermissionService ) { }

  ngOnInit() {
    this.getDefaultData();
  }

  ngOnDestroy() {
    localStorage.removeItem('Config_Portfolio');
    localStorage.removeItem('Config_Account');
    localStorage.removeItem('Config_Project');
  }

  getPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          console.log('undefined');
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'account screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });
        }
      });
    });
  }

  getDefaultData() {
    this.getPermissionByRole();

    if (localStorage.getItem('Config_Portfolio') !== null) {
      this.portfolio_name = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_name;
      this.portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
      this.getAllAccounts();
    } else {
      this.portfolio_name = localStorage.getItem('portfolio_name');
      this.portfolio_id = localStorage.getItem('portfolio_id');
      this.getAllAccounts();
    }
    this.isEditShow = false;
    this.isDeleteShow = false;
    this.portfolioServices.getAllPortfolio().subscribe(data => this.portfolios = data);
  }

  isAllChecked() {
    this.checked_array = [];
    localStorage.removeItem('Config_Account');
    console.log(this.selectAll);
    if (!this.selectAll) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      this.checkedAccount = true;
    } else {
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.checkedAccount = false;
    }
  }

  isChecked(account) {
    if (this.checked_array.includes(account.accountId)) {
      console.log("Unchecked array is >> " + account.accountId);
      this.checked_array = this.checked_array.filter((val, i) => val !== account.accountId);
    } else {
      this.checked_array.push(account.accountId);
      localStorage.setItem('Config_Account', JSON.stringify(account));
    }

    if (this.checked_array.length === 1) {
      this.isEditShow  = true;
      this.isDeleteShow  = true;
      localStorage.setItem('Config_Account', JSON.stringify(this.checked_array[0]));
    } else if (this.checked_array.length >= 2) {
      this.isEditShow  = false;
      this.isDeleteShow  = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow = false;
      this.isDeleteShow = false;
    }
    localStorage.setItem("Config_Account", JSON.stringify(account));
    // localStorage.setItem("account_name", account_name);
  }

  selectedPortfolio(portfolio) {
    localStorage.setItem('Config_Portfolio', JSON.stringify(portfolio));
    this.getAllAccounts();
  }

  createAccount() {
    let portfolio_id;
    if(localStorage.getItem('Config_Portfolio') !== null) {
      portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
    } else {
      portfolio_id = localStorage.getItem('portfolio_id');
    }
    const newAccount = {
        account_name: this.account_name,
        account_head: this.account_head
    }
    this.accountService.addAccount(portfolio_id, newAccount).subscribe( data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Account - ' + this.account_name ,
        detail: data,
      });
      this.getAllAccounts();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account -',
        detail: error,
      });
    });
  }

  getAllAccounts() {
    if (localStorage.getItem('Config_Portfolio') !== null) {
      this.portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
    } else {
      this.portfolio_id = localStorage.getItem('portfolio_id');
    }
    this.accountService.getAllAccountList(this.portfolio_id).subscribe( data => {
      this.accounts = data;
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account -',
        detail: error,
      });
    });
  }

  getParticularAccount() {
    const account = JSON.parse(localStorage.getItem('Config_Account'));
    this.accountService.getAccountById(account.accountId).subscribe( data => {
      this.account = data;
      console.log('hi :: ' + account.accountName);
    });
  }

  updateAccount() {
    let portfolioId;
    if (localStorage.getItem('Config_Portfolio') !== null) {
      portfolioId = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
    } else {
      portfolioId = localStorage.getItem('portfolio_id');
    }

    if(this.account.accountName) {
      const updatedaccount = {
        account_id: this.account.accountId,
        account_name: this.account.accountName,
        account_head: this.account.accountHead
      }

      this.accountService.updateAccount(portfolioId, updatedaccount).subscribe( data => {
        this.message.clear();
        this.message.add({
          severity: 'check',
          summary: 'Account - '+this.account.accountName,
          detail: data,
        });
        this.getAllAccounts();
      },
      error => {
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Account - '+this.account.accountName,
          detail: error,
        });
      });
    } else {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account - '+this.account.accountName,
        detail: 'Invalid Account Name',
      });
    }
    this.checked_array = [];
  }

  deleteAccounts() {
    const account = JSON.parse(localStorage.getItem('Config_Account'));
    this.accountService.deleteAccountById(account).subscribe(data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Account - '+account.accountName,
        detail: data,
      });
      this.getAllAccounts();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Account - '+account.accountName,
        detail: error,
      });
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}



