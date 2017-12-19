import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DataService } from '../../services/data.service';

@Component({
template: `
    <div style="width: 100%; padding: 25px 15px 15px 15px; text-align: center;">
        <div class="img" style="width: 100%; min-height: 220px; padding: 0">
            <img src="assets/images/{{pod.completion.image}}" alt="">
        </div>
        <button ion-button icon-left (click)="share()" color="primary" style="width: 100%; box-shadow: none; margin: none">
            <ion-icon name="logo-facebook"></ion-icon> SHARE
        </button>
        <button ion-button (click)="complete()" color="primary" style="width: 100%; box-shadow: none; margin: none">Complete</button>
        <button ion-button (click)="close()" color="light" style="width: 100%; box-shadow: none; margin: none">Cancel</button>
    </div>
`
})
export class Thumbsover {

  pod: any;

  constructor(public viewCtrl: ViewController, private socialSharing: SocialSharing, private service: DataService) {
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