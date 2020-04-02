import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {

  title = 'Platform Assurance & Test Orchestrator';
  account_image = '../../assets/container_bg.png';

  constructor() { }

  ngOnInit() {
  }

}
