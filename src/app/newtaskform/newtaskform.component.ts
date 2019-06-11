import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newtaskform',
  templateUrl: './newtaskform.component.html',
  styleUrls: ['./newtaskform.component.css']
})
export class NewtaskformComponent implements OnInit {
  formDtl:FormGroup;
  formHdr:FormGroup;
  msgs:Message[]=[];
  listenum;
  details;
  tasktypes;
  listps;
  clients;
  tableTaskDtl:any=[];
  url= 'http://localhost:8080/taskschedule'
  constructor(private router:Router ,private confirmationService: ConfirmationService, private http:Http, private formBuilder:FormBuilder) { }

  ngOnInit() {
    // this.getData();
    this.createFormDtl();
    this.createFormHdr();
    this.getDataUser();   
    this.getDataClient(); 
    this.getDataEnum();
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
      dtlCreateTask:[this.tableTaskDtl]
    })
  }

  createFormDtl(){
    this.formDtl = this.formBuilder.group({      
      task: this.formBuilder.group({
        idTxask:['', Validators.required]        
      }),
      tglAwal:['', Validators.required],
      tglAkhir:['', Validators.required],
      keterangan:['', Validators.required]
    })
  }

  getData(){
    this.http.get('http://localhost:8080/task').subscribe(response=>{
      // console.log(response.json());
      this.tasktypes = response.json();
    })
  }

  getDataUser(){
    this.http.get('http://localhost:8080/payrollspecialist').subscribe(response =>{
      // console.log(response.json());
      this.listps = response.json();
    })
  }
  
  getDataClient(){
    this.http.get('http://localhost:8080/client').subscribe(response =>{
      // console.log(response);
      this.clients = response.json();
    })
  }

  getDataEnum(){
    this.http.get(this.url+'/enum').subscribe(response=>{
      this.listenum = response.json();
    })
  }

  onFormSubmitHdr(){
    let dataHdr = this.formHdr.value;
    console.log(dataHdr);
    
    this.http.post(this.url, dataHdr).subscribe(response =>{
      console.log(response);
    },
    error=>{
      console.log(error);
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
    this.popUpMsg();
  }

  confirmDelete(id,nama){
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this <strong>'+nama+'</strong>?',
      header: 'CAUTION!!!',
      icon: 'fas fa-exclamation-triangle',
      accept:()=>{
        this.onDelete(id);
      }
    })
  }

  popUpMsg(){
    this.msgs = [];
    this.msgs.push(
      {
        severity:'success',summary:'SUCCESS',detail:'Congratulations your data sucessfully removed!'
      }
    )
  }

}
