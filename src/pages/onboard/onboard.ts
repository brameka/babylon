import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { PodPage } from '../pod/pod';
import { Popover } from '../popover/popover';
import { DataService } from '../../services/data.service';
import { HomePage } from '../home/home';
import 'rxjs/Rx';

import { PopoverController } from 'ionic-angular';



@Component({
  selector: 'onboarding',
  templateUrl: 'onboard.html'
})

export class Onboard {

  constructor(public navCtrl: NavController) {
 
  }
 
  start(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

}
