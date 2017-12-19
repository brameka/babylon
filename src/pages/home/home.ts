import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
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
  product:any;

  subscription: any;
  assessment: any;

  constructor(public nav: NavController, 
              public navParams: NavParams,
              public service: DataService,
              public actionSheet: ActionSheetController,
              public alertController: AlertController,
              private toastController: ToastController,
              private popover: PopoverController,
              private modal: ModalController) {
    this.subscription = service.modules$.subscribe(x => {
      this.modules = x;
      this.module = this.modules[0];
      this.pods = this.module.data;
    });

    service.refresh();

    this.assessment = service.assess$.subscribe(pod => {
      const badge = service.getBadge(this.module);
      if(badge) {
        // this.presentPopover(badge);
      }
    });

  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

  ionViewDidEnter() {

  }

  ionViewWillUnload(){
    this.subscription.unsubscribe();
  }

  details (pod) {
    var payload = {
      pod: pod,
      module: this.module,
      product: this.product
    };
    this.nav.push(PodPage, payload);
  }

  presentPopover(badge: any) {
    let popover = this.popover.create(Popover, {
      badge: badge
    });
    popover.present();
    popover.onDidDismiss((data) => {
    });
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
      message: 'This will reset and you have to start again',
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
            this.showToast("Alright let's start again")
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

  openModal() {
    let modal = this.modal.create(DetailsPage);
    modal.present();
  }

  access() {

  }

}
