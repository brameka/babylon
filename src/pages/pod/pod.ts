import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import {DataService} from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
  pods: any[];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data:DataService,
              private storage: Storage,
              public actionSheet: ActionSheetController,
              public toastController: ToastController
              ) {
        this.pod = this.navParams.get('pod');
        this.pods = this.navParams.get('pods');
  }

  podClick(pod: any){
    console.log("pod clicked");
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
    this.data.save(this.pods);
    this.showToast("Activity completed");
    this.goback();
  }

  reset(){
    this.pod.status = 0;
    this.data.save(this.pods);
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
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goback() {
    this.navCtrl.pop();
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
