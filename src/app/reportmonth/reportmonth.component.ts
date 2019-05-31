import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-reportmonth',
  templateUrl: './reportmonth.component.html',
  styleUrls: ['./reportmonth.component.css']
})
export class ReportmonthComponent implements OnInit {
  rptPSForm: FormGroup;
  reports: Object[];
  url ='http://localhost:8080/report/payroll/';

  constructor(private formBuilder:FormBuilder, private http:Http) { }

  ngOnInit() {
    this.createRptPSForm();
  }

  createRptPSForm(){
    this.rptPSForm = this.formBuilder.group({
      bulan:['', Validators.required],
      tahun:['', Validators.required]
    })
  }

  onFormSubmit(){
    let data = this.rptPSForm.value;
    this.http.get(this.url+'/'+this.rptPSForm.get('bulan').value+'/'+this.rptPSForm.get('tahun').value)
        .subscribe (response => {
          console.log(response.json());
          this.reports = response.json();
        })
  }
}
