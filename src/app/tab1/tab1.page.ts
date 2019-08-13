import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private menu: MenuController,
    public router: Router,
  ) { }
  ngOnInit() {
    // window.addEventListener('load', event => {
    //   document.querySelector('.button_details').addEventListener('click', (event) => {
    //     document.querySelector('.menu_main').toggle();
    //   });
    // });
  }
  public currentIndex = 0;
  public test = 100;
 
  public tabsArr = [
    {
      title: '未恢复',
      index: 0,
      path: '/tabs/tab1/unrecover'
    },
    {
      title: '已恢复',
      index: 1,
      path: '/tabs/tab1/recover'
    },
    {
      title: '已确认',
      index: 2,
      path: '/tabs/tab1/confirm'
    },
  ];
  public flag1 = false;
  public flag2 = false;
  public flag3= false;
  changIndex (item) {
   
    this.currentIndex = item.index
    this.router.navigate([item.path], {})
   
  }
  tabsChange(e) {
   
    
    let tab = e.tab;
    if(tab==='unrecover') {
      this.flag1 = true;
      this.flag2 = false;
      this.flag3 = false;
    }else if(tab==='recover') {
      this.flag1 = false;
      this.flag2 = true;
      this.flag3 = false;
    }else{
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = true;
    }
  }
  
  openMenu() {
    //手动打开侧边栏
    document.querySelector('ion-menu-controller').open();
  }
  openFirst() {
    console.log('click')
  
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
