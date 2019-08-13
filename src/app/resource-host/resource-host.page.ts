import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../a-services/http-api.service';

@Component({
  selector: 'app-resource-host',
  templateUrl: './resource-host.page.html',
  styleUrls: ['./resource-host.page.scss'],
})
export class ResourceHostPage implements OnInit {

  constructor(
    private el: ElementRef,
    private httpApi: HttpApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  public searchVal = ''
  public searchEmpty = false
  public id = null
  public host = ''
  public resourceList = [];
  public allResourceList = [];
  public currentPage = 1;
  public bigPage = 0;
  public infiniteScrolldom = null
  ngOnInit() {
    this.host = localStorage.getItem('si-host')
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.id = params.id
      this.getResourceList(params.id)
    });

    this.infiniteScrolldom = this.el.nativeElement.querySelector('#infinite-scroll') 
  }

  getResourceList(id) {
    let data = {
      menuType: 'resource',
      menuId: id,
      isMonitored: true,
      status: '',
      txtInput: '',
      domain: '',
      curPage: 1,
      pageSize: 10,
      orderName: '资源名称',
      orderType: 'up'
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceByMenuId.do`, data, {})
      .then(res => {
        console.log(res)
        res.object.resList.forEach(item => {
          item.cpuUse = parseInt(item.cpuUse)
          item.momoryUse = parseInt(item.momoryUse)
        });
        this.resourceList = res.object.resList
        this.allResourceList = res.object.resList
        this.bigPage = res.totalPage
        console.log(this.resourceList)
      })
  }
  getSearchResource(id,searchVal) {
    let data = {
      menuType: 'resource',
      menuId: id,
      isMonitored: true,
      status: '',
      txtInput: searchVal,
      domain: '',
      curPage: 1,
      pageSize: 10,
      orderName: '资源名称',
      orderType: 'up'
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceByMenuId.do`, data, {})
      
  }
  getStatusLevel(event) {
    let value = event.detail.value;
    console.log(value)
    if(value === "levelNormal") {
      this.resourceList = this.allResourceList.filter(item =>{
        if(item.status=== "normalStatus") {
          return item
        }
      })
    }else if(value === "levelWarn") {
      this.resourceList = this.allResourceList.filter(item =>{
        if(item.status=== "warnStatus") {
          return item
        }
      })
    }else if(value === "levelBad") {
      this.resourceList = this.allResourceList.filter(item =>{
        if(item.status=== "badStatus") {
          return item
        }
      })
    }else if(value === "levelDead") {
      this.resourceList = this.allResourceList.filter(item =>{
        if(item.status=== "deadStatus") {
          return item
        }
      })
    }else{
      this.resourceList = this.allResourceList
    }
  }
 
  

  onFocus() {
    this.searchEmpty = true;
  }
  onBlur() {
    setTimeout(() => {
      this.searchEmpty = false;
    })

  }
  searchClean(e) {


    this.searchVal = ''
    this.searchEmpty = false;
    this.getResourceList(this.id)
  }
  searchClick() {

   
    this.getSearchResource(this.id,this.searchVal).then(res =>{
      console.log(res)
      res.object.resList.forEach(item => {
        item.cpuUse = parseInt(item.cpuUse)
        item.momoryUse = parseInt(item.momoryUse)
      });
      this.resourceList = res.object.resList
      this.allResourceList = res.object.resList
      this.bigPage = res.totalPage
    })
  }
  goDetails(item) {
    this.router.navigate(['/resource-details/overview'], {
      queryParams: {
        id: item.id
      }
    })
  }
  getNextData(id,curPage,search) {
    let data = {
      menuType: 'resource',
      menuId: id,
      isMonitored: true,
      status: '',
      txtInput: search,
      domain: '',
      curPage: curPage,
      pageSize: 10,
      orderName: '资源名称',
      orderType: 'up'
    }
    return this.httpApi.post(`/portal/mobile/resource/getResourceByMenuId.do`, data, {})
  }
  /**
   * 
   * 下拉加载
   */
  loadData (event) {
    if(this.currentPage>=this.bigPage) {
      this.infiniteScrolldom.complete()
      return
    }
    this.currentPage += 1;
    this.getNextData(this.id,this.currentPage,this.searchVal)
    .then(res=> {
     
      setTimeout(() => {
        this.resourceList = [...this.resourceList,...res.object.resList]
        this.allResourceList = [...this.resourceList,...res.object.resList]
        this.infiniteScrolldom.complete()
      }, 800);
    })
   
  }
}
