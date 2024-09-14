import { Component } from '@angular/core';
import { Platform, App, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FCM } from '@ionic-native/fcm';
import { Sim } from '@ionic-native/sim';
import { AppSettingsModel } from '../shared/facades/app-settings';
import { UserModel } from '../auth/facades/user';
import { PopupModel } from '../shared/facades/popup';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:string = 'LoginPage';
     constructor(private platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen, 
       private androidPermissions: AndroidPermissions, private sim:Sim,
        private _appSettingModel: AppSettingsModel, private _userModel: UserModel, private _popupModel:PopupModel,
        public app: App, private fcm: FCM, private _device : Device,  public network: Network, public toast: ToastController
        ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.initialAppSetup();  
            
            this.network.onConnect().subscribe((res) => {
              let nav = this.app.getActiveNavs()[0];
              let activeView = nav.getActive();
              if(activeView.name === 'GenerateJobIdPage' || activeView.name === 'CheckStockPage') {
                  this.toast.create({
                      message: "You are Online.",
                      duration: 1000
                  }).present();
              }
          });

          this.network.onDisconnect().subscribe(() => {
              let nav = this.app.getActiveNavs()[0];
              let activeView = nav.getActive();
              if(activeView.name === 'GenerateJobIdPage' || activeView.name === 'CheckStockPage') {
                  this.toast.create({
                      message: "You are Offline.",
                      duration: 1000
                  }).present();
              }
          });
        });		
    }
    // 354872102194846 Anup kumr from JSC Production 
    //353295061394101 Samsung Office Mobile
    // 866463034361140 Redmi office Mobile IMEI
    //07C789AD-BF3F-4508-81B3-E2BF71E660EF
    private initialAppSetup(){
        let deviceId = '866463034361140';
        let isMobileDevice: boolean = !document.URL.startsWith('http');
        //detect the ios or android
        //get the gcmkey & imei number and other stuff
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && isMobileDevice) {
            
            if(isMobileDevice && this.platform.is('android')){
                console.log("android");
                if(parseInt(this._device.version) >= 10){
                  this._appSettingModel.setDeviceId(this._device.uuid);
               }
               else{
                 this.sim.hasReadPermission().then(
                   (info) => console.log('Has permission: ', info)
                 );
                 
                 this.sim.requestReadPermission().then(
                   () =>{
                     console.log('Permission granted');
                       this.sim.getSimInfo().then(
                           (info) => {
                               console.log('Sim info: ', info);
                               console.log('Sim info: ', info.deviceId);
                               if(info.cards==undefined){
                                   this._appSettingModel.setDeviceId(info.deviceId); 
                               }else if(info.cards){
                                   this._appSettingModel.setDeviceId(info.cards[0].deviceId); 
                               }
                           },
                           (err) => {console.log('Unable to get sim info: ', err)}
                          );
                   } ,
                   () => console.log('Permission denied')
                 );

               }
                  

            }
            else if(isMobileDevice && this.platform.is('ios')){
                console.log("ios");
                
            }

            //----- Get token and save it to backend--------------
            this.fcm.getToken().then(token => {
                console.log("gcmToken:",token);
                this._appSettingModel.setGcmKeyToken(token);
              });
              //----- End of Get token and save it to backend--------------

        }
        if(! isMobileDevice)
            this._appSettingModel.setDeviceId(deviceId);    
    }

  

}

