import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';
import { SaveSubresourceService } from '../a-services/save-subresource.service';
@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.page.html',
  styleUrls: ['./resource-details.page.scss'],
})
export class ResourceDetailsPage implements OnInit {

  constructor(
    public router: Router,
    private httpApi: HttpApiService,
    private activeRoute: ActivatedRoute,
    private saveSubres: SaveSubresourceService
  ) { }
  public id = null
  public status:any;
  public name:any;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.id = params.id
      this.getDetails(params.id)
    });
    
  }
  public currentIndex = 0;
 
  public tabsArr = []
  changIndex (item) {
    this.saveSubres.setInstanceIds(item.value)
    this.currentIndex = item.index
    this.router.navigate([item.path], {
      queryParams: {
        id: this.id,
        resId: item.id
      }
    })
  }
  getDetails(id) {
    let data = {
      instanceId: id
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceDetailById.do`, data, {})
      .then(res => {
        console.log('getDetails',res)
        this.status = res.status
        this.name = res.name
        
        let arr =  res.keys
        let defArr = [
          {
            title: '概述页',
            name: '概述页',
            path: '/resource-details/overview',
            value: '',
            id:'',
            index: 0
          },
        ];
        let arrs = defArr.concat(arr)
        let arr1 = [];
        arrs.forEach((item,index)=>{
          if(item.name=='概述页') {
            arr1.push({
              title: '概述页',
              path: '/resource-details/overview',
              id: '',
              value: '',
              index: index
            })
          }else{
            arr1.push({
              title: item.name,
              path: '/resource-details/subresource',
              id:item.id,
              value: item.value,
              index: index
            })
          }
        })
        console.log(arr1)
        arr1.push({
          title: '配置信息',
          path: '/resource-details/resource-config',
          id: '',
          value: '',
          index: arr1.length
        })
        arr1.push({
          title: '维护信息',
          path: '/resource-details/resource-maintenance',
          id: '',
          value: '',
          index: arr1.length
        })
        this.tabsArr = arr1
        // res.keys.forEach(item => {
        //   if(item.name=="网络接口"){
        //     this.tabsArr[1].value = item.value
        //     this.tabsArr[1].id = item.id
        //   }else if(item.name=="CPU") {
        //     this.tabsArr[2].value = item.value
        //     this.tabsArr[2].id = item.id
        //   }else if(item.name=="硬盘") {
        //     this.tabsArr[3].value = item.value
        //     this.tabsArr[3].id = item.id
        //   }
        // });
      })
  }
  
}
