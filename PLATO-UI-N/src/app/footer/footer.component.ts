import { Component, OnInit } from '@angular/core';

import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  title = 'Platform Assurance & Test Orchestrator';
  account_image = '../../assets/container_bg.png';
  isLoggedIn: boolean;

  constructor( private login: LoginService ) {
    this.login.loggedIn();
  }

  ngOnInit() {
    this.login.IsUserLoggedIn.subscribe( value => { this.isLoggedIn = value });
    this.isLoggedIn = this.login.isLoggedIn;
  }

}
