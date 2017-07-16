import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Http }       from '@angular/http';

import {DataService} from '../../services/data.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  items:FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data:DataService
              ) {
        this.items = this.data.items();
  }

  // search(term: string): Observable<Hero[]> {
  //   return this.http
  //              .get(`api/heroes/?name=${term}`)
  //              .map(response => response.json().data as Hero[]);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
