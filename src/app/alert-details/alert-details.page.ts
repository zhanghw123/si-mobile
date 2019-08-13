import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../a-services/http-api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.page.html',
  styleUrls: ['./alert-details.page.scss'],
})
export class AlertDetailsPage implements OnInit {

  constructor(
    private httpApi: HttpApiService,
    private router: Router,
    public activeRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }
  public id = '';
  public host = ''
  public details:any = {};
  public resource:any = {};
  public flag = true;
  public defresource:any = {
    location: '',
    system: '',
    realName: '',
    userEmail: '',
    userPhone: ''
  };
  ngOnInit() {
    let host = localStorage.getItem('si-host')
    this.host = host;
    this.activeRoute.queryParams.subscribe((params:any) => {
      
      this.getAlertResource(host,params.id)
      this.getResource(host,params.instanceId)
    });
    
  }
  getAlertResource(host,id) {
    let data = {
      id: id
    }
    this.httpApi.post(`/portal/mobile/warning/getWarningDetailById.do`,data,{})
    .then(res=>{
      console.log(res)
      if(res.isConfirm==="未确认") {
        this.flag = true
      }else {
        this.flag = false
      }
      this.details = res;
      
    })
    
  } 
  getResource(host,id){
    let data = {
      id: id
    }
    this.httpApi.post(`/portal/mobile/resource/getResourceMaintenanceById.do`,data,{})
    .then(res=>{
      console.log(res)
      if(res) {
        this.resource = res 
      }else{
        this.resource = this.defresource
      }
      
    })
  }
  async presentAlert(str) {
    const alert = await this.alertController.create({
      message: str,
      buttons: ['确定']
    });

    await alert.present();
  }
  alertCancel() {
    let data = {
      ids: this.details.id,
      isConfirm: '未确认'
    }
    this.httpApi.post(`/portal/mobile/warning/confirmWarning.do`,data,{})
    .then(res=>{
      console.log(res)
      if(res){
        this.presentAlert('当前告警已取消')
      }
    })
  }
  alertConfirm() {
    let data = {
      ids: this.details.id,
      isConfirm: '已确认'
    }
    this.httpApi.post(`/portal/mobile/warning/confirmWarning.do`,data,{})
    .then(res=>{
      console.log(res)
      if(res){
        this.presentAlert('当前告警已确认')
      }
    })
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
      a: o.Y + " - " + this.addZero(o.M) + ' - ' + this.addZero(o.d),
      b: this.addZero(o.h) + ':' + this.addZero(o.m) + ':' + this.addZero(o.s)
    }
    
  }
   addZero(n) {
    let s = n * 1;
    return s < 10 ? '0' + s: s;
  }
}
