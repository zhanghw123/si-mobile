import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { HttpApiService } from '../a-services/http-api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent implements OnInit {

  constructor(private el:ElementRef,
              private http: HttpClient,
              private httpApi: HttpApiService,
              private datePipe: DatePipe,
              ) { }
  public host = '';
  public warningType = 'unrecovered';
  public unrecoveredlist = [];
  public allUnrecoveredlist = [];
  public currentPage = 1;
  public bigPage = 0;

  public filterBoxFlag = true
  public infiniteScrolldom = null
  public refreshdom = null;
  public selectdom = null;

  /**
   * 侧边栏筛选
   */
    public filterIP = '';
    public filterAlertCentent = '';
    public domainSelect = '';
    public levelSelect = '';
    public levelText = '全部';
    public alertObjSelect = '';
    public alertTimeSelect = '';
    public domainList = [];
    public domainArr = [];
    // public domainList = [
    //   { value: '全部',  checked: true, name: '' },
    //   { value: '默认域', checked: false, name: 'default' }
    // ]
    public levelList = [
      { value: '全部',checked: true, name: '' },
      { value: '警告',checked: false, name: 'levelWarn' },
      { value: '严重',checked: false, name: 'levelBad' },
      { value: '致命',checked: false, name: 'levelDead' }

    ]
    public alertObject = [
      { value: '全部',checked: true, name: '' },
      { value: '主机',checked: false, name: 'Host' },
      { value: '网络设备',checked: false, name: 'Network' },
      { value: '存储设备',checked: false, name: 'Storage' },
      { value: '硬件设备',checked: false, name: 'Hardware' } ,
      { value: '虚拟化',checked: false, name: 'Virtualization' } ,
      { value: '应用',checked: false, name: 'Application' }     
    ]
    public alertTime = [
      { value: '全部',checked: true, name: '' },
      { value: '1小时',checked: false, name: '1H' },
      { value: '1天',checked: false, name: '1D' },
      { value: '7天',checked: false, name: '7D' },
      { value: '15天',checked: false, name: '15D' },
      { value: '30天',checked: false, name: '30D' } ,
        
    ]
  
  /**
   * 侧边栏筛选
   */
  ngOnInit() {
    let host = localStorage.getItem('si-host')
    this.host = host;
    this.getDomains(host)
    this.getData(host,this.warningType,"","","","","","",this.currentPage).then(res=>{
      this.unrecoveredlist = res.list;
      this.allUnrecoveredlist = res.list
      this.bigPage = res.pages;
    })
    this.infiniteScrolldom = this.el.nativeElement.querySelector('#infinite-scroll') 
    this.refreshdom = this.el.nativeElement.querySelector('#refresher')
    this.selectdom = this.el.nativeElement.querySelector('#ionselect');
    
    
  }
  logScrolling(e) {
    // console.log(e)
  }
  test() {
    this.getData(this.host,this.warningType,"","","","","","",1).then(res=>{
      
      
        this.unrecoveredlist = res.list;
        this.allUnrecoveredlist = res.list
        this.currentPage = 1
        this.bigPage = res.pages;
        
    })
  }
  ionPull(e) {
    //console.log('1111',e)
  }
  ionStart(e) {
    //console.log('2222',e)
  }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  getData(host,warningType,domainId,warningLevle,resourceType,ip,content,time,pageNum) {
    
    let data = {
      warningType: warningType,
      domainId: domainId,
      warningLevle: warningLevle,
      resourceType: resourceType,
      resourceName: '',
      ip: ip,
      content: content,
      time: time,
      pageNum: pageNum,
      pageSize: '10',
    }
    return this.httpApi.post(`${host}/portal/mobile/warning/getWarningList.do`,data,{})
    
  }
  getNextData(host,warningType,domainId,warningLevle,resourceType,ip,content,time,pageNum) {
    let data = {
      warningType: warningType,
      domainId: domainId,
      warningLevle: warningLevle,
      resourceType: resourceType,
      resourceName: '',
      ip: ip,
      content: content,
      time: time,
      pageNum: pageNum,
      pageSize: '10',
    };
    return this.httpApi.post(`${host}/portal/mobile/warning/getWarningList.do`,data,{})
  }
  getDomains(host) {
    this.httpApi.get(`${host}/portal/mobile/login/getDomains.do`,{})
    .then(res=>{
      this.domainList = res.map((item,index)=>{
        return {
          value: item.domainName,
          checked: false,
          name: item.domainId
        }
      })
      this.domainList.unshift({value: '全部',  checked: true, name: ''})
      this.domainArr = this.domainList 
    })
  }
  filterChange () {
    
    if(this.filterBoxFlag) {
      this.filterBoxFlag = false
    }else {
      this.filterBoxFlag = true
    }
    console.log (this.filterBoxFlag)
  }
  filterTrue(e) {
    //console.dir(e.target)
    if(e.target.id==="filter-wrap") {
      this.filterBoxFlag = true;
    }else{
      return
    }
   
  }
  changeSelect(text,value) {

    if(value==""){
      this.selectdom.value = 'all'
    }else{
      this.selectdom.value = value
    }
    this.selectdom.selectedText = text
    
  }
  getAlertLevel(event) {
    let value = event.detail.value;
    
    if(value === "levelWarn") {
      this.selectdom.selectedText = '警告'
      this.filterAlertLevel(1)
    }else if(value === "levelBad") {
      this.selectdom.selectedText = '严重'
      this.filterAlertLevel(2)
    }else if(value === "levelDead") {
      this.selectdom.selectedText = '致命'
      this.filterAlertLevel(3)
    }else{
      this.selectdom.selectedText = '全部'
      this.filterAlertLevel(4)
    }
    
  }
  /**
   * 筛选 告警列表 1 为 警告 ， 2 为 严重 ， 3 为 致命。
   */
  filterAlertLevel(level) {
    
    if(level===1) {
      
      // this.unrecoveredlist = []
      this.unrecoveredlist = this.allUnrecoveredlist.filter(item =>{
        if(item.warningLevel=== "levelWarn") {
          
          return item
        }
        
      })
    }else if(level===2) {
      this.unrecoveredlist = this.allUnrecoveredlist.filter(item =>{
        if(item.warningLevel=== "levelBad") {
          
          return item
        }
        
      })
    }else if(level ===3) {
      this.unrecoveredlist = this.allUnrecoveredlist.filter(item =>{
        if(item.warningLevel=== "levelDead") {
          
          return item
        }
      })
    }else{
      
      this.unrecoveredlist =  this.allUnrecoveredlist
    }
  }
  
  format (date) {
    let d =  new Date(date)
    var o = {   
      "Y": d.getFullYear(),
      "M" : d.getMonth()+1,                 //月份
      "d" : d.getDate(),                    //日
      "h" : d.getHours(),                   //小时
      "m" : d.getMinutes(),                 //分
      "s" : d.getSeconds(),                 //秒
      "q" : Math.floor((d.getMonth()+3)/3), //季度
      "S"  : d.getMilliseconds()             //毫秒
    };  
    
  
    return {
      a: o.Y + "-" + this.addZero(o.M) + '-' + this.addZero(o.d),
      b: this.addZero(o.h) + ':' + this.addZero(o.m) + ':' + this.addZero(o.s)
    }
    
  }
   addZero(n) {
    let s = n * 1;
    return s < 10 ? '0' + s: s;
  }


  /**
   * 侧边栏点击筛选
   */

  domainClick(m,i) {
    this.domainSelect = m.name
    this.domainList.forEach((item,index)=>{
      if(i==index) {
        this.domainSelect = m.name
        item.checked = true
      }else{
        item.checked = false
      }
    })
  }
  levelClick(m,i) {
    this.levelText = m.value
    this.levelSelect = m.name
    this.levelList.forEach((item,index)=>{
      
      if(i==index) {
        
        item.checked = true
      }else{
        item.checked = false
      }
    })
  }
  alertobjClick(m,i) {
    this.alertObjSelect = m.name
    this.alertObject.forEach((item,index)=>{
      if(i==index) {
        
        item.checked = true
      }else{
        item.checked = false
      }
    })
  }
  alertTimeClick(m,i) {
    this.alertTimeSelect = m.name
    this.alertTime.forEach((item,index)=>{
      if(i==index) {
        
        item.checked = true
      }else{
        item.checked = false
      }
    })
  }
  filterResetClick() {


    this.domainSelect = '';
    this.levelSelect = '';
    this.levelText = '全部';
    this.alertObjSelect = '';
    this.alertTimeSelect = '';
    this.filterIP = ''
    this.filterAlertCentent = ''
    
    this.domainList.forEach(item=>{
      if(item.name==""){
        item.checked = true;
      }else{
        item.checked = false;
      }
    })
    
    this.levelList = [
      { value: '全部',checked: true, name: '' },
      { value: '警告',checked: false, name: 'levelWarn' },
      { value: '严重',checked: false, name: 'levelBad' },
      { value: '致命',checked: false, name: 'levelDead' }

    ]
    this.alertObject = [
      { value: '全部',checked: true, name: '' },
      { value: '主机',checked: false, name: 'Host' },
      { value: '网络设备',checked: false, name: 'Network' },
      { value: '存储设备',checked: false, name: 'Storage' },
      { value: '硬件设备',checked: false, name: 'Hardware' } ,
      { value: '虚拟化',checked: false, name: 'Virtualization' } ,
      { value: '应用',checked: false, name: 'Application' }     
    ]
    this.alertTime = [
      
      { value: '全部',checked: true, name: '' },
      { value: '1小时',checked: false, name: '1H' },
      { value: '1天',checked: false, name: '1D' },
      { value: '7天',checked: false, name: '7D' },
      { value: '15天',checked: false, name: '15D' },
      { value: '30天',checked: false, name: '30D' } ,
        
    ]
  }
  filterConfirmClick() {
    let obj = {
      domainId: this.domainSelect,
      warningLevle: this.levelSelect,
      resourceType: this.alertObjSelect,
      ip: this.filterIP,
      content: this.filterAlertCentent,
      time: this.alertTimeSelect

    }
    this.getData(this.host,this.warningType,
                  this.domainSelect,
                  this.levelSelect,
                  this.alertObjSelect,
                  this.filterIP,
                  this.filterAlertCentent,
                  this.alertTimeSelect,1)
                  .then(res=>{
                    this.unrecoveredlist = res.list;
                    this.allUnrecoveredlist = res.list
                    this.currentPage = 1
                    this.bigPage = res.pages;
                    this.changeSelect(this.levelText,this.levelSelect);
                    this.filterBoxFlag = true;
                  })
   
  }
  /**
   * 侧边栏点击筛选
   */

  /**
   * 
   * 上拉刷新
   */
  doRefresh(event) {
    
    this.getData(this.host,this.warningType,"","","","","","",1).then(res=>{
      
      setTimeout(() => {
        this.unrecoveredlist = res.list;
        this.allUnrecoveredlist = res.list
        this.currentPage = 1
        this.bigPage = res.pages;
        event.detail.complete();
      }, 900);
    })
    
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
    this.getNextData(this.host,this.warningType,
          this.domainSelect,
          this.levelSelect,
          this.alertObjSelect,
          this.filterIP,
          this.filterAlertCentent,
          this.alertTimeSelect,this.currentPage)
          .then(res=>{ 
            setTimeout(() => {
              this.unrecoveredlist = [...this.allUnrecoveredlist,...res.list]
              this.allUnrecoveredlist = [...this.allUnrecoveredlist,...res.list]
              this.infiniteScrolldom.complete()
            }, 900);
          })
    
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
