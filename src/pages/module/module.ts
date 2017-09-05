import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { PodPage } from '../pod/pod';
import { DataService } from '../../services/data.service';
import 'rxjs/Rx';


@Component({
  selector: 'page-module',
  templateUrl: 'module.html'
})

export class ModulePage {

    public module: any;

    constructor(public nav: NavController, 
                public service: DataService,
                public actionSheet: ActionSheetController,
                public alertController: AlertController,
                private toastController: ToastController) {
                    console.log("module page constructor");
                    console.log(this.module);
    }



  

  options() {
    let actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Reset',
          icon: 'md-refresh',
          handler: () => {
            this.showConfirm()
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

  showConfirm() {
    let confirm = this.alertController.create({
      title: 'Are you sure?',
      message: 'This will reset the whole module',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.service.reset();
            this.showToast("Module Reset")
          }
        }
      ]
    });
    confirm.present();
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
