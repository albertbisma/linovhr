import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  url = "http://localhost:8080/taskschedule";
  tasks: any[];
  dtls: any[];
  id;
  constructor(private http:Http) { }

  ngOnInit() {
    this.getData();    
    this.getDataDtlbyHdr();
  }

  getData(){
    this.http.get(this.url)
        .subscribe(response => {
          this.tasks = response.json();
          console.log(response.json());
        })
  }

  getDataDtlbyHdr(){
    this.http.get('http://localhost:8080/taskschedule/dtl/id-hdr/00d67cba-0bfc-4674-ae49-ac04985c5f29')
        .subscribe(response=>{          
          console.log(response);
          this.dtls = response.json();
        })
  }

}
