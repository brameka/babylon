import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PodPage } from '../pages/pod/pod';
import { ModulePage } from '../pages/module/module';
import { Popover } from '../pages/popover/popover';
import { Thumbsover } from '../pages/popover/thumbsover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';

import { MdGridListModule, MdButtonModule, MdToolbarModule } from '@angular/material';

import { IonicStorageModule } from '@ionic/storage';

import { DataService } from '../services/data.service';

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';

//import * as firebase from "firebase";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PodPage,
    ModulePage,
    Popover,
    Thumbsover
  ],
  imports: [
    BrowserModule,
    MdGridListModule,
    MdButtonModule,
    MdToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(MyApp, {
        mode: 'md'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PodPage,
    ModulePage,
    Popover,
    Thumbsover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
