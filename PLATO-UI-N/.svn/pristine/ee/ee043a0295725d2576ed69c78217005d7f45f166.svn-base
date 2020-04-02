import { ToolMapping } from './../shared/model/toolMapping';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { LoginService } from '../shared/services/login.service';
import { ProjectService } from '../shared/services/project.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username: string;
  password:string;
  url: string;
  users: User[] = [];
  user: User;
  isLoggedIn = false;

  loginType: any;
  guestLogin = false;

  constructor( private router: Router, private login: LoginService, private message: MessageService, private _project: ProjectService ) {}

  ngOnInit() {
    if (this.login.loggedIn() === true) {
      this.login.IsUserLoggedIn.next(false);
      this.login.loggedOut();
    }
    localStorage.setItem('poolingTime', '1');
  }

  onLoginSubmit() {
    const newUser = {
      user_id: this.username,
      password: this.password,
    };
    return this.login.authenticateUser(newUser).subscribe( user => {

      const userData = {
        name: user.userName,
        email: this.username,
        defaultProjectDetails: user.defaultProjectDetails
      };
      this._project.changeProject(user.defaultProjectDetails.project_id);
      localStorage.setItem('project_id', user.defaultProjectDetails.project_id);
      localStorage.setItem('project_name', user.defaultProjectDetails.project_name);
      localStorage.setItem('userData', JSON.stringify(userData));
      if (user.success) {
        localStorage.setItem('userId', this.username);
        this.message.clear();
        this.message.add({
          severity: 'sentiment_very_satisfied',
          summary: 'Welcome back',
          detail: user.userName,
        });
        this.login.IsUserLoggedIn.next(true);
        this.login.storeUserData(user);
        this.router.navigate(['dashboard']);
      }
    },
    error => {
      console.log('error');
      this.message.clear();
      this.message.add({
        severity:'sentiment_dissatisfied',
        summary:'Logging Failed',
        detail: error,
      });
      this.router.navigate(['login']);
    });
  }

  loginTypeMethod(loginType) {
    if(loginType === 'guestLogin') {
      this.guestLogin = true;
    } else {
      this.guestLogin = false;
      this.message.clear();
      this.message.add({
        severity: 'info',
        summary: 'Domain Logging',
        detail: 'Domain Loging is not available.',
      });
    }
  }

  getPassword(username) {}
}
