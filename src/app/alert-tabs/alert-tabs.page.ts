import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-tabs',
  templateUrl: './alert-tabs.page.html',
  styleUrls: ['./alert-tabs.page.scss'],
})
export class AlertTabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  test(e) {
    console.log(e)
  }
}
