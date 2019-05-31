import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listcompany',
  templateUrl: './listcompany.component.html',
  styleUrls: ['./listcompany.component.css']
})
export class ListcompanyComponent implements OnInit {
  companys;
  url = 'http://localhost:8080/logo';
  constructor(private http:Http, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get(this.url).subscribe(response => {
      console.log(response.json());

      this.companys = response.json();
    })
  }

}
