import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
template: `
    <div style="width: 100%; padding: 25px 15px 15px 15px; text-align: center;">
        <div class="img" style="width: 100%; min-height: 130px;">
            <img style="border-radius: 50%; width: 50%" src="assets/images/thumb.png" alt="">
        </div>
        <h2 style="color: #6a7277; font-size: 2rem; margin: 10px 0 5px 0">Well Done!</h2>
        <button ion-button (click)="close()" color="primary" style="width: 100%; box-shadow: none; margin: none">Ok</button>
    </div>
`
})
export class Thumbsover {
  module: any;
  constructor(public viewCtrl: ViewController) {
      this.module = viewCtrl.data.module;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}