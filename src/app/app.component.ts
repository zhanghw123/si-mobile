import { Component,HostListener } from '@angular/core';

import { Platform,ModalController, ActionSheetController, NavController ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private keyValue:any = false
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private nav: NavController,
    private keyboard: Keyboard,
    private backgroundMode: BackgroundMode,
    private router: Router,
    private alertController:AlertController,
  ) {
    
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboardEvent();
      //this.backBtnListener();
      
    });
  }

  keyboardEvent() {
   
    window.addEventListener('native.keyboardshow',(e)=>{
      this.keyValue = true
      
    })
    window.addEventListener('native.keyboardhide',(e)=>{
      
     // this.keyValue = false
      //this.alert('监听键盘关闭22'+this.keyValue)
    })
    // this.keyboard.onKeyboardShow().subscribe(()=>{
    //   this.alert('监听键盘打开')
    // })
    // this.keyboard.onKeyboardHide().subscribe(()=>{
    //   this.alert('监听键盘关闭')
    // })
    // this.keyboard.onKeyboardWillHide().subscribe( () =>{
    //   this.alert('键盘关闭')
    //   setTimeout(()=>{
        
    //     this.keyValue = false
    //   },500)
    // })

    // this.keyboard.onKeyboardWillShow().subscribe( () => {
    //   this.alert('键盘打开')
    //   this.keyValue = true
    // })
  }
  backBtnListener() {
    this.platform.backButton.subscribe((e)=>{
      this.alert(this.keyValue)
      if(this.keyValue) {
        
        this.keyboard.hide()
        this.keyValue = false
        return
      }
    })
  }
  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event:any) {
    $event.detail.register(100,async () => {
      
      try {
        if(this.keyValue) {
          
          this.keyValue = false;
          this.keyboard.hide()
          return
        }
      } catch(error) { console.log(error) }

      try {
        const element = await this.actionSheetCtrl.getTop();
        if(element){
          element.dismiss();
          return
        }
      } catch(error) { console.log(error) }

      try {
        const element = await this.modalCtrl.getTop();
        if(element){
          element.dismiss();
          return
        }
      } catch (error) {}
     
      if(this.router.url==='/login'&&this.keyValue){
        this.keyboard.hide()
        this.keyValue = false
     
        return
      }
      if(
        this.router.url==='/tabs/tab1/unrecover'||
        this.router.url==='/tabs/tab1/recover'||
        this.router.url==='/tabs/tab1/confirm'||
        this.router.url==='/tabs/tab2'||
        this.router.url==='/tabs/tab3'
      ) {
        this.backgroundMode.moveToBackground()
        this.presentAlertConfirm()
      }else{
        this.nav.back();
      }
    })
  }

  async alert(str) {
    const alert = await this.alertController.create({
      
      message: str,
      
    });

    await alert.present();
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
