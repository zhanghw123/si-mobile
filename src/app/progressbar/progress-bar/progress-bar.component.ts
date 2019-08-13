
import { Component, Input, OnInit, OnChanges } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  constructor() { 
    this.style = {
      'width': '0%',
    }
  }
  @Input()
  total: any;//总数
  @Input()
  current: any;//使用数
  style: any;//颜色长度
  proportion: any;//比例值
  ngOnInit() {
    this.setData();
  }
  ngOnChanges() {
    //重新更新数据
    //this.setData();
  }
  setData(){
   
    this.proportion = Math.round(this.current / this.total * 100);
    if (this.proportion) {
      this.proportion += '%';
    } else {
      this.proportion = '0%';
    }
    let current = parseInt(this.current)
  
    if(current>=80&&current<90) {
      this.style.background = '#fff044'
    }else if(current>=90&&current<100){
     
      this.style.background = '#ea3223'
    }else{
     
      this.style.background = '#4cd660'
    }
    this.style.width = this.proportion;
   
  }

}
