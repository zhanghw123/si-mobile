import { Component, OnInit, Input,ViewEncapsulation,ContentChild } from '@angular/core';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TabsNavComponent implements OnInit {
  
  constructor() { }
  @Input() test:any;
  
  public currentIndex = 0;
  
  public navArr = [
    {
      title: '未恢复',
      name: 'tabs1',
      index: 0
    },
    {
      title: '已恢复',
      name: 'tabs2',
      index: 1
    },
    {
      title: '已确认',
      name: 'tabs3',
      index: 2
    },
  ];
  changIndex (item) {
   
    this.currentIndex = item.index
    console.log(this.currentIndex)
  }

  ngOnInit() {
    //console.log( this.test )
  }

}
