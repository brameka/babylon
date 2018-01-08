import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { PodPage } from '../pod/pod';
import { Popover } from '../popover/popover';
import { DataService } from '../../services/data.service';
import 'rxjs/Rx';

import { PopoverController } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  modules:any[] = [];
  module:any = {};
  pods:any[] = [];
  product:any;
  completed: number;
  subscription: any;
  assessment: any;

  constructor(public nav: NavController, 
              public navParams: NavParams,
              public service: DataService,
              public actionSheet: ActionSheetController,
              public alertController: AlertController,
              private toastController: ToastController,
              private popover: PopoverController,
              private modal: ModalController,
              private nativeAudio: NativeAudio) {
    this.subscription = service.modules$.subscribe(x => {
      this.modules = x;
      this.module = this.modules[0];
      this.pods = this.module.data;
      this.completed = this.service.completed(this.module);
    });

    service.refresh();

    this.assessment = service.assess$.subscribe(pod => {
      const badge = service.getBadge(this.module);
      this.presentPopover(badge);
      // if(badge) {
      //   this.presentPopover(badge);
      // }
    });

    this.nativeAudio.preloadSimple('levelup', 'assets/audio/levelup.mp3').then(function(){
      console.log('audio loaded');
    }, function(err) {
      console.log('audio error: ', err);
    })
    
  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

  ionViewDidEnter() {
    this.completed = this.service.completed(this.module);
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
    const self = this;
    let popover = this.popover.create(Popover, {
      badge: badge
    });
    popover.present().then(function() {
      self.nativeAudio.play('levelup');
    });
    
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
