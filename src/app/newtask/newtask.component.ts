import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  url = "http://localhost:8080/taskschedule/dtl";
  tasks;
  constructor(private http:Http) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get(this.url)
        .subscribe(response => {
          this.tasks = response.json();
          console.log(response.json());
        })
  }

}
