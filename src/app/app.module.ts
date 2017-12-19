import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PodPage } from '../pages/pod/pod';
import { DetailsPage } from '../pages/details/details';
import { ModulePage } from '../pages/module/module';
import { Onboard } from '../pages/onboard/onboard';
import { Popover } from '../pages/popover/popover';
import { Thumbsover } from '../pages/popover/thumbsover';
import { WelcomePopover } from '../pages/popover/welcome.popover';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MdGridListModule, MdButtonModule, MdToolbarModule } from '@angular/material';
import { IonicStorageModule } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PodPage,
    ModulePage,
    Onboard,
    Popover,
    Thumbsover,
    WelcomePopover,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    MdGridListModule,
    MdButtonModule,
    MdToolbarModule,
    IonicModule.forRoot(MyApp, {
        mode: 'md'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Onboard,
    HomePage,
    PodPage,
    ModulePage,
    Popover,
    Thumbsover,
    WelcomePopover,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
