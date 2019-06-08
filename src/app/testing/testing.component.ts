import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Spinner, Message } from 'primeng/primeng';
import { Router } from '@angular/router';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { Http } from '@angular/http';
import {Data} from '../../app/testing/testing';
import {EventService} from '../../app/testing/event.service';


@Component({
  selector: 'app-testing',  
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {    
  msgs: Message[] = [];
  // constructor(private router:Router,private confirmationService:ConfirmationService) { }

  // ngOnInit() {
  // }

  // confirm(){
  //   this.confirmationService.confirm({
  //     message: 'Are you sure?',
  //     header: 'Confirmation',
  //     icon: 'fa fa-pencil',
  //     accept: ()=>{
  //       this.msgs =[{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
  //     },
  //     reject:()=>{
  //       this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //     }    
  //   });
  // }

  // loading: boolean;

    // cars: Car[];    
    // private carService: CarService
    cols: any[];        
    users;    
    sortF;
    // events: any[];
    // eventService: EventService;

    data1: Data[];

    url = 'http://localhost:8080/user';

    constructor(private http:Http) { }

    ngOnInit() {     
        this.getData();        
        
        // this.eventService.getEvents().then(events=>{this.events = events;});
                
        this.cols = [            
            {field: 'email', header: 'Email'},
            {field: 'userType', header: 'User Type'}
        ];

        
    }
    
//  loadEvents(event) {
//       let start = event.view.start
//       let end = event.view.end
//       this.eventService.getEvents().then(events => {this.events = events;});
//   }

    getData(){
      this.http.get(this.url)
      .subscribe(response =>{
        console.log(response.json());        
         this.users = response.json();         
      });
    }
}
