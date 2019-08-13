import { Component } from '@angular/core';
import { ToastController,AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public toastController: ToastController,
    private router: Router,
    private alertController:AlertController
  ) {}
  public username = ''
  public host = '';
  public port = '';
  public
  public alertWarn = true;
  public alertBad = true;
  public alertDead = true;
  public alertLevel = [
    {
      value: '警告',
      name: 'levelWarn',
      checked: false,
      check: true,
      
    },
    {
      value: '严重',
      name: 'levelBad',
      checked: false,
      check: true
    },
    {
      value: '致命',
      name: 'levelDead',
      checked: false,
      check: true
    }
  ]
  ngOnInit() {

    this.username = localStorage.getItem('si-username')
    if(localStorage.getItem('si-host')) {
      let arr = localStorage.getItem('si-host').slice(7).split(':')
      this.host = arr[0];
      this.port = arr[1];
    }
    if(localStorage.getItem('si-alertLevel')) {
      let arr = JSON.parse( localStorage.getItem('si-alertLevel') )
      this.alertLevel = arr;
    }

  }
  alertLevelChange() {
    
  }
  save() {
    console.log(this.alertLevel)
    localStorage.setItem('si-alertLevel',JSON.stringify(this.alertLevel))
    const hostreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const portreg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    let checkHost = !hostreg.test(this.host);
    let checkPort = !portreg.test(this.port);
    
    if(this.host===""||this.port==="") {
      this.toastStr('IP地址或者端口号不能为空')
    }else if( checkHost ) {
      this.toastStr('请输入正确格式的IP')
    }else if(checkPort){
      this.toastStr('请输入正确格式的端口号')
    }else{
      this.toastStr('保存成功')
      let hostStr = `http://${this.host}:${this.port}`
      localStorage.setItem('si-host',hostStr)
      
    }
  }
  async toastStr(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1000
    });
    toast.present();
  }

  changeUser() {
    this.router.navigate(['/login'], {
      queryParams: {
        from: 'config'
      }
    })
  }
  closeApp() {
    this.presentAlertConfirm()
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '您要退出APP吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '退出',
          handler: () => {
            // localStorage.removeItem('si-host')
            // localStorage.removeItem('si-username')
            // localStorage.removeItem('si-password')
            // localStorage.removeItem('si-token')
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
