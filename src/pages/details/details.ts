import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import 'rxjs/Rx';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})

export class DetailsPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    
  }

  ionViewWillUnload(){
  }

  close(){
      this.viewCtrl.dismiss();
  }

}
