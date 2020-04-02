import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-footer',
  templateUrl: './p-footer.component.html',
  styleUrls: ['./p-footer.component.css']
})
export class PFooterComponent implements OnInit {

  title = 'Platform Assurance & Test Orchestrator';
  account_image = '../../assets/container_bg.png';

  constructor() { }

  ngOnInit() {
  }

}
