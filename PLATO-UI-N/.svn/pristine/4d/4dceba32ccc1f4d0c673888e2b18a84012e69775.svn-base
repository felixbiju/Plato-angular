import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../shared/services/login.service';
import { DashboardService } from './../../shared/services/dashboard.service';

@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrls: ['./p-header.component.css']
})

export class PHeaderComponent implements OnInit {

  account_logo = '../../assets/RSA/RSA.png';
  account_image = '../../assets/container_bg.png';
  user_pic = '../../assets/sohail.jpg';
  roles: any[];

  constructor( private router: Router,
               private login: LoginService,
               private dashboard: DashboardService, ) {
  }

  ngOnInit() {
  }

  accountDetails() {
    this.router.navigate( ['user-details'] );
  }

  getRoleList() {
    this.dashboard.getRoleList().subscribe( data => this.roles = data );
  }

  logout() {
    this.login.loggedOut();
  }

}
