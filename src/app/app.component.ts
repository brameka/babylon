import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Onboard } from '../pages/onboard/onboard';
import { HomePage } from '../pages/home/home';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../pages/details/details';

@Component({
  templateUrl: 'app.html',
  providers: [DataService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  modules: any[] = [];
  onboarded: boolean = false;
  rootPage: any;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              private dataService: DataService,
              private storage: Storage,
              private modal: ModalController) {
    
    this.initializeApp();

    this.storage.get('onboard').then((result) => {
 
        if(result){
          this.rootPage = HomePage;
        } else {
          this.rootPage = Onboard;
          this.storage.set('onboard', true);
        }

    });
    this.dataService.modules$.subscribe(x => {
      this.modules = x;
    });
    this.dataService.onboarded$.subscribe(x => {
      this.onboarded = x;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if (this.statusBar) {
          //this.statusBar.overlaysWebView(true);
          //this.statusBar.styleLightContent();
          //this.statusBar.backgroundColorByHexString('#14c1f3');
      }

      //this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#14c1f3');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  openModal() {
    let modal = this.modal.create(DetailsPage);
    modal.present();
  }
}
