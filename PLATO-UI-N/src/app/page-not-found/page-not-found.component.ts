import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor( private login: LoginService, private router: Router ) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.login.IsUserLoggedIn.next(false);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
