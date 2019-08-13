import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';
@Component({
  selector: 'app-resource-overview',
  templateUrl: './resource-overview.page.html',
  styleUrls: ['./resource-overview.page.scss'],
})
export class ResourceOverviewPage implements OnInit {

  constructor(
    private httpApi: HttpApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  public echartsIntance = null;
 
  public isShow = true;
  public id = null
  public list:any;
  
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.id = params.id
      this.getItem(this.id)
    })
  }


  itemClick(item,index) {
    if(item.isShow) {
      item.isShow = false
    }else{
      item.isShow = true
    }
    this.list.forEach((ele,i)=>{
      if(index!=i) {
        ele.isShow =false;
      }
    })
    
    
  }
  getItem(id) {
    let data = {
      instanceId: id
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceDetailMetricById.do`, data, {})
      .then(res => {
       
        let data = res
        
        
        Promise.all(
          res.map(item => {
            return this.getChartData(this.id,item.targetId,item.targetName,'1H')
          })
        ).then((rs:object)=>{
          
          data.forEach((item,index)=> {
            
            if(rs[index]!=null) {
              
              item.isShow = false
              item.data = JSON.parse(rs[index].data)[0].data
              item.xAxisData =  JSON.parse(rs[index].xAxisData)
            }else{
              item.isShow = false
              item.data = [0]
              item.xAxisData =  ['0']
            }
            
          });
          data[0].isShow = true
          console.log(data)
          this.list = data

        })
      })
  }
  getDetails(id) {
    let data = {
      instanceId: id
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceDetailById.do`, data, {})
     
  }
  getChartData(id,metricId,metricName,time) {
    let data = {
      instanceIds: id,
      metricId:metricId,
      metricName: metricName,
      time:time
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceDetailMetricChart.do`, data, {})
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  public eStyle = {
    width: '100%',
    height: '26vh'
  }
  public chartOption = {
    color: ['#04fcff'],
    grid: {
      left: '3%',
      right: '5%',
      bottom: '5%',
      top:'10%',
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
      data: ["15:05","15:10","15:15","15:20","15:25","15:30","15:35"]
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
      data: [2, 3, 5, 7, 8, 4, 3],
      type: 'line'
    }]
  }
}
