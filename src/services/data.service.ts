import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class DataService {

    private pods = new Subject<any[]>(); 
    pods$ = this.pods.asObservable();

    private modules = new Subject<any[]>(); 
    modules$ = this.modules.asObservable();

    constructor(private storage:Storage) {
        // this.save(this._data);
        // this.saveModules(this._modules);
        
        storage.get('modules').then((result) => {
            if (result) {
                console.log("modules from storage");
                this.modules.next(result);
            } else {
                console.log("modules from file");
                this.saveModules(this._modules);
            }
        });

        storage.get('pods').then((result) => {
            if (result) {
                this.pods.next(result);
            } else {
                this.save(this._data);
            }
        });
    }

    public save (data) {
        console.log("saving data");
        console.log(data);
        this.storage.set('pods', data);
        this.pods.next(data);
    }

    public saveModules (data) {
        this.storage.set('modules', data);
        this.modules.next(data);
    }

    public reset () {
        console.log("resetting");
        this.save(this._data);
    }

    private _modules: any[] = [
        {
            id: 1,
            avatar: 'cf.jpg',
            name: 'Preschool Module 1',
            description: '',
            status: 0
        },
        {
            id: 2,
            avatar: 'cf.jpg',
            name: 'Preschool Module 2',
            description: '',
            status: 0
        },
        {
            id: 3,
            avatar: 'cf.jpg',
            name: 'Preschool Module 3',
            description: '',
            status: 0
        },
        {
            id: 4,
            avatar: 'cf.jpg',
            name: 'Preschool Module 4',
            description: '',
            status: 0
        }
    ]

    private _data: any = [
        {
            id: 1,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 2,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0

        },
        {
            id: 3,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 4,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 5,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },

        {
            id: 6,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 7,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 8,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 9,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 10,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 11,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 12,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 0
        },
        {
            id: 13,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 14,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 15,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 16,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 17,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 18,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 19,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
        {
            id: 20,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0,
            subscription: 1
        },
    ];
}