import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class DataService {
    isMuted:boolean;

    data: any[];
    badgeData: any[];
    products: any[];

    scheduleData: any[];

    private onboarded = new Subject<boolean>(); 
    onboarded$ = this.onboarded.asObservable();
    
    private selectedModule = new Subject<any[]>(); 
    selectedModule$ = this.selectedModule.asObservable();

    private modules = new Subject<any[]>(); 
    modules$ = this.modules.asObservable();

    private schedules = new Subject<any[]>(); 
    schedules$ = this.schedules.asObservable();

    private assess = new Subject<any>(); 
    assess$ = this.assess.asObservable();

    constructor(private storage:Storage) {
        this.isMuted = true;
        this.refresh();
        //this.loadProducts();
    }

    public refresh(){
        // this.data = this._modules;
        // this.badgeData = this.badges;
        // this.save();

        this.storage.get('badges').then((result) => {
            if (result) {
                this.badgeData = result; 
            } else {
                this.badgeData = this.badges;
            }
        });

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

    public assessment(pod: any) {
        this.assess.next(pod);
    }

    public save () {
        this.storage.set("modules", this.data);
        this.storage.set("badges", this.badgeData);
        this.modules.next(this.data);
    }

    public reset (module) {
        for(let pod of module.data){
            pod.status = 0;
        }

        for(let badge of this.badgeData){
            badge.status = 0;
        }

        this.save();
    }

    public completed(module: any): number {
        let count = 0;
        for(let pod of module.data){
            if(pod.status) {
                count++;
            }
        }
        return count;
    }

    public getBadge(module): any {
        const count = this.completed(module);
        for(let badge of this.badgeData){
            if(badge.count == count && badge.status == 0) {
                badge.status = 1;
                return badge;
            }
        }
    }

    // get down dancing
    // funny mom
    private badges = [
        {
            count: 3,
            status: 0,
            level: 'Rookie',
            gif: '1.gif',
            message: 'Nice, you just leveled up'
        },
        {
            count: 6,
            status: 0,
            level: 'Amature',
            gif: '2.gif',
            message: 'Nice, you just leveled up'
        }
    ]

    private data1: any = [
        {
            id: 1,
            gif: '1.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: `<h3>Thing we gonna nail:</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                          <ul>
                            <li>Sensory Skills</li>
                            <li>Hand Eye Coordination</li>
                            <li>Non-annoying</li>
                            <li>Easy</li>
                          </ul>
                          <h3>Materials:</h3>
                          <ul>
                            <li>Sensory Skills</li>
                            <li>Hand Eye Coordination</li>
                            <li>Non-annoying</li>
                            <li>Easy</li>
                          </ul>
                          
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                          `,
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 2,
            gif: '2.gif',
            avatar: "2.jpg",
            video: "2.mp4",
            name: "Big Or Little",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 3,
            gif: '3.gif',
            avatar: "3.jpg",
            video: "3.mp4",
            name: "Colours",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 4,
            gif: '4.gif',
            avatar: "4.jpg",
            video: "4.mp4",
            name: "Does It Float",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 5,
            gif: '5.gif',
            avatar: "5.jpg",
            video: "5.mp4",
            name: "Stacking Numbers",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 6,
            gif: '6.gif',
            avatar: "6.jpg",
            video: "6.mp4",
            name: "Read & Draw",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 7,
            gif: '7.gif',
            avatar: "7.jpg",
            video: "7.mp4",
            name: "Trace The Shape",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 8,
            gif: '8.gif',
            avatar: "8.jpg",
            video: "8.mp4",
            name: "Stomp The Shape",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 9,
            gif: '9.gif',
            avatar: "9.jpg",
            video: "9.mp4",
            name: "Follow The Path",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 10,
            gif: '1.gif',
            avatar: "10.jpg",
            video: "10.mp4",
            name: "Video Placeholder",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 11,
            gif: '11.gif',
            avatar: "11.jpg",
            video: "11.mp4",
            name: "Same & Different",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 12,
            gif: '20.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 13,
            gif: '13.gif',
            avatar: "13.jpg",
            video: "13.mp4",
            name: "Name Puzzle",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 14,
            gif: '14.gif',
            avatar: "14.jpg",
            video: "14.mp4",
            name: "Colour Pegs",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 15,
            gif: '15.gif',
            avatar: "15.jpg",
            video: "15.mp4",
            name: "Number Pegs",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 16,
            gif: '16.gif',
            avatar: "16.jpg",
            video: "16.mp4",
            name: "Sorting Big & Little",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 17,
            gif: '17.gif',
            avatar: "17.jpg",
            video: "17.mp4",
            name: "Pom Pom Numbers",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 18,
            gif: '18.gif',
            avatar: "18.jpg",
            video: "18.mp4",
            name: "Memory",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 19,
            gif: '19.gif',
            avatar: "19.jpg",
            video: "19.mp4",
            name: "Roll The Number",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 20,
            gif: '20.gif',
            avatar: "20.jpg",
            video: "20.mp4",
            name: "Find Your Name",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 21,
            gif: '21.gif',
            avatar: "21.jpg",
            video: "21.mp4",
            name: "On & Off",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 22,
            gif: '22.gif',
            avatar: "22.jpg",
            video: "22.mp4",
            name: "Balloon (Up & Down)",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 23,
            gif: '23.gif',
            avatar: "23.jpg",
            video: "23.mp4",
            name: "Over & Under",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 24,
            gif: '24.gif',
            avatar: "24.jpg",
            video: "24.mp4",
            name: "On Top & Under",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 25,
            gif: '1.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 26,
            gif: '2.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 27,
            gif: '3.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 28,
            gif: '4.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 29,
            gif: '5.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        },
        {
            id: 30,
            gif: '6.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Does it float?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'This is a test',
                    image: 'image',
                    url: 'url'
                }
            }
        }
    ];

   

    private _modules: any[] = [
        {
            id: 1,
            avatar: 'cf.jpg',
            name: 'Average Mum',
            description: '',
            status: 1,
            data: this.data1
        }
    ]
}