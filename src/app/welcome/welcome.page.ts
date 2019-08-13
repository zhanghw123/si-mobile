import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor( 
    public router: Router,
    public toastController: ToastController
  ) {
  }
  public host = '';
  public port = '';
  ngOnInit() {
    console.log(  localStorage.getItem('si-host')  )
    /**
     * 判断本地是否有 ip 端口号
     */
    if(localStorage.getItem('si-host')) {
      let arr = localStorage.getItem('si-host').slice(7).split(':')
      this.host = arr[0];
      this.port = arr[1];
    }

  }
  
  async toastStr(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1000
    });
    toast.present();
  }
  confirm() {
    const hostreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const portreg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    let checkHost = !hostreg.test(this.host);
    let checkPort = !portreg.test(this.port);
    console.log(checkHost,checkPort)
    if(this.host===""||this.port==="") {
      this.toastStr('IP地址或者端口号不能为空')
    }else if( checkHost ) {
      this.toastStr('请输入正确格式的IP')
    }else if(checkPort){
      this.toastStr('请输入正确格式的端口号')
    }else{
      console.log('通过')
      let hostStr = `http://${this.host}:${this.port}`
      localStorage.setItem('si-host',hostStr)
      this.router.navigate(['/login'], {})
    }
    
  }
  routerChange() {
    
  }
}
