import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ActionSheetController, ToastController} from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Thumbsover } from '../popover/thumbsover';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-pod',
  templateUrl: 'pod.html',
})

export class PodPage {
  @ViewChild('videoPlayer') videoplayer: any;
  videoState: boolean = true;
  volumeState: boolean = false;
  pod: any;
  module: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data:DataService,
              public actionSheet: ActionSheetController,
              public toastController: ToastController,
              public popover: PopoverController
              ) {
        this.pod = this.navParams.get('pod');
        this.module = this.navParams.get('module');
  }

  podClick(pod: any){
    console.log("pod clicked");
  }

  presentPopover() {
    let popover = this.popover.create(Thumbsover, {
      module: this.module
    });
    popover.present();
  }

  play(){
      if(this.videoState){
          this.videoplayer.nativeElement.pause();
      }else{
          this.videoplayer.nativeElement.play();
      }
      this.videoState = !this.videoState;
  }

  volume(){
      this.videoplayer.nativeElement.muted = this.volumeState;
      this.volumeState = !this.volumeState;
  }

  complete(){
    this.pod.status = 1;
    this.data.save();
    this.showToast("Activity completed");
    this.goback();
  }

  reset(){
    this.pod.status = 0;
    this.showToast("Activity Reset");
    this.goback();
  }

  options() {
    let actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Reset',
          icon: 'md-refresh',
          handler: () => {
            this.reset();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'md-close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  goback() {
    this.navCtrl.pop({}, () => {
      console.log("hello");
      this.presentPopover();
    })
  }

  showToast(message) {
    let toast = this.toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
}
