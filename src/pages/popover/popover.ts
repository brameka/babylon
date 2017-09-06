import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
template: `
    <div style="width: 100%; padding: 25px 15px 15px 15px; text-align: center;">
        <div class="img" style="width: 100%; min-height: 130px;">
            <img src="assets/images/onboard1.png" alt="">
        </div>
        <h2 style="color: #6a7277; font-size: 2rem; margin: 10px 0 5px 0">{{module.name}}</h2>
        <p style="text-align: center; color: #a0a5a9; line-height: 20px; margin: 5px 0 10px 0">This is a general description of the module. In this module you'll learn blah blah blah</p>
        <button ion-button (click)="close()" color="secondary" style="width: 100%; box-shadow: none; margin: none">Unlock Now $1.99</button>
    </div>
`
})
export class Popover {
  module: any;
  constructor(public viewCtrl: ViewController) {
      this.module = viewCtrl.data.module;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}