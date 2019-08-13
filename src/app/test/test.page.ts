import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor( public router: Router,public activeRoute: ActivatedRoute) {
  }
  

  public currentIndex = 0;
  public navArr = [
    {
      title: 'tabs1',
      index: 0
    },
    {
      title: 'tabs2',
      index: 1
    },
    {
      title: 'tabs3',
      index: 2
    },
  ];

  changIndex (item) {
   
    this.currentIndex = item.index
    console.log(this.currentIndex)
  }
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      console.log(params)
    });
  }
  routerChange() {
    this.router.navigate([''], {
      queryParams: {
        name: '张瀚文'
      }

    })
  }
}
