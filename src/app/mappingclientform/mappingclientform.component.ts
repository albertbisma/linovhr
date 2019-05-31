import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-mappingclientform',
  templateUrl: './mappingclientform.component.html',
  styleUrls: ['./mappingclientform.component.css']
})
export class MappingclientformComponent implements OnInit {  
  clients: any[];

  constructor(http: Http) {
    http.get('http://localhost:8080/client')
    .subscribe(response =>{            
      this.clients = response.json();
    });   
   }

  ngOnInit() {
  }

}

