import { Component, ViewChild, Inject } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http }       from '@angular/http';
import {DataService} from '../../services/data.service';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import * as moment from 'moment';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  private selected: any = moment();
	private scheduleDate: any = moment().toISOString();
  selectedDate: any = moment();
  displayDate:string;
  displayFormat:string = "DD MMMM";
  pods: any[];
  days:Array<{number: number, selected: boolean}> = [];
  @ViewChild('scroller') scroller:Content;
  @ViewChild('content') content:Content;

  initialised:boolean = false;

  //items:FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data:DataService,
              @Inject(DOCUMENT) private document: Document
              ) {
        // this.items = this.data.items();
        this.pods = [];
        // for (let i = 1; i < 30; i++) {
        //   this.pods.push({
        //     title: 'test'
        //   });
        // }
  }

  ionViewWillEnter(){
    if(!this.initialised){
      this.scheduleDate = moment().toISOString();
      this.displayDate = moment().format(this.displayFormat)
      this.setDaysInMonth(this.selected);
      this.initialised = true;
    }
  }

  setDaysInMonth(date){
    let dayCount = date.daysInMonth();
    console.log(dayCount);
    let selectedDay = date.date();
    this.days = [];
    for(let i=1; i<=dayCount; i++){
      var day = {
        number: i,
        selected: false
      };

      if(selectedDay == i){
        day.selected = true;
      }

      this.days.push(day);
    }
    this.scrollToDay(selectedDay, dayCount);
  }

  changeDay(day){
    this.selectedDate = this.selectedDate.date(day.number);
    this.displayDate = this.selectedDate.format(this.displayFormat);
    this.setDaysInMonth(this.selectedDate);
  }

  scrollToDay(selectedDay, dayCount){
    var element = this.content.getElementRef();
    var elementWidth = element.nativeElement.clientWidth;
    var width = (selectedDay-1) * 50;
    width = width - (elementWidth/2 - 25);
    this.scroller.scrollTo(width, 0, 300);
  }

  podClick(pod: any){
    console.log("pod clicked");
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
