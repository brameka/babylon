import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
