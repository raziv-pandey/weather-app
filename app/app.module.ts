import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceIdInterceptor } from '../shared/utility/device-id.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as authStore from '../auth/store';
import * as sharedStore from '../shared/store';
import * as fasStore from '../fas/store';


import { MyApp } from './app.component';

//models
import * as sharedModel from '../shared/facades';
import * as authModel from '../auth/facades';
import * as fasModel from '../fas/facades';

//services
import * as sharedServices from '../shared/services';
import * as authServices from '../auth/services';
import * as fasServices from '../fas/services';

import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FCM } from '@ionic-native/fcm';
import { Base64 } from '@ionic-native/base64';
import { Sim } from '@ionic-native/sim';
import { Device } from '@ionic-native/device';
import { NotificationWebSocketService } from '../shared/services/notification-socket.service';
import { PopupModel } from '../shared/facades/popup';
import { FileUploadModel } from '../shared/facades/file-upload-options';

import { IonicSelectableModule } from 'ionic-selectable';

import { ApplicationConstants } from './ApplicationConstants';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Network } from '@ionic-native/network';
//import { DocumentViewer } from '@ionic-native/document-viewer';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FileOpener } from '@ionic-native/file-opener';
import { Geolocation } from '@ionic-native/geolocation';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(sharedStore.reducers),
    EffectsModule.forRoot(sharedStore.sharedEffects),
    StoreModule.forFeature('fas',fasStore.reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, actionSanitizer: action => JSON.parse(stringify(action)) }),
    HttpClientModule,
    SharedPipesModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    IonicSelectableModule,
    AmChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    BarcodeScanner,
    Network,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DeviceIdInterceptor,
      multi: true
    },
    AndroidPermissions,
    Camera,
    FileTransfer,
    File,
    Base64,
    Sim,
    PopupModel,
    FileUploadModel,
    FCM,
    NotificationWebSocketService,
    Geolocation,
    Device,
    SQLite,
    FileOpener,
     ...sharedModel.models,
    ...sharedServices.services,


    ...authServices.services,
    ...authModel.models

  ]
})
export class AppModule { }

//-----------Start StoreDevtoolsModule related code need to remove on production
export function stringify(obj: any, replacer?, spaces?, cycleReplacer?): string {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
}

function serializer(replacer, cycleReplacer) {
  const stack = [];
  const keys = [];

  if (cycleReplacer == null) {
    cycleReplacer = (key, value) => {
      if (stack[0] === value) {
        return '[Circular ~]';
      }
      return `[Circular ~.${keys.slice(0, stack.indexOf(value)).join(".")}]`
    }
  }

  return function (key, value) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value)
    }

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

Map.prototype['toJSON'] = function () {
  var obj = {};
  this.forEach((value, key) => obj[key] = value);
  return obj;
}

//-----------End StoreDevtoolsModule related code need to remove on production