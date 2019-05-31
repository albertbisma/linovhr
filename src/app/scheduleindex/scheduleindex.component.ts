import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-scheduleindex',
  templateUrl: './scheduleindex.component.html',
  styleUrls: ['./scheduleindex.component.css']
})
export class ScheduleindexComponent implements OnInit {
 
  events: any[];

  header: any;
          
  constructor(private eventService: EventService) { }

  ngOnInit() {
      this.eventService.getEvents().then(events => {this.events = events;});
      
      this.header = {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      };
  }

}

export class MyEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean = true;
}