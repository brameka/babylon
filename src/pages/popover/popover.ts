import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
template: `
    <div style="width: 100%; padding: 0; text-align: center;">
        <div class="img" style="width: 100%; min-height: 130px;">
            <img src="assets/badge/{{badge.gif}}" alt="">
        </div>
        <h2 style="color: #6a7277; font-size: 2rem; margin: 10px 0 5px 0">{{badge.level}}</h2>
        <p style="text-align: center; color: #a0a5a9; line-height: 20px; margin: 5px 0 10px 0">{{badge.message}}</p>
        <button ion-button (click)="close()" color="primary" style="width: 100%; box-shadow: none; margin: none">OK</button>
    </div>
`
})
export class Popover {
  badge: any;
  constructor(public viewCtrl: ViewController) {
      this.badge = viewCtrl.data.badge;
  }

  close() {
    this.viewCtrl.dismiss({
          success: false
      });
  }
}