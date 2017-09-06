import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController, PopoverController } from 'ionic-angular';
import { PodPage } from '../pod/pod';
import { Popover } from '../popover/popover';
import { DataService } from '../../services/data.service';
import 'rxjs/Rx';

@Component({
  selector: 'page-module',
  templateUrl: 'module.html'
})

export class ModulePage {

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

    this.module = navParams.data.module;
    this.pods = this.module.data;

    if(this.module.status == 0){
      this.presentPopover();
    }

  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

  ionViewWillUnload(){
  }

  details (pod) {
    if(this.module.status == 0){
      this.presentPopover();
    }else{
      var payload = {
        pod: pod,
        module: this.module
      };
      this.nav.push(PodPage, payload);
    }
  }

  presentPopover() {
    let popover = this.popover.create(Popover, {
      module: this.module
    })
    popover.present();
  }

  presentThumbsPopover() {
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
