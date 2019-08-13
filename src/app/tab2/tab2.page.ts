import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';

import * as _ from 'lodash';
//  import * as echarts from 'echarts';
//  import { EChartOption } from 'echarts';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private el: ElementRef,
    public router: Router,
    private httpApi: HttpApiService,
   
    // private echarts:echarts,
  ) { }
  public heightFlag = false
  public echartDom = null
  public echartsIntance = null
  public host = ''
  public resourceType = null
  public position = {
    top: 0,
    left:0
  }
  public clickChartVal = ''
  public currentIndex = 0;
  public tabsArr = [
    
  ]

  ngOnInit() {
    this.host = localStorage.getItem('si-host')
    this.getResourceType()
    this.getResourceMenu()
    
  }

  changIndex(item) {

    this.currentIndex = item.index
    this.router.navigate([item.path], {
      queryParams: {
        id:item.id
      }
    })

  }
  switchHeight() {
    if (this.heightFlag) {
      this.heightFlag = false
      this.echartsIntance.resize();
    } else {
      this.heightFlag = true

    }
    
  }
  onChartInit(ec) {
    this.echartsIntance = ec;

  }
  getResourceMenu() {
    this.httpApi.post(`/portal/mobile/resource/getResourceMenu.do`, {}, {})
    .then(res=>{
      console.log('标题',res)
      let tabArr = []
      
      res.forEach((item,index) => {
        let count = 0
        if(item.resMenuList.length>0) {
          item.resMenuList.forEach((ele) => {
            count+=ele.count
          });
          tabArr.push({
            title: `${item.name}(${count})`,
            id: item.id,
            index:index,
            path:`/tabs/tab2/resource-list`,

          })
        }else{
          tabArr.push({
            title: `${item.name}(${count})`,
            id: item.id,
            index:index,
            path:`/tabs/tab2/resource-list`,
          })
        }
        
      });
      
      tabArr.forEach((item,index)=>{
        if(item.id=="cameradev"){
          tabArr.splice(index,1)
        }
        if(item.id=="CMTS"){
          tabArr.splice(index,1)
        }
      })
      tabArr.forEach((item,index)=>{
        item.index = index
      })
      console.log(tabArr)
      this.tabsArr = tabArr
      let arr = []
      res.forEach((item,index) => {
        let count = 0
        if(index==0||index==1||index==2||index==4||index==6) {
          
        
          if(item.resMenuList.length>0){
            item.resMenuList.forEach(ele => {
              count+=ele.count
            });
            arr.push({
              title:`${item.name}(${count})`,
              id: item.id,
              path:`/tabs/tab2/${item.id}`,
              index:index
            })
          }else{
            arr.push({
              title:`${item.name}(${count})`,
              id: item.id,
              path:`/tabs/tab2/${item.id}`,
              index:index
            })
          }
        } 
      });
    
    
      arr.forEach((item,index)=>{
        item.index = index
      })
      
      //this.tabsArr = arr
    })
  }
  getResourceType() {
   this.httpApi.post(`/portal/mobile/resource/getResourcePreviewByResourceType.do`, {}, {})
   .then(res=>{
      this.resourceType = res
      this.setChartOption( res.xAxisDatas,res.datas )
   })
  }
  setChartOption(xAxisDatas, datas) {
    let data = [];
    datas.forEach(item => {
      data.push({
          name: item.name,
          type: 'bar',
          stack: '总量',
          barWidth: 25,
          data: item.data2
      })
    });
  
    let option = {
      color: ['#70c722', '#fff044', '#f19d38', '#ea3223', '#36c722', '#22c768', '#22c7b6', '#229ac7', '#0047d7', '#2a22c7'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (e) =>{
          let str = ''
          e.forEach(item => {
            str += `${item.seriesName}:${item.value} `
          });
          return `<p>${str}</p>`
        }
        
      },
    
      grid: {
        left: '3%',
        right: '5%',
        bottom: '8%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999',

          }
        },
        splitLine: {
          lineStyle: {
            color: '#ccc',
          }
        },
        axisTick: {
          inside: true,
          length: 3,
          lineStyle: {
            color: '#ccc',
          }
        },
      },
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#999999',

          }
        },
        axisTick: {
          show: false
        },
        data: xAxisDatas
      },

      series: data
      
    }
    this.echartsIntance.setOption(option)
  }


  public chartOption = {
    
  }



  initBar(options) {

  }

}
