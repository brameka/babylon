import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
template: `
    <div style="width: 100%; padding: 0; text-align: center; min-height: 425px">
        <div class="level-gif">
            <div class="leveled-up">
                <img src="assets/png/completed.png" alt=""/>
            </div>
            <div class="level">
                <img src="assets/png/averagemum.png" alt=""/>
            </div>
            <img style="width: 100%" src="{{badge.gif}}" alt="">
        </div>
        <div class="complete-btns">
            <button class="complete-btn fb-btn" ion-button icon-left (click)="share()" color="primary">
                <ion-icon name="logo-facebook"></ion-icon> FACEBOOK
            </button>
            <button class="complete-btn" ion-button (click)="close()" color="primary">OK</button>
        </div>
    </div>
`
})
export class Popover {
  badge: any;
  constructor(public viewCtrl: ViewController, private socialSharing: SocialSharing) {
      this.badge = viewCtrl.data.badge;
  }

  close() {
    this.viewCtrl.dismiss({
          success: false
      });
  }

  share() {
      this.socialSharing.shareViaFacebook('I just completed "27 Easy, Non-Annoying Things To Teach Your Kid" an app by #averagemum', 'https://ibb.co/fYVg96', 'https://www.facebook.com/Average-Mum-884819475009637').then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
      this.complete();
  }

  complete() {
    this.viewCtrl.dismiss({
        success: false,
        refresh: false
    });
  }
}