import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class DataService {

    data: any[];

    private selectedModule = new Subject<any[]>(); 
    selectedModule$ = this.selectedModule.asObservable();

    private modules = new Subject<any[]>(); 
    modules$ = this.modules.asObservable();

    constructor(private storage:Storage) {
        this.refresh();
    }

    public refresh(){
        //this.data = this._modules;
        //this.save();

        this.storage.get('modules').then((result) => {
            if (result) {
                this.data = result; 
                this.modules.next(result);
            } else {
                this.data = this._modules;
                this.save();
            }
        });
    }

    private setModule(modules){
        this.storage.get('selectedModuleId').then((id) => {
            if(id) {
                this.selectedModule.next(modules[0]);
            }else{
                this.selectedModule.next(modules[id-1]);
            }
        })
    }

    public save () {
        this.storage.set("modules", this.data);
        this.modules.next(this.data);
    }

    public reset (module) {
        for(let pod of module.data){
            pod.status = 0;
        }
        this.save();
    }

    private data1: any = [
        {
            id: 1,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 2,
            avatar: "2.jpg",
            video: "2.mp4",
            name: "Big Or Little",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 3,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 4,
            avatar: "2.jpg",
            video: "2.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 5,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },

        {
            id: 6,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 7,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 8,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 9,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 10,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 11,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 12,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 13,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 14,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 15,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 16,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 17,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 18,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 19,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 20,
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        }
    ];

    private data2: any = [
        {
            id: 1,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 2,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 3,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 4,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 5,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },

        {
            id: 6,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 7,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 8,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 9,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 10,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 11,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 12,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 13,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 14,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 15,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 16,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 17,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 18,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 19,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "This is a description of the pod",
            status: 0
        },
        {
            id: 20,
            avatar: "cf.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "This is a description of the pod",
            status: 0
        }
    ];

    private _modules: any[] = [
        {
            id: 1,
            avatar: 'cf.jpg',
            name: 'Preschool Module 1',
            description: '',
            status: 1,
            data: this.data1
        },
        {
            id: 2,
            avatar: 'cf.jpg',
            name: 'Preschool Module 2',
            description: '',
            status: 0,
            data: this.data2
        }
    ]
}