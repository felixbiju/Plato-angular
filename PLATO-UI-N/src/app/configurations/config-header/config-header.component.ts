import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../shared/services/login.service';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-config-header',
  templateUrl: './config-header.component.html',
  styleUrls: ['./config-header.component.css']
})
export class ConfigHeaderComponent implements OnInit {

  account_logo = '../../assets/RSA/RSA.png';
  account_image = '../../assets/container_bg.png';
  user_pic = '../../assets/sohail.jpg';
  roles: any[];

  constructor(private dashboard: DashboardService, private login: LoginService, private router: Router, ) { }

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this.dashboard.getRoleList().subscribe( data => this.roles = data );
  }

  accountDetails() {
    this.router.navigate( ['user-details'] );
  }

  logout() {
    this.login.loggedOut();
  }
}
