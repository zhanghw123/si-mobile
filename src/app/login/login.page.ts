import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpApiService } from '../a-services/http-api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( public router: Router,
              private http: HttpClient,
              private httpApi: HttpApiService,
              private cookieService: CookieService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,

  ) {
  }

  public host = ''

  public username = '';
  public password = '';
  public keyStr = '';
  public default_key = '238Yewye7we7ne9x';
  public IV_SIZE = 16;
  public IV = '1234567812345678';
  public randomStr = '0123456789abcdefghijklmnopqrstuvwxyz';
  public token = ''

  ngOnInit() {
    
    this.host = localStorage.getItem('si-host')
    if(localStorage.getItem('si-username')) {
      this.username = localStorage.getItem('si-username');
      this.password = localStorage.getItem('si-password')  
    }
     
  }
  async alert(str) {
    const alert = await this.alertController.create({
      
      message: str,
      
    });

    await alert.present();
  }
  async toastStr(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1000
    });
    toast.present();
  }
  login() {
   
    if(this.username===''||this.password==='') {
      this.toastStr('账号密码不能为空')
    }else {
      let data = this.createFormData({
        name: this.username,
        pwd: this.password
      })
    
      this.toLogin(data)
    }
    

  }
   presentLoading() {
    return this.loadingController.create({
      message: '登陆成功',
      duration: 600
    })
    // .then(loading=>{
    //   loading.present();
    // })
     
  }
  toLogin(params) {
    
    this.http.post(`${this.host}/portal/mobile/login/login.do`,params,{
      
    }).toPromise().then((res:any)=>{
      console.log('toLogin',res)
     
      let code = res.code * 1
      if(code===0) {
        
        this.toastStr('登陆成功')
        localStorage.setItem('si-token',res.token)
        localStorage.setItem('si-username',this.username)
        localStorage.setItem('si-password',this.password)
        this.token = res.token
        this.router.navigate(['/tabs/tab1/unrecover'], {
          queryParams: {}
        })
        
      }else{
        this.toastStr('账号密码错误')
      }
      
      
    }).catch(err=>{
      this.toastStr('暂时无法登陆请联系管理员')
      console.log(err)
    })


   
     
  }
  getList(){
    let data = this.createFormData({
      warningType: 'unrecovered',
      domainId: '',
      warningLevle: '',
      resourceType: 'Switch',
      resourceName: '',
      ip: '',
      content: '',
      time: '',
      pageNum: '1',
      pageSize: '10',
      authorization:this.token
    })

   
 
   this.httpApi.checkToken().then(res=>{
     console.log('获取true',res)
   })
 
   
  }
  testAlertList() {
    let data = this.createFormData({
      warningType: 'unrecovered',
      domainId: '',
      warningLevle: '',
      resourceType: 'Switch',
      resourceName: '',
      ip: '',
      content: '',
      time: '',
      pageNum: '1',
      pageSize: '10',
    })
    return this.httpApi.post(`${this.host}/portal/mobile/warning/getWarningList.do`,data,{})
  }
  test() {
    let data = this.createFormData({
      domain: '',
      warningLevel: '',
      resourceType: '',
      objectType: '',
      isIpOrResourceName: '',
      ipOrResourceName: '',
      timeType: '',
      startTime: '',
      endTime: '',
      pageNum: '1',
      pageSize: '10',
      confirm: 'no', 
      warningSource: '',
      content: ''
    })
    //let options = new RequestOptions({ "withCredentials": true });
    this.http.post(`/portal/warning/getDatasNew.do`,data,{
      withCredentials: true
    }).subscribe((res:any)=>{
      console.log(res)
    })
  }
  routerChange() {
    this.router.navigate(['/welcome'], {
      queryParams: {
        name: '张瀚文'
      }
    })
  }
  createParams(obj) {
    const params = new HttpParams()
    params.set('user',"123");
    params.set('pass',"666");
    for (let key in obj) {	
      //params.set(key,obj[key])		
      console.log('1',key);		/*属性名*/	
      console.log('2',obj[key]);	/*属性值*/
    };
    return params
  }
  createFormData(obj) {
    const formdata = new FormData()
    
    for (let key in obj) {	
      formdata.set(key,obj[key])		
      
    };
    return formdata
  }
  /**
   * AES加密
   */
  getAESKey() {
    return this.getRandomString(this.IV_SIZE)
  }
  getRandomString(size) {
    let str = '';
    let len = this.randomStr.length;

    for(let i = 0; i < size; i++) {
      str += this.randomStr.charAt( this.getRandom(len-1) )
    }
    return str
  }
  getRandom(count) {
    return Math.round( Math.random() * count )
  }
}
