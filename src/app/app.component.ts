import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ModulePage } from '../pages/module/module';

import {DataService} from '../services/data.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
// $ ionic cordova plugin add cordova-plugin-inapppurchase
// $ npm install --save @ionic-native/in-app-purchase

@Component({
  templateUrl: 'app.html',
  providers: [DataService, AngularFireDatabase]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  modules: any[] = [];
  rootPage: any = HomePage;
  modulePage: any = ModulePage;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              private dataService: DataService,
              private iap: InAppPurchase) {
    
    this.initializeApp();

    dataService.modules$.subscribe(x => {
      this.modules = x;
    });

    // dataService.selectedModule$.subscribe(x => {
    //   //this.module = x;
    // });

  }

  loadProducts(){
    this.iap.getProducts(['com.yourapp.prod1', 'com.yourapp.prod2', ...])
              .then(function (products) {
                console.log(products);
                /*
                  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', currency: '...', price: '...', priceAsDecimal: '...' }, ...]
                */
              })
              .catch(function (err) {
                console.log(err);
              });
  }

  buyProduct(){
    this.iap
        .buy('prod1')
        .then((data)=> {
          console.log(data);
          // {
          //   transactionId: ...
          //   receipt: ...
          //   signature: ...
          // }
        })
        .catch((err)=> {
          console.log(err);
        });
  }

  restorePurchases(){
    this.iap
        .restorePurchases()
        .then((data)=> {
          console.log(data);
        })
        .catch((err)=> {
          console.log(err);
        });
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
