import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// if you've gone with the local installation approach, you'd use the following:
import * as firebase from 'firebase';
import { Headers, Http } from '@angular/http';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    public db: firebase.database.Database;
    constructor(private fire:AngularFireDatabase) {
        this.db = firebase.database();
    }

    items():FirebaseListObservable<any[]>{
        return this.fire.list("/items", {
            query: {
                orderByChild: 'priority'
            }
        });
        
        //return this.fire.database.ref("/items").


        // var ref = this.db.ref("/items");
        // ref.on('child_added', function(data) {
        //     addCommentElement(postElement, data.key, data.val().text, data.val().author);
        // });

        // var commentsRef = firebase.database().ref('post-comments/' + postId);
        // commentsRef.on('child_added', function(data) {
        //     addCommentElement(postElement, data.key, data.val().text, data.val().author);
        // });

        // commentsRef.on('child_changed', function(data) {
        //     setCommentValues(postElement, data.key, data.val().text, data.val().author);
        // });

        // commentsRef.on('child_removed', function(data) {
        //     deleteComment(postElement, data.key);
        // });


        // return this.http
        //         .get(("/"))
        //         .delay(1000)
        //         .map(response => response.json().data as any);
    }
}

/*
var ref = new Firebase("https://babylon-72f99.firebaseio.com/items");
undefined
ref.set({id:1, name:"test"});
ref.push({name:"test2"}); returns a promise with a key
*/