import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newtaskform',
  templateUrl: './newtaskform.component.html',
  styleUrls: ['./newtaskform.component.css']
})
export class NewtaskformComponent implements OnInit {
  formDtl:FormGroup;
  formHdr:FormGroup;
  details;
  tasktypes;
  tableTaskDtl:any=[];
  url= 'http://localhost:8080/taskschedule'
  constructor(private http:Http, private formBuilder:FormBuilder) { }

  ngOnInit() {
    // this.getData();
    this.createFormDtl();
    this.createFormHdr();
    
  }

  createFormHdr(){
    this.formHdr = this.formBuilder.group({
      kodeTask:['', Validators.required],
      payrollSpecialist: this.formBuilder.group({
        idPs:['', Validators.required]
      }),
      bulan:['',Validators.required],
      tahun:['',Validators.required],
      client: this.formBuilder.group({
        idClient:['',Validators.required]
      }),
      dtlCreateTask:[this.tableTaskDtl,Validators.required]
    })
  }

  createFormDtl(){
    this.formDtl = this.formBuilder.group({      
      task: this.formBuilder.group({
        idTask:['', Validators.required]        
      }),
      tglAwal:['', Validators.required],
      tglAkhir:['', Validators.required],
      keterangan:['', Validators.required]
    })
  }

  getData(){
    this.http.get('http://localhost:8080/task').subscribe(response=>{
      console.log(response.json());
      this.tasktypes = response.json();
    })
  }

  onFormSubmitDtl(){
    let data = this.formDtl.value;
    this.tableTaskDtl.push(data);
    console.log(data);
    console.log(this.tableTaskDtl);
  }

  onDelete(i){    
    this.tableTaskDtl.splice(i,1);
  }

}
