import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
template: `
    <div style="width: 100%; padding: 0; text-align: center; position: relative; min-height: 260px">
        <div class="nailed-it">
            <img src="assets/png/nailed-it.png" alt=""/>
        </div>
        <div class="img" style="width: 100%; padding: 0">
            <!-- <img src="assets/images/{{pod.completion.image}}" alt=""> -->
            <img src="assets/images/{{pod.avatar}}" alt=""/>
        </div>
        <div class="complete-btns">
            <!-- <button class="complete-btn" ion-button icon-left (click)="share()" color="primary">
                <ion-icon name="logo-facebook"></ion-icon> SHARE
            </button> -->
            <button class="complete-btn" ion-button (click)="complete()" color="primary">Complete</button>
            <button class="complete-btn" ion-button (click)="close()" color="light">Cancel</button>
        </div>
    </div>
`
})
export class Thumbsover {

  pod: any;
  image: string;

  constructor(public viewCtrl: ViewController, private socialSharing: SocialSharing) {
    this.pod = viewCtrl.data.pod;
  }

  share() {
      const share = this.pod.complete;
      this.socialSharing.shareViaFacebook(share.message).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
      this.complete();
  }

  complete() {
    this.viewCtrl.dismiss({
        refresh: true
    });
  }

  close() {
    this.viewCtrl.dismiss({
        refresh: false
    });
  }
}