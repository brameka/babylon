import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
template: `
    <div style="width: 100%; padding: 25px 15px 15px 15px; text-align: center;">
        <div class="img" style="width: 100%; min-height: 130px;">
            <img src="assets/images/onboard1.png" alt="">
        </div>
        <h2 style="color: #6a7277; font-size: 2rem; margin: 10px 0 5px 0">Welcome Average Mum</h2>
        <p style="text-align: center; color: #a0a5a9; line-height: 20px; margin: 5px 0 10px 0">Welcome message, Official welcome to the module. Stick at it, you'll get blah blah blah</p>
        <button ion-button (click)="close()" color="primary" style="width: 100%; box-shadow: none; margin: none">Let's get started</button>
    </div>
`
})
export class WelcomePopover {
  module: any;
  product: any;
  constructor(public viewCtrl: ViewController) {
      this.module = viewCtrl.data.module;
      this.product = viewCtrl.data.product;
  }

  close() {
    this.viewCtrl.dismiss({
          success: false
      });
  }
}