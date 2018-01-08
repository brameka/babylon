import { Platform } from 'ionic-angular';
import {Injectable} from '@angular/core';

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class NetworkService {

    constructor(private platform: Platform) {}

    checkNetwork() {
        this.platform.ready().then(() => {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
            // let alert = Alert.create({
            //     title: "Connection Status",
            //     subTitle: states[networkState],
            //     buttons: ["OK"]
            // });
            // this.navCtrl.present(alert);
        });
    }

}