import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SSPedi } from '../pages/sspedi/sspedi';
import { CallPage } from '../pages/call/call';
import { TabsPage } from '../pages/tabs/tabs';
import { GoalPage } from '../pages/goal/goal';
import { ProvidersPage } from '../pages/providers/proviers';
import { Setting } from '../pages/setting/setting';
import { SspediRating } from '../pages/sspedirating/sspedirating';
import { BloodResult } from '../pages/bloodresult/bloodresult';


import { Custom_Overlay } from '../pages/modal/custom_overlay';
import { Custom_Overlay_Add_Goal } from '../pages/modal/custom_overlay_add_goal';
import { Custom_Overlay_Prov_Det } from '../pages/modal/custom_overlay_prov_det';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker/ngx';




@NgModule({
  declarations: [
    MyApp,
    SSPedi,
    CallPage,
    GoalPage,
    ProvidersPage,
    Setting,
    SspediRating,
    BloodResult,

    TabsPage,
    Custom_Overlay,
    Custom_Overlay_Add_Goal,
    Custom_Overlay_Prov_Det
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SSPedi,
    CallPage,
    GoalPage,
    ProvidersPage,
    Setting,
    SspediRating,
    BloodResult,
        
    TabsPage,
    Custom_Overlay,
    Custom_Overlay_Add_Goal,
    Custom_Overlay_Prov_Det
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    HTTP,
    DatePicker,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
