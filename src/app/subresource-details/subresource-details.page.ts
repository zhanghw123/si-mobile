import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';
import { SaveSubresourceService } from '../a-services/save-subresource.service';

@Component({
  selector: 'app-subresource-details',
  templateUrl: './subresource-details.page.html',
  styleUrls: ['./subresource-details.page.scss'],
})
export class SubresourceDetailsPage implements OnInit {

  constructor(
    private el: ElementRef,
    public router: Router,
    private httpApi: HttpApiService,
    private activeRoute: ActivatedRoute,
    private saveSubres: SaveSubresourceService
  ) { }
  public id: any;
  public subresourceList = [];
  public currentPage = 1;
  public bigPage = 0;
  public infiniteScrolldom = null
  ngOnInit() {
    this.infiniteScrolldom = this.el.nativeElement.querySelector('#infinite-scroll') 
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.id = params.id
      console.log(params)
      // this.getDetails(params.id,params.resId)
      // this.getAllDetails(this.saveSubres.getInstanceIds())
      this.getPermiseAll(params.id, params.resId)
    });
  }

  getAllDetails(id) {
    let data = {
      instanceIds: id,
      childTxt: '',
      curPage: 1,
      pageSize: 10,
      orderMetricId: 'name',
      orderType: 'up'
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceDetailChild.do`, data, {})

  }
  getDetails(instanceId, resourceId) {
    let data = {
      instanceId: instanceId,
      resourceId: resourceId
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceDetailChildMetric.do`, data, {})

  }
  getPermiseAll(id, resId) {

    Promise.all([
      this.getDetails(id, resId),
      this.getAllDetails(this.saveSubres.getInstanceIds())
    ]).then(res => {
      console.log(res)
      let allArr = res[1].object;
      let bodys = res[1].object.bodys
      let heads = res[1].object.heads
      let selectArr = res[0]
      let arr = [];
      bodys.forEach((item,index)=>{
        let list = item.list
        for (let i = list.length-1; i >=0; i--) {
            let metricId = list[i].metricId;
            let deleteThis = false;
            for (let n = 0; n < selectArr.length; n++) {
                const el = selectArr[n];
                if(metricId==selectArr[n].metricId) {
                    deleteThis = false
                    break
                }else{
                    deleteThis = true
                }
                
            }
            if(deleteThis){
                list.splice(i, 1);
            }
        }
      })
      
      bodys.forEach((item,index) => {
        item.list.forEach((n,m)=>{
          
          for (let i = 0; i < heads.length; i++) {
            const ele = heads[i];
           
            if(n.metricId==ele.metricId) {
              n.name = ele.headName
            }
          }
        })
      });
      bodys.forEach((item,index) => {
        let list = item.list
        let Available = true
        let ableStr = ''
        for (let i = list.length-1; i >=0 ; i--) {
          const ele = list[i];
          
          //处理健康度
          if(ele.metricType=="Available") {
            let str = '&&' + ele.value
            ableStr += str
          }
          if(ele.metricType=='Available'){
            list.splice(i,1)
          }
          //处理title
          if(ele.metricId=='name') {
            item.title = ele.value
            list.splice(i,1)
          }
          
        }
        let ableArr = ableStr.split('');
        ableArr.splice(0,2)
        let able = ableArr.join('')
        item.ableStr = able
        if(able=='') {
          item.available = 'normalStatus'
        }else{
          if(eval(able)) {
            item.available = 'normalStatus'
          }else{
            item.available = 'deadStatus'
          }
        }
        
      })
      this.subresourceList = bodys
      console.log('---bodys---',bodys)
      
    })
  }
  /**
   * 
   * 下拉加载
   */
  loadData(event) {
    if (this.currentPage >= this.bigPage) {
      this.infiniteScrolldom.complete()
      return
    }
    this.currentPage += 1;
    setTimeout(() => {

      this.infiniteScrolldom.complete()
    }, 800);

  }

}
