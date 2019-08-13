import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  constructor() { }
  @Input() data: any;
  @Input() style: object;
  @Input() xAxisData: any;
  public echartsIntance = null
  ngOnInit() {
    
    // setTimeout(() => {
    //   this.setChartOption(this.data, this.xAxisData)
    // },1000);
  }
  ngOnChanges(){
    //this.setChartOption(this.data, this.xAxisData)
   // console.log(this.echartsIntance)
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
    this.setChartOption(ec,this.data, this.xAxisData)
  }
  setChartOption(ec,data, xAxisData) {
    
    let option = {
      color: ['#04fcff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: 'transparent',
          },
        },
        formatter: (e) =>{
          return e[0].name + '：' + e[0].value
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',//type: 'datetime',
        axisLine: {
          lineStyle: {
            color: '#ccc',

          }
        },
        axisLabel: {
          color: "#666"
        },
        axisTick: {
          inside: true,
          length: 3,
          lineStyle: {
            color: '#ccc',
          }
        },
        data: xAxisData// ["15:05","15:10","15:15","15:20","15:25","15:30","15:35"]
      },
      yAxis: {
        type: 'value',
        scale:true,
        axisLine: {
          lineStyle: {
            color: '#ccc',

          }
        },
        axisLabel: {
          color: "#666"
        },
        axisTick: {
          inside: true,
          length: 3,
          lineStyle: {
            color: '#ccc',
          }
        },
      },

      series: [{
        animation: false,
        symbol: "none",
        data: data,
        type: 'line'
      }]
    }
    this.chartOption = option
  }
  public chartOption = {
    color: ['#04fcff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: 'transparent',
          },
        },
        formatter: (e) =>{
          return e[0].name + '：' + e[0].value
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',//type: 'datetime',
        axisLine: {
          lineStyle: {
            color: '#ccc',

          }
        },
        axisLabel: {
          color: "#666"
        },
        axisTick: {
          inside: true,
          length: 3,
          lineStyle: {
            color: '#ccc',
          }
        },
        data:  ["15:05","15:10","15:15","15:20","15:25","15:30","15:35"]
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#ccc',

          }
        },
        axisLabel: {
          color: "#666"
        },
        axisTick: {
          inside: true,
          length: 3,
          lineStyle: {
            color: '#ccc',
          }
        },
      },

      series: [{
        animation: false,
        symbol: "none",
        data: [2, 2, 2, 2, 2, 2, 2],
        type: 'line'
      }]
  }
}
