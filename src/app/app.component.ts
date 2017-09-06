import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ModulePage } from '../pages/module/module';

import {DataService} from '../services/data.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html',
  providers: [DataService, AngularFireDatabase]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  modules: any[] = [];
  rootPage: any = HomePage;
  modulePage: any = ModulePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              private dataService: DataService) {
    
    this.initializeApp();

    dataService.modules$.subscribe(x => {
      this.modules = x;
    });

    // dataService.selectedModule$.subscribe(x => {
    //   //this.module = x;
    // });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  details(module){
    this.nav.setRoot(this.modulePage, {
      module: module
    });
  }
}
