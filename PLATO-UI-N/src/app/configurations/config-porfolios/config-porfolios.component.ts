import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl,NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../shared/services/login.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Portfolios } from '../../shared/model/portfolio';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { PermissionService } from '../../shared/services/permissions.service';

@Component({
  selector: 'app-config-porfolios',
  templateUrl: './config-porfolios.component.html',
  styleUrls: ['./config-porfolios.component.css']
})
export class ConfigPorfoliosComponent implements OnInit, OnDestroy {

  selectAll = false;
  selectedPortfolio = false;

  portfolios: any[] = [];
  portfolio_name : string;
  portfolio1_name: string;
  portfolio_id : number;
  isEditShow: boolean;
  isDeleteShow: boolean;
  public checked_array: any[] = [];
  screenPermission: any[];

  alphabets = ['A','B','C','D','E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor( private _portfolio: PortfolioService, private login: LoginService, private message: MessageService,
               private _permissions: PermissionService ) { }


  ngOnInit() {
    this.getAllPortfolio();
    this.getAllPermissionByRole();
  }

  ngOnDestroy() {
    localStorage.removeItem('Config_Portfolio');
    localStorage.removeItem('Config_Account');
    localStorage.removeItem('Config_Project');
  }

  getAllPermissionByRole() {
    this._permissions.currentRole.subscribe(role => {
      this._permissions.getAllPermissionsByRole(role).subscribe(permissions => {
        if (permissions.permissionData === undefined) {
          this.screenPermission = [];
        } else {
          permissions.permissionData.forEach(module => {
            if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
              module.screens.forEach(screen => {
                if (screen.screenName.toLowerCase() === 'portfolio screen') {
                  this.screenPermission = screen.components;
                }
              });
            }
          });

        }
      });
    });
    // this._permissions.getAllPermissions().subscribe(permisssion => {
    //   permisssion.permissionData.forEach(module => {
    //     if (module.moduleName.toUpperCase() === 'CONFIGURATION MODULE') {
    //       module.screens.forEach(screen => {
    //         if (screen.screenName.toLowerCase() === 'portfolio screen') {
    //           this.screenPermission = screen.components;
    //         }
    //       });
    //     }
    //   });
    //   console.log(this.screenPermission);
    // });
  }

  setAllChecked() {
    this.checked_array = [];
    localStorage.removeItem('Config_Portfolio');
    if(!this.selectAll) {
      this.isEditShow = false;
      this.isDeleteShow = true;
      this.selectedPortfolio = true;
    } else {
      this.isEditShow = false;
      this.isDeleteShow = false;
      this.selectedPortfolio = false;
    }
  }

  isChecked(portfolio) {
    if (this.checked_array.includes(portfolio.portfolio_id)) {
      this.checked_array = this.checked_array.filter((val, i) => val !== portfolio.portfolio_id);
    } else {
      this.checked_array.push(portfolio.portfolio_id);
      localStorage.setItem('Config_Portfolio', JSON.stringify(portfolio));
    }

    if (this.checked_array.length === 1) {
      this.isEditShow = true;
      this.isDeleteShow = true;
    } else if (this.checked_array.length >= 2) {
      this.isEditShow = false;
      this.isDeleteShow = true;
    } else if (this.checked_array.length < 1) {
      this.isEditShow  = false;
      this.isDeleteShow  = false;
    }
  }

  getAllPortfolio() {
    this._portfolio.getAllPortfolio().subscribe(data => {this.portfolios = data},
      error => {
        this.message.clear();
        this.message.add({
          severity: 'error',
          summary: 'Logging Failed',
          detail: error,
      });
    });
  }

  getPortfolioname() {
    this.portfolio1_name = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_name;
  }

  createPortfolio() {
    this.checked_array = [];
    const newPortfolio = {
      portfolio_name: this.portfolio_name
    }

    this._portfolio.addPortfolio(newPortfolio).subscribe( data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Portfolio - '+this.portfolio_name,
        detail: data,
      });
      this.getAllPortfolio();
      // this.getAllPortfolio();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Portfolio -',
        detail: error,
      });
    });
  }

  updatePortfolio() {
    let portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
    const updatedPortfolio = {
      portfolio_id: portfolio_id,
      portfolio_name : this.portfolio1_name
    }

    this._portfolio.updatePortfolio(updatedPortfolio, portfolio_id).subscribe(data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Portfolio - '+updatedPortfolio.portfolio_name,
        detail: data,
      });
      this.getAllPortfolio();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Portfolio - '+updatedPortfolio.portfolio_name,
        detail: error,
      });
    });
    this.checked_array = [];
  }

  deletePortfolio() {
    const portfolio_id = JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_id;
    this._portfolio.deletePortfolioById(portfolio_id).subscribe(data => {
      this.message.clear();
      this.message.add({
        severity: 'check',
        summary: 'Portfolio - '+JSON.parse(localStorage.getItem('Config_Portfolio')).portfolio_name,
        detail: data,
      });
      this.getAllPortfolio();
    },
    error => {
      this.message.clear();
      this.message.add({
        severity: 'error',
        summary: 'Portfolio -',
        detail: error,
      });
    });
   this.checked_array = [];
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
