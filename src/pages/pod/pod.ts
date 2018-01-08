import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ActionSheetController, ToastController} from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Thumbsover } from '../popover/thumbsover';

@Component({
  selector: 'page-pod',
  templateUrl: 'pod.html',
})

export class PodPage {
  @ViewChild('videoPlayer') videoplayer: any;
  @ViewChild('player') player: any;
  videoState: boolean = true;
  isMuted:boolean;
  pod: any;
  module: any;
  product: any;

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

  ionViewWillEnter(){
    this.videoplayer.nativeElement.muted = this.data.isMuted;
    this.isMuted = this.data.isMuted;
  }

  ionViewDidLoad(){}

  podClick(pod: any){
    console.log("pod clicked");
  }

  presentPopover() {
    this.videoplayer.nativeElement.pause();
    let self = this;
    let popover = this.popover.create(Thumbsover, {
      pod: self.pod
    });
    popover.onWillDismiss(function(data, role) {
      if(data && data.refresh) {
        self.pod.status = 1;
        self.data.save();
        self.showToast("Activity completed");
        self.data.assessment(self.pod);
        self.goback();
      } else {
        self.videoplayer.nativeElement.play();
      }
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
    this.data.isMuted = !this.data.isMuted;
    this.videoplayer.nativeElement.muted = this.data.isMuted;
    this.isMuted = this.data.isMuted;
  }

  complete(){
    this.presentPopover();
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
