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
        this.isMuted = false;
        this.refresh();
    }

    public refresh(){
        this.data = this._modules;
        this.badgeData = this.badges;
        this.save();

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

    private badges = [
        {
            count: 27,
            status: 0,
            height: "700px",
            level: 'Averagemum',
            png: 'rookie.png',
            gif: 'assets/badge/mum1.gif'
        }
    ]

    private data1: any = [
        {
            order: 1,
            id: 1,
            gif: '1.gif',
            avatar: "1.jpg",
            video: "1.mp4",
            name: "Follow The Line",
            tips: "Make shapes simple or difficult depending on the level of you kid",
            description: `
                          <h3>Description:</h3>
                          <p>Smear shaving cream on surface. Draw lines and have your kid trace it with their finger.</p>
                          <h3>Materials:</h3>
                          <ul>
                            <li>Shaving Cream (Flour/Rice/Sand or Whatever)</li>
                            <li>Flat surface</li>
                          </ul>
                          <h3>Skills:</h3>
                          <ul>
                            <li>Following Instructions</li>
                            <li>Hand Eye Coordination</li>
                            <li>Fine Motor Skills</li>
                          </ul>
                          `,
            status: 0,
            completion: {
                image: 'beginner.png',
                share: {
                    message: 'I just taught my kid how to follow a line #averagemum',
                    image: 'https://ibb.co/fYVg96',
                    url: 'https://www.facebook.com/Average-Mum-884819475009637/'
                }
            }
        },
        {
            id: 8,
            gif: '8.gif',
            avatar: "8.jpg",
            video: "8.mp4",
            name: "Stomp The Shape",
            tips: "Take turns at calling and jumping...try hopping and work your quads at the same time",
            description: `
                <h3>Description:</h3>
                <p>Draw different shapes, call out a shape and your kid can leap from one shape to another</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Chalk</li>
                    <li>Concrete</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Shape Concepts</li>
                    <li>Gross Motor Skills</li>
                </ul>
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
            id: 22,
            gif: '22.gif',
            avatar: "22.jpg",
            video: "22.mp4",
            name: "Balloon (Up & Down)",
            tips: "Count every hit which will help with number development. Also to make harder use objects like sticks/wooden spoons to hit balloon.",
            description: `
                <h3>Description:</h3>
                <p>
                    Hit a balloon to each other trying to keep the balloon in the air. 
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Balloon</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Follow Direction</li>
                    <li>Gross Motor Skills</li>
                </ul>
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
            id: 24,
            gif: '24.gif',
            avatar: "24.jpg",
            video: "24.mp4",
            name: "On Top & Under",
            tips: `Have your kid use a soft toy and find objects to place the toy on or under.`,
            description: `
                <h3>Description:</h3>
                <p>
                    Find objects around your home and have your kid climb on top or go under.  
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Things around your home</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Follow Direction</li>
                    <li>Gross Motor Skills</li>
                    <li>On Top/Under Concept</li>
                </ul>
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
            id: 16,
            gif: '16.gif',
            avatar: "16.jpg",
            video: "16.mp4",
            name: "Sorting Big & Little",
            tips: "Sort using tongs for fine motor skills development",
            description: `
                <h3>Description:</h3>
                <p>
                    Draw 2 circles, and label one as 'Big' and the other as 'Little'. Have your kid sort out the pom poms by size.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Big and Small Pom Poms</li>
                    <li>Whiteboard/Marker</li>
                    <li>Tongs (optional)</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Fine Motor Skills</li>
                    <li>Size Concept</li>
                </ul>
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
            id: 14,
            gif: '14.gif',
            avatar: "14.jpg",
            video: "14.mp4",
            name: "Colour Pegs",
            tips: "Eventually use a timer and make a game of it, beat previous times",
            description: `
                <h3>Description:</h3>
                <p>
                    Sort pegs by colour by cliping each peg to the side of a container or book or whatever.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Pegs</li>
                    <li>Container/Book</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Fine Motor Skills</li>
                    <li>Colour Development</li>
                </ul>
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
            id: 9,
            gif: '9.gif',
            avatar: "9.jpg",
            video: "9.mp4",
            name: "Follow The Path",
            tips: "Make the paths simple or more difficult based on the level of you kid",
            description: `
                <h3>Description:</h3>
                <p>Draw different paths eg a path from a person on one side leading to a house on another. Tell your kid...
                "This little boy/girl needs to go home, Help them go home" and trace the line home.</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Fine Motor Skills</li>
                </ul>
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
            id: 30,
            gif: '30.gif',
            avatar: "30.jpg",
            video: "30.mp4",
            name: "Traffic Lights",
            tips: "Reinforce concepts when driving and encountered real traffic lights.",
            description: `
                <h3>Description:</h3>
                <p>
                    Teach your kid 'Stop', 'Go', 'Slow' using red, yellow and green popsicle sticks. Hold up a stick and have them respond with walking or running around your home. 
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Red, Yellow, Green Popsicle Sticks</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Colour Concept</li>
                    <li>Follow Instructions</li>
                    <li>Physical Development (Active Play)</li>
                </ul>
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
            id: 19,
            gif: '19.gif',
            avatar: "19.jpg",
            video: "19.mp4",
            name: "Roll The Number",
            tips: "Take turns",
            description: `
                <h3>Description:</h3>
                <p>
                    Draw numbers 1-6 several times on the whiteboard. 
                    Have your kid roll a dice and rub off the number on the whiteboard. Repeat until all numbers have been rubbed off.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard & Marker</li>
                    <li>Dice</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Number Recognition</li>
                    <li>Observation Skills</li>
                </ul>
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
            id: 25,
            gif: '25.gif',
            avatar: "25.jpg",
            video: "25.mp4",
            name: "Car, Boat, Train",
            tips: "Have your kid talk about the sounds each vehicle makes and how they travel",
            description: `
                <h3>Description:</h3>
                <p>
                    On the left draw a car, boat and train. On the right draw a road, water, and train tracks. 
                    Have your kid draw a line from the vehicle to the road, water or train tracks.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard & Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Language Skills</li>
                    <li>Problem Solving</li>
                    <li>Logical Thinking</li>
                </ul>
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
            id: 18,
            gif: '18.gif',
            avatar: "18.jpg",
            video: "18.mp4",
            name: "Memory",
            tips: "Take turns and play together",
            description: `
                <h3>Description:</h3>
                <p>
                    Play memory with paper plates. Draw pairs of shapes or whatever on paper plates and turn them face down. 
                    Have you kid select different plates to try get a match.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Paper plates</li>
                    <li>Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Memory Recall</li>
                    <li>Observation Skills</li>
                </ul>
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
            id: 6,
            gif: '6.gif',
            avatar: "6.jpg",
            video: "6.mp4",
            name: "Read & Draw",
            tips: "Let your kid explain the drawing to you and how it relates to the book. Remember to praise their effort",
            description: `
                <h3>Description:</h3>
                <p>Read a book and get your kid to draw a picture of the story...simple</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Book</li>
                    <li>Whiteboard</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Language Development</li>
                    <li>Promote Creativity</li>
                    <li>Memory Recall</li>
                </ul>
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
            id: 23,
            gif: '23.gif',
            avatar: "23.jpg",
            video: "23.mp4",
            name: "Over & Under",
            tips: "Lower or raise the stick to make it easier or more difficult",
            description: `
                <h3>Description:</h3>
                <p>
                    Use a stick or broom or whatever and have your kid, crawl under or step over the stick.  
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Stick/Broom</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Follow Direction</li>
                    <li>Gross Motor Skills</li>
                    <li>Over/Under Concept</li>
                </ul>
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
            id: 4,
            gif: '4.gif',
            avatar: "4.jpg",
            video: "4.mp4",
            name: "Does It Float",
            tips: "Have your kid feel the object, state what it is and why they think it will float or sink",
            description: `
                <h3>Description:</h3>
                <p>Fill a bowl with water and have your kid select different objects and predict whether 
                it will float or sink before dropping it in the bowl. Ask your kid "Does a banana (or whatever) float?". 
                Place the object next to the label "Float" or "Sink".</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Bowl of water</li>
                    <li>Random Things that float or sink eg Rock, Banana, Pen, Cotton, Spoon etc...
                    </li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Prediction</li>
                    <li>Observation Skills</li>
                </ul>
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
            id: 3,
            gif: '3.gif',
            avatar: "3.jpg",
            video: "3.mp4",
            name: "Colours",
            tips: "Do activity in a place you can make mess, outside or on a towel. Would hate to have to clean up as well",
            description: `
                <h3>Description:</h3>
                <p>Fill 3 bowls with water, add a couple drops of red to one bowl, and a couple of yellow to another. 
                Have your kid combine red and yellow by spooning into a separate bowl. 
                Ask your kid to identify the colour. So red & yellow make?. Repeat for different colours.</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Red, Yellow, Blue Food Colouring</li>
                    <li>3 Bowls of Water and spoon</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Develop Colour Concepts</li>
                    <li>Prediction</li>
                    <li>Fine Motor Skills</li>
                </ul>
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
            tips: "Help them identify big/little objects you encounter through out the day to reinforce what they've learned",
            description: `
                <h3>Description:</h3>
                <p> 
                    Draw a big and little version of different shapes on a surface. 
                    Ask your kid to spray/clean/wipe big or little shapes. Help them to identify the difference.
                </p>
                <h3>Skills:</h3>
                <ul>
                    <li>Develop Shape Concepts</li>
                    <li>Big and Small Concepts</li>
                    <li>Fine Motor Skills</li>
                </ul>
                <h3>Stuff:</h3>
                <ul>
                    <li>Chalk</li>
                    <li>Concrete Surface</li>
                    <li>Spray Bottle/Water Bottle</li>
                </ul>
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
        },{
            id: 5,
            gif: '5.gif',
            avatar: "5.jpg",
            video: "5.mp4",
            name: "Stacking Numbers",
            tips: "Make a game of it, bowl the tower over with a ball or kick it down....Rebuild, Repeat enjoy",
            description: `
                <h3>Description:</h3>
                <p>Number cups 1-10 and get your kid to stack them in order while counting out loud.</p>
                <h3>Materials:</h3>
                <ul>
                    <li>10 Cups</li>
                    <li>Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Number Concepts</li>
                    <li>Hand Eye Coordination</li>
                    <li>Gross Motor Skills</li>
                </ul>
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
            id: 11,
            gif: '11.gif',
            avatar: "11.jpg",
            video: "11.mp4",
            name: "Same & Different",
            tips: "Make it harder by making slight changes",
            description: `
                <h3>Description:</h3>
                <p>Draw the same objects with one that is different and have your kid circle the odd one out.</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard/Paper</li>
                    <li>Markers</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Visual Discrimination</li>
                    <li>Logical Thinking</li>
                </ul>
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
            id: 7,
            gif: '7.gif',
            avatar: "7.jpg",
            video: "7.mp4",
            name: "Trace The Shape",
            tips: "Discuss each shape eg How many sides, things around the house of that shape...",
            description: `
                <h3>Description:</h3>
                <p>Draw various shapes on a whiteboard and have your kid trace the shape</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard/Paper</li>
                    <li>Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Fine motor skills to help with writing</li>
                    <li>Build on shape concepts</li>
                </ul>
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
            id: 21,
            gif: '21.gif',
            avatar: "21.jpg",
            video: "21.mp4",
            name: "On & Off",
            tips: "Avoid dangerous objects like power points etc.",
            description: `
                <h3>Description:</h3>
                <p>
                    Go around the house with your kid and turn on various objects eg TV, Lights, Lamps, Torch etc. Then repeat but turn each object off.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Objects around your house</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Follow Direction</li>
                    <li>On/Off Concept</li>
                </ul>
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
            id: 28,
            gif: '28.gif',
            avatar: "28.jpg",
            video: "28.mp4",
            name: "Tag Stuff",
            tips: "Tag simple everyday objects",
            description: `
                <h3>Description:</h3>
                <p>
                    Have your kid tag objects around your home with post-it notes.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Post-It Notes</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Language Development</li>
                    <li>Follow Instructions</li>
                </ul>
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
            id: 15,
            gif: '15.gif',
            avatar: "15.jpg",
            video: "15.mp4",
            name: "Number Pegs",
            tips: "User timer and make a game of it",
            description: `
                <h3>Description:</h3>
                <p>
                    Number paper plates and get your kid to clip the number of pegs corresponding to the number on the paper.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Pegs</li>
                    <li>Paper plates/Paper</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Fine Motor Skills</li>
                    <li>Counting</li>
                </ul>
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
            id: 29,
            gif: '29.gif',
            avatar: "29.jpg",
            video: "29.mp4",
            name: "Bring Sally Up",
            tips: "Try different movements like squats or jumping etc...",
            description: `
                <h3>Description:</h3>
                <p>
                    Play 'Bring Sally Up' by moby. Have your kid stand up or sit down every time the song says 'Bring Sally Up' or 'Bring Sally Down'.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>'Bring Sally Up' Song by Moby</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Up & Down Concept</li>
                    <li>Follow Instructions</li>
                    <li>Physical Development (Active Play)</li>
                </ul>
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
        },{
            id: 13,
            gif: '13.gif',
            avatar: "13.jpg",
            video: "13.mp4",
            name: "Name Puzzle",
            tips: "Draw a picture that your kid is interested in",
            description: `
                <h3>Description:</h3>
                <p>Line up popsicle sticks together, write your kids name on the top, one letter per stick and then draw a picture 
                eg a car and shuffle popsicles sticks. Get your kid to piece them together to form the picture and help them to recognise their name.</p>
                <h3>Materials:</h3>
                <ul>
                    <li>Popsicle Sticks</li>
                    <li>Markers</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Letter Recognition</li>
                    <li>Develop Name Recognition</li>
                </ul>
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
        },{
            id: 26,
            gif: '26.gif',
            avatar: "26.jpg",
            video: "26.mp4",
            name: "Pattern Recognition",
            tips: "Make patterns as easy or difficult based on your kids ability",
            description: `
                <h3>Description:</h3>
                <p>
                    Draw objects in a pattern series on your whiteboard and ask your kid what comes next.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Whiteboard & Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Pattern Recognition</li>
                    <li>Problem Solving</li>
                    <li>Observation Skills</li>
                </ul>
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
            id: 27,
            gif: '27.gif',
            avatar: "27.jpg",
            video: "27.mp4",
            name: "What's missing?",
            tips: "Take turns",
            description: `
                <h3>Description:</h3>
                <p>
                    Find objects in your home, place them in front of your kid. 
                    Have them close their eyes while you remove objects and ask what's missing.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Random Objects</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Memory Recall</li>
                    <li>Observation Skills</li>
                </ul>
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
        }, {
            id: 20,
            gif: '20.gif',
            avatar: "20.jpg",
            video: "20.mp4",
            name: "Find Your Name",
            tips: "Make more challenging by hiding letters in less obvious places",
            description: `
                <h3>Description:</h3>
                <p>
                    Write your kids name on post-it notes, a letter per post it. Stick to different objects in your home and have them retrieve the letters in order to form their name.
                </p>
                <h3>Materials:</h3>
                <ul>
                    <li>Post-It Notes</li>
                    <li>Whiteboard & Marker</li>
                </ul>
                <h3>Skills:</h3>
                <ul>
                    <li>Name Recognition</li>
                    <li>Observation Skills</li>
                    <li>Language Development</li>
                </ul>
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