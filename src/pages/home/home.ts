import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { PodPage } from '../pod/pod';
import { Popover } from '../popover/popover';
import { DataService } from '../../services/data.service';
import 'rxjs/Rx';

import { PopoverController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  modules:any[] = [];
  module:any = {};
  pods:any[] = [];

  subscription: any;

  constructor(public nav: NavController, 
              public navParams: NavParams,
              public service: DataService,
              public actionSheet: ActionSheetController,
              public alertController: AlertController,
              private toastController: ToastController,
              private popover: PopoverController) {

    //service.refresh();

    this.subscription = service.modules$.subscribe(x => {
      this.modules = x;
      this.module = this.modules[0];
      this.pods = this.module.data;
    });

  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

  ionViewWillUnload(){
    this.subscription.unsubscribe();
  }

  details (pod) {
    var payload = {
      pod: pod,
      modules: this.modules
    };
    this.nav.push(PodPage, payload);
  }

  presentPopover() {
    let popover = this.popover.create(Popover);
    popover.present();
  }

  options() {
    let actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Reset',
          icon: 'md-refresh',
          handler: () => {
            this.showConfirm()
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'md-close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm() {
    let confirm = this.alertController.create({
      title: 'Are you sure?',
      message: 'This will reset the whole module',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.service.reset(this.module);
            this.showToast("Module Reset")
          }
        }
      ]
    });
    confirm.present();
  }

  showToast(message) {

    let toast = this.toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom'
    });

    toast.onDidDismiss(() => {
        console.log('Dismissed toast');
    });

    toast.present();
  }

}
